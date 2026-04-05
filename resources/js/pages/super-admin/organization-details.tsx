import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Package, Trash2, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Super Admin',
        href: '/super-admin',
    },
    {
        title: 'Organizations',
        href: '/super-admin/organizations',
    },
];

interface Movement {
    id: number;
    type: 'in' | 'out';
    quantity: number;
    note: string | null;
    created_at: string;
    user: {
        id: number;
        name: string;
    };
    product: {
        id: number;
        name: string;
        sku: string;
    };
}

interface Props {
    organization: {
        id: number;
        name: string;
        slug: string;
        logo_url: string | null;
        created_at: string;
        users: Array<{
            id: number;
            name: string;
            email: string;
            is_organization_admin: boolean;
        }>;
        categories: Array<{
            id: number;
            name: string;
        }>;
        products: Array<{
            id: number;
            name: string;
            sku: string;
            stock: {
                stock: number;
            };
        }>;
    };
    recentMovements: Movement[];
    stats: {
        total_users: number;
        total_products: number;
        total_categories: number;
        total_stock: number;
        movements_today: number;
    };
}

export default function OrganizationDetails({
    organization,
    recentMovements,
    stats,
}: Props) {
    const breadcrumbsWithOrg: BreadcrumbItem[] = [
        ...breadcrumbs,
        {
            title: organization.name,
            href: `/super-admin/organizations/${organization.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsWithOrg}>
            <Head title={organization.name} />

            <div className="py-6">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/super-admin/organizations">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">
                                {organization.name}
                            </h1>
                            <p className="text-muted-foreground">
                                /{organization.slug}
                            </p>
                        </div>
                    </div>
                    <Link
                        href={`/super-admin/organizations/${organization.id}`}
                        method="delete"
                        as="button"
                    >
                        <Button variant="destructive" size="sm">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Organization
                        </Button>
                    </Link>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Users className="h-4 w-4" />
                                Members
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {stats.total_users}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Package className="h-4 w-4" />
                                Products
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {stats.total_products}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                                Categories
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {stats.total_categories}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                                Total Stock
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {stats.total_stock}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">
                                Movements Today
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {stats.movements_today}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {organization.users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between rounded-lg border p-3"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                        {user.is_organization_admin && (
                                            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                Admin
                                            </span>
                                        )}
                                    </div>
                                ))}
                                {organization.users.length === 0 && (
                                    <p className="text-center text-muted-foreground">
                                        No members
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {organization.products
                                    .slice(0, 10)
                                    .map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex items-center justify-between rounded-lg border p-3"
                                        >
                                            <div>
                                                <p className="font-medium">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {product.sku}
                                                </p>
                                            </div>
                                            <span className="font-medium">
                                                {product.stock?.stock || 0}{' '}
                                                units
                                            </span>
                                        </div>
                                    ))}
                                {organization.products.length === 0 && (
                                    <p className="text-center text-muted-foreground">
                                        No products
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Date
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            User
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Product
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Type
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Quantity
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Note
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentMovements.map((movement) => (
                                        <tr
                                            key={movement.id}
                                            className="border-b"
                                        >
                                            <td className="py-3 text-muted-foreground">
                                                {new Date(
                                                    movement.created_at,
                                                ).toLocaleString()}
                                            </td>
                                            <td className="py-3">
                                                {movement.user.name}
                                            </td>
                                            <td className="py-3">
                                                <div>
                                                    <p className="font-medium">
                                                        {movement.product.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {movement.product.sku}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-3">
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                        movement.type === 'in'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                                >
                                                    {movement.type === 'in'
                                                        ? 'Check In'
                                                        : 'Check Out'}
                                                </span>
                                            </td>
                                            <td className="py-3 font-medium">
                                                {movement.quantity}
                                            </td>
                                            <td className="py-3 text-muted-foreground">
                                                {movement.note || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                    {recentMovements.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-4 text-center text-muted-foreground"
                                            >
                                                No activity yet
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
