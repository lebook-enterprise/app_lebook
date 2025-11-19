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

interface DashboardProps {
    inventoryMovements: InventoryMovement[];
}

export default function Dashboard({ inventoryMovements = [] }: DashboardProps) {
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [suggestions, setSuggestions] = useState<
        { name: string; sku: string; id?: number }[]
    >([]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Extract unique products from movements (deduplicated by SKU)
    const allProducts = useMemo(() => {
        const map = new Map<string, { name: string; sku: string; id?: number }>();
        for (const m of inventoryMovements) {
            if (m.product?.sku) {
                map.set(m.product.sku, {
                    name: m.product.name,
                    sku: m.product.sku,
                    id: m.product.id,
                });
            }
        }
        return Array.from(map.values());
    }, [inventoryMovements]);

    // Filter movements based on search (keeps original behavior)
    const filteredMovements = inventoryMovements.filter(movement =>
        movement.product.name.toLowerCase().includes(search.toLowerCase()) ||
        movement.product.sku.toLowerCase().includes(search.toLowerCase()) ||
        movement.user.name.toLowerCase().includes(search.toLowerCase())
    );

    // Build suggestions based on search term
    useEffect(() => {
        const term = search.trim();
        if (term === '') {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(term.toLowerCase()) ||
            p.sku.toLowerCase().includes(term.toLowerCase())
        );

        setSuggestions(filtered);
        setShowDropdown(filtered.length > 0);
    }, [search, allProducts]);

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

    // Helpers
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
                return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200';
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Search Bar With Suggestions */}
                <div className="relative overflow-visible rounded-xl border border-sidebar-border" ref={dropdownRef}>
                    <input
                        ref={inputRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="w-full p-3 bg-transparent border-0 focus:outline-none focus:ring-0"
                        placeholder="Search by product, SKU, or user..."
                        onFocus={() => {
                            if (suggestions.length > 0) setShowDropdown(true);
                        }}
                    />

                    {/* Dropdown */}
                    {showDropdown && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 w-full z-20 mt-1 bg-white dark:bg-neutral-800 border border-sidebar-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {suggestions.map((item) => (
                                <button
                                    key={item.sku}
                                    type="button"
                                    onClick={() => {
                                        // Set the search input to the product name (keeps existing filter behavior)
                                        setSearch(item.name);
                                        setShowDropdown(false);

                                        // focus back to input so user can continue typing if needed
                                        setTimeout(() => inputRef.current?.focus(), 0);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 flex flex-col"
                                >
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">SKU: {item.sku}</span>
                                </button>
                            ))}
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
                                                <span className="inline-block px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 font-semibold">
                                                    {movement.product.stock?.stock ?? 0}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${getMovementTypeColor(movement.type)}`}>
                                                    {getMovementTypeLabel(movement.type)}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={movement.type === 'in' ? 'text-green-600 dark:text-green-400 font-semibold' : movement.type === 'out' ? 'text-red-600 dark:text-red-400 font-semibold' : ''}>
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
                                            {search ? 'No movements found matching your search' : 'No inventory movements yet'}
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
