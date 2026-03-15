import { login, register, dashboard } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';
import { 
    Package, 
    BarChart3, 
    Users, 
    ShieldCheck, 
    ArrowRight, 
    CheckCircle2,
    Layers,
    Clock,
    Zap
} from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
            <Head title="Welcome to Lebook">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/80 backdrop-blur-md dark:border-neutral-800/50 dark:bg-neutral-950/80">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <AppLogo />
                    </div>
                    
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="#features" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">Features</a>
                        <a href="#about" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">About</a>
                        <a href="#pricing" className="transition-colors hover:text-neutral-600 dark:hover:text-neutral-400">Pricing</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Button asChild variant="default" size="sm">
                                <Link href={dashboard()}>Go to Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild variant="ghost" size="sm">
                                    <Link href={login()}>Log in</Link>
                                </Button>
                                {canRegister && (
                                    <Button asChild variant="default" size="sm">
                                        <Link href={register()}>Get Started</Link>
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(0,0,0,0.03)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(45%_45%_at_50%_50%,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_100%)]" />
                    <div className="container mx-auto px-4 text-center md:px-6">
                        <div className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium dark:border-neutral-800 dark:bg-neutral-900 mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2" />
                            Now in Private Beta
                        </div>
                        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
                            Inventory management <br className="hidden md:block" />
                            for modern businesses.
                        </h1>
                        <p className="mx-auto max-w-[700px] text-lg text-neutral-600 dark:text-neutral-400 md:text-xl mb-10">
                            Lebook helps you track stock, manage movements, and gain real-time insights into your inventory lifecycle. Simple, powerful, and secure.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            {auth.user ? (
                                <Button asChild size="lg" className="h-12 px-8 text-base">
                                    <Link href={dashboard()}>
                                        Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg shadow-neutral-200 dark:shadow-none">
                                        <Link href={register()}>Start for Free</Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                                        <Link href={login()}>Sign in to account</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                        
                        {/* Mock Dashboard Preview */}
                        <div className="mt-20 relative mx-auto max-w-5xl">
                            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-2 dark:border-neutral-800 dark:bg-neutral-900/50 shadow-2xl backdrop-blur-sm">
                                <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 overflow-hidden">
                                    <div className="h-12 border-b border-neutral-100 dark:border-neutral-900 flex items-center px-4 gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-400/20" />
                                            <div className="w-3 h-3 rounded-full bg-amber-400/20" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-400/20" />
                                        </div>
                                        <div className="ml-4 h-5 w-48 rounded bg-neutral-100 dark:bg-neutral-900" />
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-3 gap-6 mb-8">
                                            <div className="h-24 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800" />
                                            <div className="h-24 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800" />
                                            <div className="h-24 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-8 w-full rounded bg-neutral-50 dark:bg-neutral-900/50" />
                                            <div className="h-8 w-full rounded bg-neutral-50 dark:bg-neutral-900/50" />
                                            <div className="h-8 w-full rounded bg-neutral-50 dark:bg-neutral-900/50" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4">Built for clarity and control</h2>
                            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                                Stop guessing and start knowing. Lebook provides the tools you need to stay on top of your stock levels and warehouse operations.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="group relative p-8 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
                                <div className="mb-4 inline-flex p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                                    <Package className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Smart Inventory</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Track products, categories, and stock levels across multiple locations with ease.
                                </p>
                            </div>

                            <div className="group relative p-8 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
                                <div className="mb-4 inline-flex p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                                    <Layers className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Movements History</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Comprehensive audit trail for every stock-in, stock-out, and manual adjustment.
                                </p>
                            </div>

                            <div className="group relative p-8 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
                                <div className="mb-4 inline-flex p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                                    <BarChart3 className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Deep Insights</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Visual dashboards and reports help you understand trends and optimize your stock.
                                </p>
                            </div>

                            <div className="group relative p-8 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
                                <div className="mb-4 inline-flex p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors duration-300">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">Role Permissions</h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Fine-grained access control to ensure your data stays secure and team members focus.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefit Section */}
                <section className="py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Efficiency starts with better data.</h2>
                                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8">
                                    We've designed Lebook to be intuitive enough for anyone to use, while powerful enough for complex operations. 
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                                        <span>Real-time stock level synchronization across all devices.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                                        <span>Automated alerts when stock falls below critical thresholds.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                                        <span>Bulk import/export for seamless migration from spreadsheets.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                                        <span>Multi-user collaboration with activity logging.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="aspect-square rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                                    {/* Abstract Visual Representing "Growth/Efficiency" */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-20 pointer-events-none">
                                        <Zap className="w-64 h-64 text-neutral-900 dark:text-white" />
                                    </div>
                                    <div className="p-12 h-full flex flex-col justify-end">
                                        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-xl">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                    <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold">Time Saved</div>
                                                    <div className="text-xs text-neutral-500">Per inventory audit</div>
                                                </div>
                                                <div className="ml-auto text-2xl font-bold text-emerald-600 dark:text-emerald-400">-75%</div>
                                            </div>
                                            <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-500 w-[75%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-24 bg-neutral-900 text-white dark:bg-white dark:text-black overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none">
                         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                         <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                    </div>
                    <div className="container mx-auto px-4 text-center md:px-6 relative z-10">
                        <h2 className="text-3xl font-bold sm:text-5xl mb-6">Ready to take control?</h2>
                        <p className="mx-auto max-w-[600px] text-neutral-400 dark:text-neutral-600 md:text-xl mb-10">
                            Join hundreds of businesses that use Lebook to simplify their inventory management.
                        </p>
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                             {auth.user ? (
                                <Button asChild size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800">
                                    <Link href={dashboard()}>Back to Dashboard</Link>
                                </Button>
                             ) : (
                                <>
                                    <Button asChild size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800">
                                        <Link href={register()}>Start free 14-day trial</Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-white/20 hover:bg-white/10 dark:border-black/20 dark:hover:bg-black/10">
                                        <Link href={login()}>Contact Sales</Link>
                                    </Button>
                                </>
                             )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                        <div className="flex items-center gap-2">
                            <AppLogo />
                        </div>
                        <div className="flex gap-8 text-sm text-neutral-500">
                            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                    <div className="text-center text-xs text-neutral-500">
                        &copy; {new Date().getFullYear()} Lebook. Built for efficiency.
                    </div>
                </div>
            </footer>
        </div>
    );
}
