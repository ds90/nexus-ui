"use client";

import Link from "next/link";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/support"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors"
            >
              Supporto
            </Link>
            <Link
              href="/price"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition-colors"
            >
              Prezzi
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-primary dark:text-secondary hover:text-primary/80 dark:hover:text-secondary/80 transition-colors font-medium"
            >
              Accedi
            </Link>
            <Link
              href="/register"
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors font-medium"
            >
              Registrati
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
