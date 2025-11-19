import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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
        name: string;
        sku: string;
        stock?: {
            stock: number;
        };
    };
    type: 'in' | 'out' | 'adjustment';
    quantity: number;
    notes?: string;
    created_at: string;
}

interface DashboardProps {
    inventoryMovements: InventoryMovement[];
}

export default function Dashboard({ inventoryMovements = [] }: DashboardProps) {
    const [search, setSearch] = useState('');

    // Filter movements based on search
    const filteredMovements = inventoryMovements.filter(movement =>
        movement.product.name.toLowerCase().includes(search.toLowerCase()) ||
        movement.product.sku.toLowerCase().includes(search.toLowerCase()) ||
        movement.user.name.toLowerCase().includes(search.toLowerCase())
    );

    // Helper function to format the movement type
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

    // Helper function to get badge color
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

    // Format date
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

                {/* Search Bar */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="w-full p-3 bg-transparent border-0 focus:outline-none focus:ring-0"
                        placeholder="Search by product, SKU, or user..."
                    />
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
                                                {movement.notes || '-'}
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
