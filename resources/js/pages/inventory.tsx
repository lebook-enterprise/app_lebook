import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { inventory } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: inventory().url,
    },
];

export default function Inventory() {
    const [activeForm, setActiveForm] = useState<'in' | 'out' | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

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

                {activeForm === 'in' && (
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-4">
                        <h2 className="font-semibold text-lg mb-4">Check In Product</h2>
                        <form>
                            <input
                                type="text"
                                placeholder="Product ID"
                                className="mb-2 w-full rounded-lg border p-2"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                className="mb-2 w-full rounded-lg border p-2"
                            />
                            <button className="mt-2 rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900">
                                Submit
                            </button>
                        </form>
                    </div>
                )}

                {activeForm === 'out' && (
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-4">
                        <h2 className="font-semibold text-lg mb-4">Check Out Product</h2>
                        <form>
                            <input
                                type="text"
                                placeholder="Product ID"
                                className="mb-2 w-full rounded-lg border p-2"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                className="mb-2 w-full rounded-lg border p-2"
                            />
                            <button className="mt-2 rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900">
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
