"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";
import LanguageSelector from "../ui/LanguageSelector";
import ThemeMenu from "../mobile/ThemeMenu";
import LanguageMenu from "../mobile/LanguageMenu";

export default function Navbar() {
  const g = useTranslations("Dictionary");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<"theme" | "language" | null>(
    null
  );

  // Chiudi menu quando ridimensiono
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Blocca scroll quando menu aperto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Chiudi menu quando si clicca un link
  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedMenu(null);
  };

  // Toggle submenu
  const toggleSubmenu = (menu: "theme" | "language") => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/support"
                className="text-foreground hover:bg-muted px-4 py-2 rounded-lg transition-colors"
              >
                {g("support")}
              </Link>
              <Link
                href="/price"
                className="text-foreground hover:bg-muted px-4 py-2 rounded-lg transition-colors"
              >
                {g("pricing")}
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/login"
                className="text-foreground hover:bg-muted px-4 py-2 rounded-lg transition-colors font-medium"
              >
                {g("login")}
              </Link>
              <Link
                href="/register"
                className="bg-fixed-secondary text-white px-4 py-2 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200 font-medium"
              >
                {g("register")}
              </Link>
              <ThemeToggle />
              <LanguageSelector />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay + Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x > 100) {
                  closeMenu();
                }
              }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-card border-l border-border z-50 md:hidden overflow-y-auto"
            >
              {/* Header con Close Button */}
              <div className="flex justify-between items-center p-6 border-b border-border">
                <Logo />
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 text-foreground" />
                </button>
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col p-6 space-y-3">
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-3 rounded-lg border-2 border-foreground text-foreground hover:bg-muted transition-colors font-medium"
                >
                  {g("login")}
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center px-4 py-3 rounded-lg bg-fixed-secondary text-white hover:bg-fixed-secondary/80 transition-colors font-medium"
                >
                  {g("register")}
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-border mx-6" />

              {/* Navigation Links */}
              <div className="flex flex-col p-6 space-y-1">
                <Link
                  href="/support"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                >
                  {g("support")}
                </Link>
                <Link
                  href="/price"
                  onClick={closeMenu}
                  className="px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                >
                  {g("pricing")}
                </Link>
              </div>

              {/* Divider */}
              <div className="border-t border-border mx-6" />

              {/* Theme + Language Controls */}
              <div className="p-6 space-y-2">
                {/* Theme Menu */}
                <ThemeMenu
                  isExpanded={expandedMenu === "theme"}
                  onToggle={() => toggleSubmenu("theme")}
                />

                {/* Language Menu */}
                <LanguageMenu
                  isExpanded={expandedMenu === "language"}
                  onToggle={() => toggleSubmenu("language")}
                  onLanguageChange={closeMenu}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
