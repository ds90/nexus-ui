"use client";

import Link from "next/link";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageSelector from "../ui/LanguageSelector";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navbar");
  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/support"
              className="text-foreground hover:bg-muted px-4 py-2 rounded-lg transition-colors"
            >
              {t("support")}
            </Link>
            <Link
              href="/price"
              className="text-foreground hover:bg-muted px-4 py-2 rounded-lg transition-colors"
            >
              {t("pricing")}
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/login"
              className="text-foreground hover:bg-muted px-4 py-2 rounded-lg transition-colors font-medium"
            >
              {t("login")}
            </Link>
            <Link
              href="/register"
              className="bg-fixed-secondary text-white px-4 py-2 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200              font-medium"
            >
              {t("register")}
            </Link>
            <ThemeToggle />
            <LanguageSelector />
          </div>
        </div>
      </div>
    </nav>
  );
}
