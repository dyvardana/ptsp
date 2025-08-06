import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="drawer lg:drawer-open bg-gray-100 min-h-screen">
            <input id="main-drawer" type="checkbox" className="drawer-toggle" />

            {/* Page Content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Left: Logo + Hamburger */}
                        <div className="flex items-center">
                            {/* Hamburger only on mobile */}
                            <label htmlFor="main-drawer" className="btn btn-ghost lg:hidden me-2">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </label>

                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>

                        {/* Center: Nav Links (desktop only) */}
                        <div className="hidden lg:flex space-x-6">
                            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                        </div>

                        {/* Right: Dropdown */}
                        <div className="hidden sm:flex items-center space-x-4">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-800">
                                        {user.name}
                                        <svg
                                            className="ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                {/* Mobile Dropdown Navigation */}
                <div className={`sm:hidden ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
                    <div className="space-y-1 pt-2 pb-3">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pt-4 pb-1">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">{user.name}</div>
                            <div className="text-sm font-medium text-gray-500">{user.email}</div>
                        </div>
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>

                {/* Header */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                {/* Main Content */}
                <main className="p-4">{children}</main>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="main-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-64 bg-base-200 text-base-content min-h-full">
                    <li>
                        <Link href={route('dashboard')}>Dashboard</Link>
                    </li>
                    <li>
                        <Link href="/layanan">Layanan</Link>
                    </li>
                    <li>
                        <Link href="/pengaturan">Pengaturan</Link>
                    </li>
                    {/* Add more sidebar links here */}
                </ul>
            </div>
        </div>
    );
}
