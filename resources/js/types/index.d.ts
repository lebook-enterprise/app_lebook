import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
    organization: Organization | null;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    role_id: number;
    organization_id: number | null;
    is_organization_admin: boolean;
    is_super_admin: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Organization {
    id: number;
    name: string;
    slug: string;
    logo_url: string | null;
    settings?: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

export interface OrganizationInvitation {
    id: number;
    organization_id: number;
    email: string;
    role: 'admin' | 'member';
    expires_at: string;
    created_at: string;
    updated_at: string;
}
