"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Logo from "../ui/Logo"
import ThemeToggle from "../ui/ThemeToggle"
import LanguageSelector from "../ui/LanguageSelector"
import ThemeMenu from "../mobile/ThemeMenu"
import LanguageMenu from "../mobile/LanguageMenu"

export default function Navbar() {
  const d = useTranslations("Dictionary")

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<"theme" | "language" | null>(null)

  // Chiudi menu quando ridimensiono
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMenuOpen])

  // Blocca scroll quando menu aperto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  // Chiudi menu quando si clicca un link
  const closeMenu = () => {
    setIsMenuOpen(false)
    setExpandedMenu(null)
  }

  // Toggle submenu
  const toggleSubmenu = (menu: "theme" | "language") => {
    setExpandedMenu(expandedMenu === menu ? null : menu)
  }

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation Links */}
            <div className="hidden items-center space-x-8 md:flex">
              <Link
                href="/support"
                className="rounded-lg px-4 py-2 text-foreground transition-colors hover:bg-muted"
              >
                {d("support")}
              </Link>
              <Link
                href="/price"
                className="rounded-lg px-4 py-2 text-foreground transition-colors hover:bg-muted"
              >
                {d("pricing")}
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden items-center space-x-2 md:flex">
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 font-medium text-foreground transition-colors hover:bg-muted"
              >
                {d("login")}
              </Link>
              <Link
                href="/register"
                className="transform rounded-lg bg-fixed-secondary px-4 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                {d("register")}
              </Link>
              <ThemeToggle />
              <LanguageSelector />
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-foreground" />
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
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
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
                  closeMenu()
                }
              }}
              className="fixed bottom-0 right-0 top-0 z-50 w-80 max-w-[85vw] overflow-y-auto border-l border-border bg-card md:hidden"
            >
              {/* Header con Close Button */}
              <div className="flex items-center justify-between border-b border-border p-6">
                <Logo />
                <button
                  onClick={closeMenu}
                  className="rounded-lg p-2 transition-colors hover:bg-muted"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6 text-foreground" />
                </button>
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-col space-y-3 p-6">
                <Link
                  href="/login"
                  className="w-full rounded-lg border-2 border-foreground px-4 py-3 text-center font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {d("login")}
                </Link>
                <Link
                  href="/register"
                  className="hover:bg-fixed-secondary/80 w-full rounded-lg bg-fixed-secondary px-4 py-3 text-center font-medium text-white transition-colors"
                >
                  {d("register")}
                </Link>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-border" />

              {/* Navigation Links */}
              <div className="flex flex-col space-y-1 p-6">
                <Link
                  href="/support"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {d("support")}
                </Link>
                <Link
                  href="/price"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {d("pricing")}
                </Link>
              </div>

              {/* Divider */}
              <div className="mx-6 border-t border-border" />

              {/* Theme + Language Controls */}
              <div className="space-y-2 p-6">
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
  )
}
