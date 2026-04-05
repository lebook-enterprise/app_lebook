import { useState } from 'react';

import { join, store } from '@/routes/organization';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function CreateOrganization() {
    const [view, setView] = useState<'create' | 'join'>('create');

    return (
        <AuthLayout
            title={
                view === 'create' ? 'Create Organization' : 'Join Organization'
            }
            description={
                view === 'create'
                    ? 'Set up your organization to get started'
                    : 'Enter an organization code to join'
            }
        >
            <Head
                title={
                    view === 'create'
                        ? 'Create Organization'
                        : 'Join Organization'
                }
            />

            <div className="mb-6 flex gap-1">
                <Button
                    type="button"
                    variant={view === 'create' ? 'default' : 'outline'}
                    onClick={() => setView('create')}
                >
                    Create Organization
                </Button>
                <Button
                    type="button"
                    variant={view === 'join' ? 'default' : 'outline'}
                    onClick={() => setView('join')}
                >
                    Join Organization
                </Button>
            </div>

            {view === 'create' ? (
                <Form {...store.form()} className="flex flex-col gap-6">
                    {({ processing, errors }) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>Organization Details</CardTitle>
                                <CardDescription>
                                    Enter your organization name and a unique
                                    slug
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">
                                        Organization Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Acme Inc."
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="slug">Slug</Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        type="text"
                                        required
                                        placeholder="acme-inc"
                                    />
                                    <InputError message={errors.slug} />
                                    <p className="text-xs text-muted-foreground">
                                        This will be used in your organization
                                        URL
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    Create Organization
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Form>
            ) : (
                <Form {...join.form()} className="flex flex-col gap-6">
                    {({ processing, errors }) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>Join Organization</CardTitle>
                                <CardDescription>
                                    Enter the organization slug to request to
                                    join
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="slug">
                                        Organization Slug
                                    </Label>
                                    <Input
                                        id="slug"
                                        name="slug"
                                        type="text"
                                        required
                                        placeholder="acme-inc"
                                    />
                                    <InputError message={errors.slug} />
                                    <p className="text-xs text-muted-foreground">
                                        Enter the unique slug of the
                                        organization you want to join
                                    </p>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full"
                                >
                                    Request to Join
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Form>
            )}
        </AuthLayout>
    );
}
