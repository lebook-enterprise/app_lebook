import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, inventory, products } from '@/routes';
import { join, settings as organizationSettings } from '@/routes/organization';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    LampDesk,
    LayoutGrid,
    PackageCheck,
    Shield,
    UserPlus,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inventory',
        href: inventory(),
        icon: LampDesk,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Products',
        href: products(),
        icon: PackageCheck,
    },
];

const organizationNavItems: NavItem[] = [
    {
        title: 'Organization',
        href: organizationSettings(),
        icon: Building2,
    },
];

const superAdminNavItems: NavItem[] = [
    {
        title: 'Super Admin',
        href: '/super-admin/organizations',
        icon: Shield,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth.user.role_id === 2;
    const isOrgAdmin =
        auth.user.is_organization_admin || auth.user.is_super_admin;
    const isSuperAdmin = auth.user.is_super_admin;
    const organization = auth.organization;

    // If user doesn't have an organization, show option to join
    const noOrgNavItems: NavItem[] = [
        {
            title: 'Join Organization',
            href: join().url,
            icon: UserPlus,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href={dashboard()}
                                prefetch
                                className="flex items-center gap-2"
                            >
                                {organization?.logo_url ? (
                                    <img
                                        src={organization.logo_url}
                                        alt={organization.name}
                                        className="h-8 w-8 rounded object-contain"
                                    />
                                ) : (
                                    <AppLogo />
                                )}
                                <span className="truncate font-semibold">
                                    {organization?.name || 'Inventory'}
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {!organization ? (
                    <NavMain items={noOrgNavItems} />
                ) : (
                    <>
                        <NavMain items={mainNavItems} />
                        {(isAdmin || isOrgAdmin) && (
                            <NavMain items={adminNavItems} />
                        )}
                        {isOrgAdmin && <NavMain items={organizationNavItems} />}
                        {isSuperAdmin && <NavMain items={superAdminNavItems} />}
                    </>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
