import { join } from '@/routes/organization';
import { Form, Head } from '@inertiajs/react';
import { KeyRound } from 'lucide-react';

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
import AppLayout from '@/layouts/app-layout';

export default function JoinOrganization() {
    return (
        <AppLayout>
            <Head title="Join Organization" />

            <div className="mx-auto max-w-md py-12">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <KeyRound className="h-5 w-5" />
                            Join Organization
                        </CardTitle>
                        <CardDescription>
                            Enter an organization invite code to join their team
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            method="post"
                            action={join().url}
                            className="space-y-4"
                        >
                            {({ errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="invite_code">
                                            Invite Code
                                        </Label>
                                        <Input
                                            id="invite_code"
                                            name="invite_code"
                                            type="text"
                                            required
                                            placeholder="Enter organization code or slug"
                                        />
                                        <InputError
                                            message={errors.invite_code}
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            You can find this in your invitation
                                            link or ask the organization admin
                                        </p>
                                    </div>

                                    <Button type="submit" className="w-full">
                                        Join Organization
                                    </Button>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
