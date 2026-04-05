import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { products as productsRoute } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Edit2, Package, Plus, Search, Tag, Trash2 } from 'lucide-react';
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
    description?: string;
}

interface ProductsProps {
    products: Product[];
    categories: Category[];
}

export default function Products({
    products = [],
    categories = [],
}: ProductsProps) {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user.is_organization_admin || auth.user.is_super_admin;

    const [view, setView] = useState<'products' | 'categories'>('products');
    const [search, setSearch] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // --- Product state ---
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showProductModal, setShowProductModal] = useState(false);

    const productForm = useForm({
        name: '',
        sku: '',
        category_id: '',
    });

    // --- Category state ---
    const [editingCategory, setEditingCategory] = useState<Category | null>(
        null,
    );
    const [showCategoryModal, setShowCategoryModal] = useState(false);

    const categoryForm = useForm({
        name: '',
        description: '',
    });

    // --- Filter products ---
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.sku.toLowerCase().includes(search.toLowerCase()),
    );

    // --- Filter categories ---
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase()),
    );

    // --- Product Handlers ---
    const handleAddProduct = () => {
        setEditingProduct(null);
        productForm.reset();
        setShowProductModal(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        productForm.setData({
            name: product.name,
            sku: product.sku,
            category_id: product.category_id.toString(),
        });
        setShowProductModal(true);
    };

    const handleProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            productForm.put(`/products/${editingProduct.id}`, {
                onSuccess: () => {
                    setShowProductModal(false);
                    setSuccessMessage('Product updated successfully!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                },
            });
        } else {
            productForm.post('/products', {
                onSuccess: () => {
                    setShowProductModal(false);
                    setSuccessMessage('Product added successfully!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                },
            });
        }
    };

    const handleDeleteProduct = () => {
        if (!editingProduct) return;
        if (
            confirm(`Are you sure you want to delete "${editingProduct.name}"?`)
        ) {
            router.delete(`/products/${editingProduct.id}`, {
                onSuccess: () => {
                    setShowProductModal(false);
                    setSuccessMessage('Product deleted successfully!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                },
            });
        }
    };

    // --- Category Handlers ---
    const handleAddCategory = () => {
        setEditingCategory(null);
        categoryForm.reset();
        setShowCategoryModal(true);
    };

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        categoryForm.setData({
            name: category.name,
            description: category.description || '',
        });
        setShowCategoryModal(true);
    };

    const handleCategorySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            categoryForm.put(`/categories/${editingCategory.id}`, {
                onSuccess: () => {
                    setShowCategoryModal(false);
                    setSuccessMessage('Category updated successfully!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                },
            });
        } else {
            categoryForm.post('/categories', {
                onSuccess: () => {
                    setShowCategoryModal(false);
                    setSuccessMessage('Category added successfully!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                },
            });
        }
    };

    const handleDeleteCategory = (category: Category) => {
        if (
            confirm(
                `Are you sure you want to delete "${category.name}"? All products in this category might be affected.`,
            )
        ) {
            router.delete(`/categories/${category.id}`, {
                onSuccess: () => {
                    setSuccessMessage('Category deleted successfully!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={view === 'products' ? 'Products' : 'Categories'} />

            <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-6 rounded-xl p-4 md:p-6">
                {/* Header with Switcher */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
                        <button
                            onClick={() => {
                                setView('products');
                                setSearch('');
                            }}
                            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                                view === 'products'
                                    ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                                    : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                            }`}
                        >
                            <Package className="h-4 w-4" />
                            Products
                        </button>
                        <button
                            onClick={() => {
                                setView('categories');
                                setSearch('');
                            }}
                            className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                                view === 'categories'
                                    ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white'
                                    : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                            }`}
                        >
                            <Tag className="h-4 w-4" />
                            Categories
                        </button>
                    </div>

                    {isAdmin && (
                        <Button
                            onClick={
                                view === 'products'
                                    ? handleAddProduct
                                    : handleAddCategory
                            }
                            size="sm"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            {view === 'products'
                                ? 'Add Product'
                                : 'Add Category'}
                        </Button>
                    )}
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="animate-in rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 duration-300 fade-in slide-in-from-top-2 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200">
                        {successMessage}
                    </div>
                )}

                {/* Search Bar */}
                <div className="group relative">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-neutral-600" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pr-4 pl-10 text-sm shadow-sm transition-all focus:ring-2 focus:ring-neutral-200 focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:focus:ring-neutral-800"
                        placeholder={
                            view === 'products'
                                ? 'Search products by name or SKU...'
                                : 'Search categories by name...'
                        }
                    />
                </div>

                {/* Main Content Area */}
                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="overflow-x-auto">
                        {view === 'products' ? (
                            <table className="w-full text-sm">
                                <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
                                    <tr className="text-left">
                                        <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400">
                                            Name
                                        </th>
                                        <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400">
                                            SKU
                                        </th>
                                        <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400">
                                            Category
                                        </th>
                                        <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400">
                                            Stock
                                        </th>
                                        <th className="p-4 text-right font-semibold text-neutral-600 dark:text-neutral-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/30"
                                            >
                                                <td className="p-4 font-medium text-neutral-900 dark:text-neutral-100">
                                                    {product.name}
                                                </td>
                                                <td className="p-4 text-neutral-500">
                                                    {product.sku}
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center rounded border border-neutral-200 bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                                                        {product.category
                                                            ?.name || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`font-semibold ${(product.stock?.stock || 0) <= 5 ? 'text-red-500' : 'text-neutral-700 dark:text-neutral-300'}`}
                                                    >
                                                        {product.stock?.stock ||
                                                            0}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    {isAdmin && (
                                                        <button
                                                            onClick={() =>
                                                                handleEditProduct(
                                                                    product,
                                                                )
                                                            }
                                                            className="rounded-md p-1.5 text-neutral-600 transition-colors hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="p-12 text-center text-neutral-500 italic"
                                            >
                                                No products found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
                                    <tr className="text-left">
                                        <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400">
                                            Category Name
                                        </th>
                                        <th className="p-4 font-semibold text-neutral-600 dark:text-neutral-400">
                                            Description
                                        </th>
                                        <th className="p-4 text-right font-semibold text-neutral-600 dark:text-neutral-400">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {filteredCategories.length > 0 ? (
                                        filteredCategories.map((category) => (
                                            <tr
                                                key={category.id}
                                                className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/30"
                                            >
                                                <td className="p-4 font-medium text-neutral-900 dark:text-neutral-100">
                                                    {category.name}
                                                </td>
                                                <td className="max-w-xs truncate p-4 text-neutral-500">
                                                    {category.description ||
                                                        '—'}
                                                </td>
                                                <td className="flex justify-end gap-1 p-4 text-right">
                                                    {isAdmin && (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    handleEditCategory(
                                                                        category,
                                                                    )
                                                                }
                                                                className="rounded-md p-1.5 text-neutral-600 transition-colors hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                                                title="Edit"
                                                            >
                                                                <Edit2 className="h-4 w-4" />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteCategory(
                                                                        category,
                                                                    )
                                                                }
                                                                className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                title="Delete"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="p-12 text-center text-neutral-500 italic"
                                            >
                                                No categories found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            {showProductModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
                        onClick={() => setShowProductModal(false)}
                    />
                    <div className="relative w-full max-w-md animate-in rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl duration-200 zoom-in-95 dark:border-neutral-800 dark:bg-neutral-950">
                        <h2 className="mb-6 text-xl font-bold">
                            {editingProduct
                                ? 'Edit Product'
                                : 'Add New Product'}
                        </h2>

                        <form
                            onSubmit={handleProductSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    value={productForm.data.name}
                                    onChange={(e) =>
                                        productForm.setData(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:ring-neutral-200 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-800"
                                    placeholder="Enter product name"
                                />
                                {productForm.errors.name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {productForm.errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-semibold">
                                    SKU
                                </label>
                                <input
                                    type="text"
                                    value={productForm.data.sku}
                                    onChange={(e) =>
                                        productForm.setData(
                                            'sku',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:ring-neutral-200 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-800"
                                    placeholder="e.g. LAP-001"
                                />
                                {productForm.errors.sku && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {productForm.errors.sku}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-semibold">
                                    Category
                                </label>
                                <select
                                    value={productForm.data.category_id}
                                    onChange={(e) =>
                                        productForm.setData(
                                            'category_id',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:ring-neutral-200 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-800"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {productForm.errors.category_id && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {productForm.errors.category_id}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-4">
                                {isAdmin && editingProduct && (
                                    <button
                                        type="button"
                                        onClick={handleDeleteProduct}
                                        className="flex items-center px-2 py-1 text-sm font-medium text-red-500 transition-colors hover:text-red-700"
                                    >
                                        <Trash2 className="mr-1.5 h-4 w-4" />
                                        Delete Product
                                    </button>
                                )}
                                <div className="flex-1" />
                                <button
                                    type="button"
                                    onClick={() => setShowProductModal(false)}
                                    className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={productForm.processing}
                                    className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:opacity-50 dark:bg-neutral-100 dark:text-black"
                                >
                                    {productForm.processing
                                        ? 'Saving...'
                                        : editingProduct
                                          ? 'Save Changes'
                                          : 'Create Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-sm"
                        onClick={() => setShowCategoryModal(false)}
                    />
                    <div className="relative w-full max-w-md animate-in rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl duration-200 zoom-in-95 dark:border-neutral-800 dark:bg-neutral-950">
                        <h2 className="mb-6 text-xl font-bold">
                            {editingCategory
                                ? 'Edit Category'
                                : 'Add New Category'}
                        </h2>

                        <form
                            onSubmit={handleCategorySubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value={categoryForm.data.name}
                                    onChange={(e) =>
                                        categoryForm.setData(
                                            'name',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:ring-neutral-200 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-800"
                                    placeholder="e.g. Electronics"
                                />
                                {categoryForm.errors.name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {categoryForm.errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1.5 block text-sm font-semibold">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={categoryForm.data.description}
                                    onChange={(e) =>
                                        categoryForm.setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm transition-all focus:ring-2 focus:ring-neutral-200 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:focus:ring-neutral-800"
                                    placeholder="Describe this category..."
                                    rows={3}
                                />
                                {categoryForm.errors.description && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {categoryForm.errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCategoryModal(false)}
                                    className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={categoryForm.processing}
                                    className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:opacity-50 dark:bg-neutral-100 dark:text-black"
                                >
                                    {categoryForm.processing
                                        ? 'Saving...'
                                        : editingCategory
                                          ? 'Save Changes'
                                          : 'Create Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
