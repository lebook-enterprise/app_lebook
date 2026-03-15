import AppLayout from '@/layouts/app-layout';
import { inventory } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: inventory().url,
    },
];

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface Product {
    id: number;
    name: string;
    sku: string;
    category_id?: number;
    stock?: {
        stock: number;
    };
}

interface InventoryMovement {
    id: number;
    user: {
        name: string;
    };
    product: {
        id?: number;
        name: string;
        sku: string;
        stock?: {
            stock: number;
        };
    };
    type: 'in' | 'out' | 'adjustment';
    quantity: number;
    note?: string;
    created_at: string;
}

interface ProductLite {
    id?: number;
    name: string;
    sku: string;
}

interface InventoryProps {
    products: Product[];
    categories: Array<{
        id: number;
        name: string;
    }>;
    stats: {
        total_skus: number;
        in_stock: number;
        checked_out_today: number;
        low_stock: number;
    };
    // Pass these from your controller the same way you do in Dashboard
    inventoryMovements: InventoryMovement[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Inventory({
    products,
    categories,
    inventoryMovements = [],
    stats,
}: InventoryProps) {
    // ── Form state ──────────────────────────────────────────────────────────

    const [activeForm, setActiveForm] = useState<'in' | 'out'>('in');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // ── History state ───────────────────────────────────────────────────────

    const [historySearch, setHistorySearch] = useState('');
    const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
    const historyDropdownRef = useRef<HTMLDivElement | null>(null);
    const historyInputRef = useRef<HTMLInputElement | null>(null);

    const [lowStockThreshold, setLowStockThreshold] = useState(0);

    // ── Derived state: stats calculation ──────────────────────────────────

    const lowStockCount = useMemo(() => {
        return products.filter(
            (p) => (p.stock?.stock ?? 0) <= lowStockThreshold,
        ).length;
    }, [products, lowStockThreshold]);

    // ── Derived state: form product search ──────────────────────────────────

    const {
        data: inData,
        setData: setInData,
        post: postIn,
        processing: inProcessing,
        errors: inErrors,
        reset: resetIn,
    } = useForm({
        name: '',
        category_id: '',
        quantity: '',
        note: '',
    });

    // ── Check Out Form ───────────────────────────────────────────────────────

    const {
        data: outData,
        setData: setOutData,
        post: postOut,
        processing: outProcessing,
        errors: outErrors,
        reset: resetOut,
    } = useForm({
        product_id: '',
        quantity: '',
        note: '',
    });

    // ── Product list for history autocomplete ────────────────────────────────

    const productList = useMemo<ProductLite[]>(() => {
        if (Array.isArray(products) && products.length > 0) {
            const map = new Map<string, ProductLite>();
            for (const p of products) {
                if (p.sku) map.set(p.sku, p);
            }
            return Array.from(map.values());
        }
        const map = new Map<string, ProductLite>();
        for (const m of inventoryMovements) {
            if (m.product?.sku) {
                map.set(m.product.sku, {
                    id: m.product.id,
                    name: m.product.name,
                    sku: m.product.sku,
                });
            }
        }
        return Array.from(map.values());
    }, [products, inventoryMovements]);

    // ── Derived state: form product search ──────────────────────────────────

    const filteredProducts = useMemo(() => {
        if (searchTerm.trim() === '') {
            return [];
        }
        return products.filter(
            (p) =>
                p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [searchTerm, products]);

    useEffect(() => {
        setShowDropdown(filteredProducts.length > 0);
    }, [filteredProducts]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ── Derived state: history search & suggestions ──────────────────────────

    const filteredMovements = useMemo(() => {
        const term = historySearch.trim().toLowerCase();
        if (term === '') {
            return inventoryMovements;
        }
        return inventoryMovements.filter(
            (m) =>
                (m.product?.name || '').toLowerCase().includes(term) ||
                (m.product?.sku || '').toLowerCase().includes(term) ||
                (m.user?.name || '').toLowerCase().includes(term),
        );
    }, [historySearch, inventoryMovements]);

    const historySuggestions = useMemo(() => {
        const term = historySearch.trim();
        if (term === '') {
            return productList.slice(0, 100);
        }
        return productList
            .filter(
                (p) =>
                    p.name.toLowerCase().includes(term.toLowerCase()) ||
                    p.sku.toLowerCase().includes(term.toLowerCase()),
            )
            .slice(0, 100);
    }, [historySearch, productList]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                historyDropdownRef.current &&
                !historyDropdownRef.current.contains(e.target as Node)
            ) {
                setShowHistoryDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ── Handlers: form ───────────────────────────────────────────────────────

    const handleSelectProduct = (product: Product) => {
        setSearchTerm(product.sku);
        setInData('name', product.name);
        if (product.category_id)
            setInData('category_id', product.category_id.toString());
        setShowDropdown(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setInData('name', value);
    };

    const submitCheckIn = (e: React.FormEvent) => {
        e.preventDefault();
        postIn('/inventory/check-in', {
            onSuccess: () => {
                resetIn();
                setSearchTerm('');
                setSuccessMessage('Product checked in successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            },
        });
    };

    const submitCheckOut = (e: React.FormEvent) => {
        e.preventDefault();
        postOut('/inventory/check-out', {
            onSuccess: () => {
                resetOut();
                setSuccessMessage('Product checked out successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            },
            onError: (errors) => {
                resetOut();
                setErrorMessage(
                    errors.stock ?? 'An unexpected error occurred.',
                );
                setTimeout(() => setErrorMessage(''), 3000);
            },
        });
    };

    // ── Handlers: history ────────────────────────────────────────────────────

    const handleHistoryInputFocus = () => {
        setShowHistoryDropdown(productList.length > 0);
    };

    const handleSelectSuggestion = (item: ProductLite) => {
        setHistorySearch(item.sku);
        setShowHistoryDropdown(false);
    };

    // ── Formatting helpers (verbatim from dashboard) ─────────────────────────

    const getMovementTypeLabel = (type: string) => {
        switch (type) {
            case 'in':
                return 'Stock In';
            case 'out':
                return 'Stock Out';
            case 'adjustment':
                return 'Adjustment';
            default:
                return type;
        }
    };

    const getMovementTypeColor = (type: string) => {
        switch (type) {
            case 'in':
                return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200';
            case 'out':
                return 'bg-amber-100 text-amber-200 dark:bg-amber-900/20 dark:text-amber-200';
            case 'adjustment':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // ── Style tokens ─────────────────────────────────────────────────────────

    const labelClass =
        'block text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-1';
    const inputClass =
        'w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 transition';
    const errorClass = 'mt-1 text-xs text-red-500';

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Feedback messages */}
                {successMessage && (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
                        {errorMessage}
                    </div>
                )}
                {/* ── KPI STATS BAR ── */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                            Total SKUs
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {stats.total_skus.toLocaleString()}
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                            In Stock
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {stats.in_stock.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                            units across all products
                        </p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                            Checked Out
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {stats.checked_out_today.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-amber-500">↑ today</p>
                    </div>
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                                Low Stock
                            </p>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-medium text-neutral-400 uppercase">
                                    Limit:
                                </span>
                                <input
                                    type="number"
                                    min={0}
                                    max={999}
                                    value={lowStockThreshold}
                                    onChange={(e) =>
                                        setLowStockThreshold(
                                            parseInt(e.target.value) || 0,
                                        )
                                    }
                                    className="w-10 [appearance:textfield] rounded-md border border-neutral-200 bg-white px-1 py-0.5 text-center text-[11px] font-bold text-neutral-700 shadow-sm transition-colors hover:border-neutral-300 focus:border-neutral-400 focus:ring-0 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:focus:border-neutral-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    title="Edit low stock threshold"
                                    aria-label="Low stock threshold"
                                />
                            </div>
                        </div>
                        <p className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {lowStockCount.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-red-500">
                            below threshold
                        </p>
                    </div>
                </div>

                {/* ── TRANSACTIONAL PANEL ── */}
                <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                    {/* Tab bar */}
                    <div className="flex border-b border-neutral-200 dark:border-neutral-800">
                        <button
                            type="button"
                            onClick={() => setActiveForm('in')}
                            className={[
                                '-mb-px border-b-2 px-6 py-3 text-sm font-medium transition-colors',
                                activeForm === 'in'
                                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200',
                            ].join(' ')}
                        >
                            Check In
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveForm('out')}
                            className={[
                                '-mb-px border-b-2 px-6 py-3 text-sm font-medium transition-colors',
                                activeForm === 'out'
                                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200',
                            ].join(' ')}
                        >
                            Check Out
                        </button>
                    </div>

                    {/* Check In Form */}
                    {activeForm === 'in' && (
                        <form onSubmit={submitCheckIn}>
                            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                                <div
                                    className="sm:col-span-2"
                                    ref={dropdownRef}
                                >
                                    <label className={labelClass}>
                                        Product / SKU
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search by name or SKU code…"
                                            value={searchTerm || inData.name}
                                            onChange={handleSearchChange}
                                            onFocus={() => {
                                                if (filteredProducts.length > 0)
                                                    setShowDropdown(true);
                                            }}
                                            className={inputClass}
                                        />
                                        {showDropdown &&
                                            filteredProducts.length > 0 && (
                                                <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-800">
                                                    {filteredProducts.map(
                                                        (product) => (
                                                            <button
                                                                key={product.id}
                                                                type="button"
                                                                onClick={() =>
                                                                    handleSelectProduct(
                                                                        product,
                                                                    )
                                                                }
                                                                className="flex w-full flex-col px-4 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                                            >
                                                                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </span>
                                                                <span className="text-xs text-neutral-500">
                                                                    SKU:{' '}
                                                                    {
                                                                        product.sku
                                                                    }
                                                                </span>
                                                            </button>
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                    {inErrors.name && (
                                        <p className={errorClass}>
                                            {inErrors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Category
                                    </label>
                                    <select
                                        value={inData.category_id}
                                        onChange={(e) =>
                                            setInData(
                                                'category_id',
                                                e.target.value,
                                            )
                                        }
                                        className={inputClass}
                                    >
                                        <option value="">
                                            Select category…
                                        </option>
                                        {categories?.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {inErrors.category_id && (
                                        <p className={errorClass}>
                                            {inErrors.category_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        min={1}
                                        value={inData.quantity}
                                        onChange={(e) =>
                                            setInData(
                                                'quantity',
                                                e.target.value,
                                            )
                                        }
                                        className={inputClass}
                                    />
                                    {inErrors.quantity && (
                                        <p className={errorClass}>
                                            {inErrors.quantity}
                                        </p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className={labelClass}>
                                        Note (optional)
                                    </label>
                                    <textarea
                                        placeholder="Add any relevant notes about this stock entry…"
                                        value={inData.note}
                                        onChange={(e) =>
                                            setInData('note', e.target.value)
                                        }
                                        rows={3}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                <p className="text-xs text-neutral-400">
                                    Logged with your account and timestamp.
                                </p>
                                <button
                                    type="submit"
                                    disabled={inProcessing}
                                    className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                                >
                                    {inProcessing
                                        ? 'Submitting…'
                                        : 'Confirm check in'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Check Out Form */}
                    {activeForm === 'out' && (
                        <form onSubmit={submitCheckOut}>
                            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className={labelClass}>
                                        Product
                                    </label>
                                    <select
                                        value={outData.product_id}
                                        onChange={(e) =>
                                            setOutData(
                                                'product_id',
                                                e.target.value,
                                            )
                                        }
                                        className={inputClass}
                                    >
                                        <option value="">
                                            Select product…
                                        </option>
                                        {products?.map((product) => (
                                            <option
                                                key={product.id}
                                                value={product.id}
                                            >
                                                {product.name} — {product.sku}
                                            </option>
                                        ))}
                                    </select>
                                    {outErrors.product_id && (
                                        <p className={errorClass}>
                                            {outErrors.product_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className={labelClass}>
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        min={1}
                                        value={outData.quantity}
                                        onChange={(e) =>
                                            setOutData(
                                                'quantity',
                                                e.target.value,
                                            )
                                        }
                                        className={inputClass}
                                    />
                                    {outErrors.quantity && (
                                        <p className={errorClass}>
                                            {outErrors.quantity}
                                        </p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label className={labelClass}>
                                        Note (optional)
                                    </label>
                                    <textarea
                                        placeholder="Destination, reference number, or other notes…"
                                        value={outData.note}
                                        onChange={(e) =>
                                            setOutData('note', e.target.value)
                                        }
                                        rows={3}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                <p className="text-xs text-neutral-400">
                                    Stock is deducted immediately upon
                                    submission.
                                </p>
                                <button
                                    type="submit"
                                    disabled={outProcessing}
                                    className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-amber-600 disabled:opacity-50"
                                >
                                    {outProcessing
                                        ? 'Submitting…'
                                        : 'Confirm check out'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* ── HISTORY PANEL ── */}
                <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                    {/* Header + search */}
                    <div className="flex flex-col gap-3 border-b border-neutral-200 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
                        <div>
                            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                                Movement History
                            </h2>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                All stock changes logged automatically
                            </p>
                        </div>

                        {/* History search with autocomplete */}
                        <div
                            className="relative w-full sm:w-72"
                            ref={historyDropdownRef}
                        >
                            <input
                                ref={historyInputRef}
                                value={historySearch}
                                onChange={(e) =>
                                    setHistorySearch(e.target.value)
                                }
                                onFocus={handleHistoryInputFocus}
                                type="text"
                                placeholder="Filter by product, SKU, or user…"
                                className={inputClass}
                            />
                            {showHistoryDropdown &&
                                historySuggestions.length > 0 && (
                                    <div className="absolute top-full left-0 z-20 mt-1 max-h-60 w-full overflow-hidden overflow-y-auto rounded-lg border border-neutral-200 bg-white shadow-md dark:border-neutral-700 dark:bg-neutral-800">
                                        {historySuggestions.map((item) => (
                                            <button
                                                key={item.sku}
                                                type="button"
                                                onClick={() =>
                                                    handleSelectSuggestion(item)
                                                }
                                                className="flex w-full flex-col px-4 py-2 text-left text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                            >
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-xs text-neutral-500">
                                                        {item.sku}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
                                <tr className="text-left">
                                    <th className="p-4 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                                        Date
                                    </th>
                                    <th className="p-4 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                                        Product
                                    </th>
                                    <th className="p-4 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                                        SKU
                                    </th>
                                    <th className="p-4 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                                        Stock
                                    </th>
                                    <th className="p-4 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                                        Type
                                    </th>
                                    <th className="p-4 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                                        Qty
                                    </th>
                                    <th className="p-4 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                                        User
                                    </th>
                                    <th className="p-4 text-xs font-medium tracking-wide text-neutral-500 uppercase">
                                        Note
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMovements.length > 0 ? (
                                    filteredMovements.map((movement) => (
                                        <tr
                                            key={movement.id}
                                            className="border-b border-neutral-100 hover:bg-neutral-50 dark:border-neutral-800/60 dark:hover:bg-neutral-900/50"
                                        >
                                            <td className="p-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                                                {formatDate(
                                                    movement.created_at,
                                                )}
                                            </td>
                                            <td className="p-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                {movement.product.name}
                                            </td>
                                            <td className="p-4 text-sm text-neutral-500 dark:text-neutral-400">
                                                {movement.product.sku}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`inline-block rounded-md px-2.5 py-1 text-sm font-semibold ${
                                                        (movement.product.stock
                                                            ?.stock ?? 0) <=
                                                        lowStockThreshold
                                                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200'
                                                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200'
                                                    }`}
                                                >
                                                    {movement.product.stock
                                                        ?.stock ?? 0}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`inline-block rounded-md px-2 py-1 text-xs font-medium ${getMovementTypeColor(movement.type)}`}
                                                >
                                                    {getMovementTypeLabel(
                                                        movement.type,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm font-semibold">
                                                <span
                                                    className={
                                                        movement.type === 'in'
                                                            ? 'text-emerald-600 dark:text-emerald-400'
                                                            : movement.type ===
                                                                'out'
                                                              ? 'text-amber-600 dark:text-amber-400'
                                                              : 'text-neutral-600 dark:text-neutral-400'
                                                    }
                                                >
                                                    {movement.type === 'in'
                                                        ? '+'
                                                        : movement.type ===
                                                            'out'
                                                          ? '−'
                                                          : ''}
                                                    {movement.quantity}
                                                </span>
                                            </td>
                                            <td className="p-4 text-sm text-neutral-700 dark:text-neutral-300">
                                                {movement.user.name}
                                            </td>
                                            <td className="p-4 text-sm text-neutral-500 dark:text-neutral-400">
                                                {movement.note || '—'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="p-8 text-center text-sm text-neutral-400"
                                        >
                                            {historySearch
                                                ? 'No movements match your search'
                                                : 'No inventory movements yet'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
