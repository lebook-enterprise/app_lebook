import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { inventory } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: inventory().url,
    },
];

interface Product {
    id: number;
    name: string;
    sku: string;
    category_id?: number;
}

interface InventoryProps {
    products: Product[];
    categories: Array<{
        id: number;
        name: string;
    }>;
}


export default function Inventory({ products, categories }: InventoryProps) {
    const [activeForm, setActiveForm] = useState<'in' | 'out' | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // --- Check In Form ---
    const {
        data: inData,
        setData: setInData,
        post: postIn,
        processing: inProcessing,
        errors: inErrors,
        reset: resetIn,
    } = useForm({
        name: "",
        category_id: "",
        quantity: "",
        note: "",
    });

    // --- Check Out Form ---
    const {
        data: outData,
        setData: setOutData,
        post: postOut,
        processing: outProcessing,
        errors: outErrors,
        reset: resetOut,
    } = useForm({
        product_id: "",
        quantity: "",
        note: "",
    });

    // Filter products based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts([]);
            setShowDropdown(false);
            return;
        }

        const filtered = products.filter(product =>
            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProducts(filtered);
        setShowDropdown(filtered.length > 0);
    }, [searchTerm, products]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle product selection from dropdown
    const handleSelectProduct = (product: Product) => {
        setSearchTerm(product.sku);
        setInData('name', product.name);
        if (product.category_id) {
            setInData('category_id', product.category_id.toString());
        }
        setShowDropdown(false);
    };

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setInData('name', value);
    };

    const submitCheckIn = (e: any) => {
        e.preventDefault();
        postIn("/inventory/check-in", {
            onSuccess: () => {
                resetIn();
                setSearchTerm('');
                setSuccessMessage('Product checked in successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            },
        });
    };

    const submitCheckOut = (e: any) => {
        e.preventDefault();
        postOut("/inventory/check-out", {
            onSuccess: () => {
                resetOut();
                setSuccessMessage('Product checked out successfully!');
                setTimeout(() => setSuccessMessage(''), 3000);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Success Message */}
                {successMessage && (
                    <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
                        {successMessage}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveForm(activeForm === 'in' ? null : 'in')}
                        className="rounded-xl border border-sidebar-border px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                        Check In
                    </button>

                    <button
                        onClick={() => setActiveForm(activeForm === 'out' ? null : 'out')}
                        className="rounded-xl border border-sidebar-border px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    >
                        Check Out
                    </button>
                </div>

                {/* ----------------------- CHECK IN FORM ----------------------- */}
                {activeForm === 'in' && (
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-4">
                        <h2 className="font-semibold text-lg mb-4">Check In Product</h2>

                        <form onSubmit={submitCheckIn} className="space-y-3">
                            {/* Product Search/Name with Autocomplete */}
                            <div className="relative" ref={dropdownRef}>
                                <input
                                    type="text"
                                    placeholder="Search by SKU or product name"
                                    value={searchTerm || inData.name}
                                    onChange={handleSearchChange}
                                    onFocus={() => {
                                        if (filteredProducts.length > 0) {
                                            setShowDropdown(true);
                                        }
                                    }}
                                    className="w-full rounded-lg border p-2"
                                />
                                {inErrors.name && <p className="text-red-500 text-sm mt-1">{inErrors.name}</p>}

                                {/* Dropdown */}
                                {showDropdown && filteredProducts.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 border border-sidebar-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                        {filteredProducts.map((product) => (
                                            <button
                                                key={product.id}
                                                type="button"
                                                onClick={() => handleSelectProduct(product)}
                                                className="w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex flex-col"
                                            >
                                                <span className="font-medium">{product.name}</span>
                                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    SKU: {product.sku}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Category ID */}
                            <select
                                value={inData.category_id}
                                onChange={(e) => setInData("category_id", e.target.value)}
                                className="w-full rounded-lg border p-2"
                            >
                                <option value="">Select category </option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {inErrors.category_id && <p className="text-red-500 text-sm">{inErrors.category_id}</p>}

                            {/* Quantity */}
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={inData.quantity}
                                onChange={(e) => setInData("quantity", e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />
                            {inErrors.quantity && <p className="text-red-500 text-sm">{inErrors.quantity}</p>}

                            {/* Note */}
                            <textarea
                                placeholder="Note (optional)"
                                value={inData.note}
                                onChange={(e) => setInData("note", e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />

                            <button
                                disabled={inProcessing}
                                className="mt-2 rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 disabled:opacity-50"
                            >
                                {inProcessing ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                )}

                {/* ----------------------- CHECK OUT FORM ----------------------- */}
                {activeForm === 'out' && (
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-4">
                        <h2 className="font-semibold text-lg mb-4">Check Out Product</h2>

                        <form onSubmit={submitCheckOut} className="space-y-3">
                            {/* Product Selector */}
                            <select
                                value={outData.product_id}
                                onChange={(e) => setOutData("product_id", e.target.value)}
                                className="w-full rounded-lg border p-2"
                            >
                                <option value="">Select product</option>
                                {products?.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} — {product.sku}
                                    </option>
                                ))}
                            </select>
                            {outErrors.product_id && <p className="text-red-500 text-sm">{outErrors.product_id}</p>}

                            {/* Quantity */}
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={outData.quantity}
                                onChange={(e) => setOutData("quantity", e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />
                            {outErrors.quantity && <p className="text-red-500 text-sm">{outErrors.quantity}</p>}

                            {/* Note */}
                            <textarea
                                placeholder="Note (optional)"
                                value={outData.note}
                                onChange={(e) => setOutData("note", e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />

                            <button
                                disabled={outProcessing}
                                className="mt-2 rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 disabled:opacity-50"
                            >
                                {outProcessing ? 'Submitting...' : 'Submit'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
