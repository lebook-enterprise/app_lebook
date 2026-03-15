import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef, useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

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

interface DashboardProps {
    inventoryMovements: InventoryMovement[];
    products?: ProductLite[];
}

export default function Dashboard({ inventoryMovements = [], products = [] }: DashboardProps) {
    // Search + Filter state
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterUser, setFilterUser] = useState<string>('all');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    // UI state
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Build product list: prefer `products` prop, otherwise dedupe from movements
    const productList = useMemo<ProductLite[]>(() => {
        if (Array.isArray(products) && products.length > 0) {
            // ensure unique by sku
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

    // Build user list for filter
    const userList = useMemo<string[]>(() => {
        const users = new Set<string>();
        for (const m of inventoryMovements) {
            if (m.user?.name) users.add(m.user.name);
        }
        return Array.from(users).sort();
    }, [inventoryMovements]);

    // Filter table (Derived State)
    const filteredMovements = useMemo(() => {
        const term = search.trim().toLowerCase();
        let result = inventoryMovements;

        // 1. Text Search
        if (term !== '') {
            result = result.filter(movement =>
                (movement.product?.name || '').toLowerCase().includes(term) ||
                (movement.product?.sku || '').toLowerCase().includes(term) ||
                (movement.user?.name || '').toLowerCase().includes(term)
            );
        }

        // 2. Type Filter
        if (filterType !== 'all') {
            result = result.filter(m => m.type === filterType);
        }

        // 3. User Filter
        if (filterUser !== 'all') {
            result = result.filter(m => m.user?.name === filterUser);
        }

        // 4. Date Range
        if (startDate) {
            const start = new Date(startDate);
            // set to beginning of day in local time
            start.setHours(0, 0, 0, 0);
            result = result.filter(m => new Date(m.created_at) >= start);
        }
        if (endDate) {
            const end = new Date(endDate);
            // set to end of day in local time
            end.setHours(23, 59, 59, 999);
            result = result.filter(m => new Date(m.created_at) <= end);
        }

        return result;
    }, [search, filterType, filterUser, startDate, endDate, inventoryMovements]);

    // Suggestions for search (Derived State)
    const suggestions = useMemo(() => {
        const term = search.trim();
        if (term === '') {
            return productList.slice(0, 100);
        }

        return productList.filter(p =>
            p.name.toLowerCase().includes(term.toLowerCase()) ||
            p.sku.toLowerCase().includes(term.toLowerCase())
        ).slice(0, 100);
    }, [search, productList]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Helpers for UI/formatting
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
                return 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400';
            case 'adjustment':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Handlers
    const handleInputFocus = () => {
        setShowDropdown(productList.length > 0);
    };

    const handleSelectSuggestion = (item: ProductLite) => {
        setSearch(`${item.sku}`);
        setShowDropdown(false);
    };

    const handleClearFilters = () => {
        setSearch('');
        setFilterType('all');
        setFilterUser('all');
        setStartDate('');
        setEndDate('');
    };

    const hasActiveFilters = search !== '' || filterType !== 'all' || filterUser !== 'all' || startDate !== '' || endDate !== '';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Filter Bar */}
                <div className="rounded-xl border border-sidebar-border bg-white p-4 dark:bg-neutral-800/50">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 items-end">
                        
                        {/* Search (Takes 4 cols on large) */}
                        <div className="relative lg:col-span-4" ref={dropdownRef}>
                            <label className="mb-1 block text-xs font-medium text-neutral-500">Search</label>
                            <input
                                ref={inputRef}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={handleInputFocus}
                                type="text"
                                className="w-full rounded-lg border border-sidebar-border bg-transparent p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                                placeholder="Product, SKU, or User..."
                            />
                            {/* Dropdown */}
                            {showDropdown && suggestions.length > 0 && (
                                <div className="absolute left-0 top-full z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-sidebar-border bg-white shadow-lg dark:bg-neutral-800">
                                    {suggestions.map((item) => (
                                        <button
                                            key={item.sku}
                                            type="button"
                                            onClick={() => handleSelectSuggestion(item)}
                                            className="flex w-full flex-col px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700"
                                        >
                                            <div className="flex justify-between">
                                                <span className="font-medium">{item.name}</span>
                                                <span className="text-xs text-neutral-500 dark:text-neutral-400">{item.sku}</span>
                                            </div>
                                            <span className="text-xs text-neutral-600 dark:text-neutral-400">SKU: {item.sku}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Type Filter (2 cols) */}
                        <div className="lg:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-neutral-500">Type</label>
                            <select 
                                className="w-full rounded-lg border border-sidebar-border bg-transparent p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="in">Stock In</option>
                                <option value="out">Stock Out</option>
                                <option value="adjustment">Adjustment</option>
                            </select>
                        </div>

                        {/* User Filter (2 cols) */}
                        <div className="lg:col-span-2">
                            <label className="mb-1 block text-xs font-medium text-neutral-500">User</label>
                            <select 
                                className="w-full rounded-lg border border-sidebar-border bg-transparent p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                                value={filterUser}
                                onChange={(e) => setFilterUser(e.target.value)}
                            >
                                <option value="all">All Users</option>
                                {userList.map(u => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date Range (Start) (2 cols) */}
                        <div className="lg:col-span-2">
                             <label className="mb-1 block text-xs font-medium text-neutral-500">From</label>
                            <input 
                                type="date" 
                                className="w-full rounded-lg border border-sidebar-border bg-transparent p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        {/* Date Range (End) (2 cols) */}
                        <div className="lg:col-span-2">
                             <label className="mb-1 block text-xs font-medium text-neutral-500">To</label>
                            <input 
                                type="date" 
                                className="w-full rounded-lg border border-sidebar-border bg-transparent p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Active Filters / Clear Button Row */}
                    {hasActiveFilters && (
                        <div className="mt-3 flex justify-end">
                            <button
                                onClick={handleClearFilters}
                                className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 underline decoration-dashed underline-offset-4"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Inventory Movements Table */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70">
                    <div className="p-4 border-b border-sidebar-border">
                        <h2 className="text-lg font-semibold">Inventory Movement History</h2>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Track all inventory changes and transactions
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-sidebar-border bg-neutral-50 dark:bg-neutral-900/50">
                                <tr className="text-left">
                                    <th className="p-4 font-semibold">Date</th>
                                    <th className="p-4 font-semibold">Product</th>
                                    <th className="p-4 font-semibold">SKU</th>
                                    <th className="p-4 font-semibold">Current Stock</th>
                                    <th className="p-4 font-semibold">Type</th>
                                    <th className="p-4 font-semibold">Quantity</th>
                                    <th className="p-4 font-semibold">User</th>
                                    <th className="p-4 font-semibold">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMovements.length > 0 ? (
                                    filteredMovements.map((movement) => (
                                        <tr
                                            key={movement.id}
                                            className="border-b border-sidebar-border/50 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                                        >
                                            <td className="p-4 text-sm text-neutral-600 dark:text-neutral-400">
                                                {formatDate(movement.created_at)}
                                            </td>
                                            <td className="p-4 font-medium">
                                                {movement.product.name}
                                            </td>
                                            <td className="p-4 text-neutral-600 dark:text-neutral-400">
                                                {movement.product.sku}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-block rounded-md px-2.5 py-1 text-sm font-semibold ${(movement.product.stock?.stock ?? 0) <= 10
                                                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200'
                                                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200'
                                                    }`}>
                                                    {movement.product.stock?.stock ?? 0}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getMovementTypeColor(movement.type)}`}>
                                                    {getMovementTypeLabel(movement.type)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={movement.type === 'in' ? 'text-green-600 dark:text-green-400 font-semibold' : movement.type === 'out' ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}>
                                                    {movement.type === 'in' ? '+' : movement.type === 'out' ? '-' : ''}{movement.quantity}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {movement.user.name}
                                            </td>
                                            <td className="p-4 text-sm text-neutral-600 dark:text-neutral-400">
                                                {movement.note || '-'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="p-8 text-center text-neutral-500">
                                            {hasActiveFilters ? 'No movements found matching your filters' : 'No inventory movements yet'}
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
