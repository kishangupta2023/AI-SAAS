"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOutIcon,
  MenuIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UploadIcon,
  ImageIcon,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
  { href: "/social-share", icon: Share2Icon, label: "Social Share" },
  { href: "/video-upload", icon: UploadIcon, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { signOut, openSignIn } = useClerk();
  const { user } = useUser();

  const handleLogin = async () => {
    await openSignIn();
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input
        id="sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="flex items-center border mx-4 max-md:w-full max-md:justify-between border-slate-700 px-6 py-4 rounded-full text-white text-sm bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="sidebar-drawer"
                className="btn btn-square btn-ghost drawer-button"
              >
                <MenuIcon />
              </label>
            </div>
            <Link href="/" className="ml-2 text-2xl font-bold tracking-tight">
              Cloudinary Showcase
            </Link>
          </div>

          {/* Auth buttons */}
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <>
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full">
                    <img
                      src={user.imageUrl}
                      alt={
                        user.username ||
                        user.emailAddresses?.[0]?.emailAddress ||
                        "User"
                      }
                    />
                  </div>
                </div>
                <span className="text-sm truncate max-w-xs lg:max-w-md">
                  {user.username ||
                    user.emailAddresses?.[0]?.emailAddress ||
                    "User"}
                </span>
                <button
                  onClick={handleSignOut}
                  className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300"
              >
                Login
              </button>
            )}
          </div>
        </nav>

        {/* Page content */}
        <main className="flex-grow min-h-screen bg-[url(https://images.pexels.com/photos/194511/pexels-photo-194511.jpeg)] bg-cover bg-center bg-no-repeat">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white w-64 h-full flex flex-col">
          <div className="flex items-center justify-center py-4">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>
          <ul className="menu p-4 w-full text-base-content flex-grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
                    pathname === item.href
                      ? "bg-primary text-white"
                      : "hover:bg-base-300"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
 