import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { inventory } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory',
        href: inventory().url,
    },
];

export default function Inventory({ products, categories }) {
    const [activeForm, setActiveForm] = useState<'in' | 'out' | null>(null);

    // --- Check In Form ---
    const {
        data: inData,
        setData: setInData,
        post: postIn,
        processing: inProcessing,
        errors: inErrors,
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
    } = useForm({
        product_id: "",
        quantity: "",
        note: "",
    });

    const submitCheckIn = (e: any) => {
        e.preventDefault();
        postIn("/inventory/check-in");
    };

    const submitCheckOut = (e: any) => {
        e.preventDefault();
        postOut("/inventory/check-out");
    };

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

                {/* ----------------------- CHECK IN FORM ----------------------- */}
                {activeForm === 'in' && (
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 p-4">
                        <h2 className="font-semibold text-lg mb-4">Check In Product</h2>

                        <form onSubmit={submitCheckIn} className="space-y-3">
                            {/* Product Name */}
                            <input
                                type="text"
                                placeholder="Product name"
                                value={inData.name}
                                onChange={(e) => setInData("name", e.target.value)}
                                className="w-full rounded-lg border p-2"
                            />
                            {inErrors.name && <p className="text-red-500 text-sm">{inErrors.name}</p>}

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
                                className="mt-2 rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                            >
                                Submit
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
                                className="mt-2 rounded-lg border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
