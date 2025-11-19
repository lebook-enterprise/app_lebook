import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { products as productsRoute } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: productsRoute().url,
    },
];

interface Product {
    id: number;
    name: string;
    sku: string;
    category_id: number;
    category?: {
        id: number;
        name: string;
    };
    stock?: {
        stock: number;
    };
}

interface Category {
    id: number;
    name: string;
}

interface ProductsProps {
    products: Product[];
    categories: Category[];
}

export default function Products({ products = [], categories = [] }: ProductsProps) {
    const [search, setSearch] = useState('');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showModal, setShowModal] = useState(false);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        sku: '',
        category_id: '',
    });

    // Filter products based on search
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase())
    );

    // Open edit modal
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setData({
            name: product.name,
            sku: product.sku,
            category_id: product.category_id.toString(),
        });
        setShowModal(true);
    };

    // Submit edit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        put(`/products/${editingProduct.id}`, {
            onSuccess: () => {
                setShowModal(false);
                setEditingProduct(null);
                reset();
            },
        });
    };

    // Delete product
    const handleDelete = () => {
        if (!editingProduct) return;

        if (confirm(`Are you sure you want to delete "${editingProduct.name}"?`)) {
            router.delete(`/products/${editingProduct.id}`, {
                onSuccess: () => {
                    setShowModal(false);
                    setEditingProduct(null);
                    reset();
                },
            });
        }
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        reset();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Search Bar */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="w-full p-3 bg-transparent border-0 focus:outline-none focus:ring-0"
                        placeholder="Search products by name or SKU..."
                    />
                </div>

                {/* Products Table */}
                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-sidebar-border">
                                <tr className="text-left">
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">SKU</th>
                                    <th className="p-4 font-semibold">Category</th>
                                    <th className="p-4 font-semibold">Stock</th>
                                    <th className="p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id} className="border-b border-sidebar-border/50 hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                                            <td className="p-4">{product.name}</td>
                                            <td className="p-4 text-neutral-600 dark:text-neutral-400">{product.sku}</td>
                                            <td className="p-4">{product.category?.name || 'N/A'}</td>
                                            <td className="p-4">{product.stock?.stock || 0}</td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="rounded-lg border border-sidebar-border px-3 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-neutral-500">
                                            No products found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeModal}>
                    <div
                        className="relative w-full max-w-md rounded-xl border border-sidebar-border bg-white dark:bg-neutral-900 p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Product Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border p-2"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            {/* SKU */}
                            <div>
                                <label className="block text-sm font-medium mb-1">SKU</label>
                                <input
                                    type="text"
                                    value={data.sku}
                                    onChange={(e) => setData('sku', e.target.value)}
                                    className="w-full rounded-lg border p-2"
                                />
                                {errors.sku && <p className="text-red-500 text-sm mt-1">{errors.sku}</p>}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="w-full rounded-lg border p-2"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="rounded-lg border border-red-500 text-red-500 px-4 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20"
                                >
                                    Delete
                                </button>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-lg border border-sidebar-border px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black px-4 py-2 text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
