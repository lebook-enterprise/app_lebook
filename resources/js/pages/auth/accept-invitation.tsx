import { existing, newMethod } from '@/routes/invitation/accept';
import { Form, Head } from '@inertiajs/react';
import { Building2, UserPlus } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface Props {
    invitation: {
        organization_name: string;
        email: string;
        token: string;
    };
    has_account: boolean;
}

export default function AcceptInvitation({ invitation, has_account }: Props) {
    return (
        <AuthLayout
            title="Join Organization"
            description={`You've been invited to join ${invitation.organization_name}`}
        >
            <Head title="Accept Invitation" />

            <div className="flex flex-col items-center gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                </div>

                <div className="text-center">
                    <h2 className="text-lg font-semibold">
                        Join {invitation.organization_name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {has_account
                            ? 'Log in to accept the invitation'
                            : 'Create an account to join the organization'}
                    </p>
                </div>

                {has_account ? (
                    <Form {...existing.form()} className="w-full space-y-4">
                        {({ processing, errors }) => (
                            <>
                                <input
                                    type="hidden"
                                    name="email"
                                    value={invitation.email}
                                />
                                <input
                                    type="hidden"
                                    name="token"
                                    value={invitation.token}
                                />

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="Enter your password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    Accept Invitation
                                </Button>
                            </>
                        )}
                    </Form>
                ) : (
                    <Form {...newMethod.form()} className="w-full space-y-4">
                        {({ processing, errors }) => (
                            <>
                                <input
                                    type="hidden"
                                    name="email"
                                    value={invitation.email}
                                />
                                <input
                                    type="hidden"
                                    name="token"
                                    value={invitation.token}
                                />

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        autoFocus
                                        placeholder="John Doe"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="Create a password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        required
                                        placeholder="Confirm your password"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Create Account & Join
                                </Button>
                            </>
                        )}
                    </Form>
                )}
            </div>
        </AuthLayout>
    );
}
