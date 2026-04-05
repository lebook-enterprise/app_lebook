import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Activity, ArrowLeft, Building2, Package } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Super Admin',
        href: '/super-admin',
    },
    {
        title: 'Activity',
        href: '/super-admin/activity',
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
        email: string;
    };
    product: {
        id: number;
        name: string;
        sku: string;
    };
    organization: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Props {
    recentMovements: Movement[];
}

export default function SuperAdminActivity({ recentMovements }: Props) {
    const checkIns = recentMovements.filter((m) => m.type === 'in').length;
    const checkOuts = recentMovements.filter((m) => m.type === 'out').length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Activity Log - Super Admin" />

            <div className="py-6">
                <div className="mb-6 flex items-center gap-4">
                    <Link href="/super-admin">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Activity Log</h1>
                        <p className="text-muted-foreground">
                            Recent inventory movements across all organizations
                        </p>
                    </div>
                </div>

                <div className="mb-6 flex gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Package className="h-4 w-4 text-green-600" />
                                Total Check-Ins
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{checkIns}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Package className="h-4 w-4 text-red-600" />
                                Total Check-Outs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{checkOuts}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Recent Activity
                        </CardTitle>
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
                                            Organization
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
                                                <Link
                                                    href={`/super-admin/organizations/${movement.organization.id}`}
                                                    className="flex items-center gap-1 hover:underline"
                                                >
                                                    <Building2 className="h-3 w-3" />
                                                    {movement.organization.name}
                                                </Link>
                                            </td>
                                            <td className="py-3">
                                                <div>
                                                    <p className="font-medium">
                                                        {movement.user.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {movement.user.email}
                                                    </p>
                                                </div>
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
                                                colSpan={7}
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
