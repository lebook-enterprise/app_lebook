import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Activity, Building2, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Super Admin',
        href: '/super-admin',
    },
];

interface Organization {
    id: number;
    name: string;
    slug: string;
    users_count: number;
    products_count: number;
    categories_count: number;
    created_at: string;
    users: Array<{
        id: number;
        name: string;
        email: string;
    }>;
}

interface Props {
    organizations: Organization[];
}

export default function SuperAdminDashboard({ organizations }: Props) {
    const totalUsers = organizations.reduce(
        (sum, org) => sum + org.users_count,
        0,
    );
    const totalProducts = organizations.reduce(
        (sum, org) => sum + org.products_count,
        0,
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Super Admin Dashboard" />

            <div className="py-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                        Super Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Manage all organizations and users
                    </p>
                </div>

                <div className="mb-6 flex gap-4">
                    <Link
                        href="/super-admin/organizations"
                        className="flex items-center gap-2 rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-muted"
                    >
                        <Building2 className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-2xl font-bold">
                                {organizations.length}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Organizations
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/super-admin/users"
                        className="flex items-center gap-2 rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-muted"
                    >
                        <Users className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-2xl font-bold">{totalUsers}</p>
                            <p className="text-sm text-muted-foreground">
                                Total Users
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/super-admin/activity"
                        className="flex items-center gap-2 rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-muted"
                    >
                        <Activity className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-2xl font-bold">View</p>
                            <p className="text-sm text-muted-foreground">
                                Activity Log
                            </p>
                        </div>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Organizations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Organization
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Slug
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Members
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Products
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Created
                                        </th>
                                        <th className="pb-3 text-left text-sm font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {organizations.map((org) => (
                                        <tr key={org.id} className="border-b">
                                            <td className="py-3">
                                                <Link
                                                    href={`/super-admin/organizations/${org.id}`}
                                                    className="font-medium hover:underline"
                                                >
                                                    {org.name}
                                                </Link>
                                            </td>
                                            <td className="py-3 text-muted-foreground">
                                                {org.slug}
                                            </td>
                                            <td className="py-3">
                                                {org.users_count}
                                            </td>
                                            <td className="py-3">
                                                {org.products_count}
                                            </td>
                                            <td className="py-3 text-muted-foreground">
                                                {new Date(
                                                    org.created_at,
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="py-3">
                                                <Link
                                                    href={`/super-admin/organizations/${org.id}`}
                                                    className="text-sm text-primary hover:underline"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {organizations.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="py-4 text-center text-muted-foreground"
                                            >
                                                No organizations yet
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
