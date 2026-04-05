import { settings, store, update } from '@/routes/organization';
import { type BreadcrumbItem, type SharedData, type User } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    Check,
    Mail,
    Settings,
    Trash2,
    UserMinus,
    UserPlus,
    Users,
    X,
} from 'lucide-react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Organization Settings',
        href: settings().url,
    },
];

interface Invitation {
    id: number;
    email: string;
    role: string;
    expires_at: string;
}

interface JoinRequest {
    id: number;
    user_id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    status: string;
    created_at: string;
}

interface OrganizationData {
    id: number;
    name: string;
    slug: string;
    logo_url: string | null;
}

interface Props {
    organization: OrganizationData;
    members: User[];
    pendingInvitations: Invitation[];
    pendingJoinRequests: JoinRequest[];
}

export default function OrganizationSettings({
    organization,
    members,
    pendingInvitations,
    pendingJoinRequests,
}: Props) {
    const { auth } = usePage<SharedData>().props;

    const orgForm = useForm({
        name: organization.name,
        slug: organization.slug,
    });

    const invitationForm = useForm({
        email: '',
        role: 'member',
    });

    const handleOrgUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        orgForm.put(update().url);
    };

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        invitationForm.post(store().url, {
            onSuccess: () => invitationForm.reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Organization Settings" />

            <div className="px-4 py-6">
                <HeadingSmall
                    title="Organization Settings"
                    description="Manage your organization details and team members"
                />

                <div className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Organization Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleOrgUpdate}
                                className="space-y-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="name">
                                        Organization Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={orgForm.data.name}
                                        onChange={(e) =>
                                            orgForm.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={orgForm.errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        value={orgForm.data.slug}
                                        onChange={(e) =>
                                            orgForm.setData(
                                                'slug',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={orgForm.errors.slug} />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={orgForm.processing}
                                >
                                    Save Changes
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Team Members
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead className="w-[100px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {members.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell>{member.name}</TableCell>
                                            <TableCell>
                                                {member.email}
                                            </TableCell>
                                            <TableCell>
                                                {member.is_organization_admin
                                                    ? 'Admin'
                                                    : 'Member'}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/organization/members/${member.id}/role`}
                                                        method="put"
                                                        data={{
                                                            is_organization_admin:
                                                                !member.is_organization_admin,
                                                        }}
                                                        as="button"
                                                        className="text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        {member.is_organization_admin
                                                            ? 'Demote'
                                                            : 'Promote'}
                                                    </Link>

                                                    <Link
                                                        href={`/organization/members/${member.id}`}
                                                        method="delete"
                                                        as="button"
                                                        className="text-sm text-red-600 hover:text-red-800"
                                                    >
                                                        <UserMinus className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {members.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-center text-muted-foreground"
                                            >
                                                No team members yet
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Pending Invitations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Expires</TableHead>
                                        <TableHead className="w-[100px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingInvitations.map((invitation) => (
                                        <TableRow key={invitation.id}>
                                            <TableCell>
                                                {invitation.email}
                                            </TableCell>
                                            <TableCell className="capitalize">
                                                {invitation.role}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    invitation.expires_at,
                                                ).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    href={`/organization/invitations/${invitation.id}`}
                                                    method="delete"
                                                    as="button"
                                                    className="text-sm text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {pendingInvitations.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-center text-muted-foreground"
                                            >
                                                No pending invitations
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                            <Separator className="my-6" />

                            <form onSubmit={handleInvite} className="space-y-4">
                                <HeadingSmall
                                    title="Invite Team Member"
                                    description="Send an invitation to join your organization"
                                />
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            value={invitationForm.data.email}
                                            onChange={(e) =>
                                                invitationForm.setData(
                                                    'email',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={
                                                invitationForm.errors.email
                                            }
                                        />
                                    </div>
                                    <Select
                                        value={invitationForm.data.role}
                                        onValueChange={(value) =>
                                            invitationForm.setData(
                                                'role',
                                                value,
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="member">
                                                Member
                                            </SelectItem>
                                            <SelectItem value="admin">
                                                Admin
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button
                                        type="submit"
                                        disabled={invitationForm.processing}
                                    >
                                        <Mail className="mr-2 h-4 w-4" />
                                        Invite
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserPlus className="h-5 w-5" />
                                Join Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Requested</TableHead>
                                        <TableHead className="w-[150px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pendingJoinRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell>
                                                {request.user.name}
                                            </TableCell>
                                            <TableCell>
                                                {request.user.email}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    request.created_at,
                                                ).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/organization/join-requests/${request.id}/accept`}
                                                        method="put"
                                                        as="button"
                                                        className="text-sm text-green-600 hover:text-green-800"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/organization/join-requests/${request.id}/reject`}
                                                        method="put"
                                                        as="button"
                                                        className="text-sm text-red-600 hover:text-red-800"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {pendingJoinRequests.length === 0 && (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="text-center text-muted-foreground"
                                            >
                                                No pending join requests
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
