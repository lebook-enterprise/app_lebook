import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { products } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products().url,
    },
];

export default function Products() {
    const [search, setSearch] = useState('');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/* Search Bar Block */}
                <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border h-10">
                    <form action="" method="GET">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            className="m-2 w-100"
                            placeholder="Search products"
                        />
                    </form>
                </div>

                {/* Content Blocks */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">

                    {/* Product List */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <h1 className="p-4 font-semibold text-lg">Product List</h1>

                        {/* Preview section for list */}
                        <p className="p-4 text-sm opacity-70">
                            Display the list of products here...
                        </p>
                    </div>

                    {/* Product Status / Analytics */}
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <h1 className="p-4 font-semibold text-lg">Categories / Status</h1>

                        {/* Preview section for hints */}
                        <p className="p-4 text-sm opacity-70">
                            Filters, categories, or analytics can go here.
                        </p>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
