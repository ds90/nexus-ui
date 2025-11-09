"use client"

import { useAuth } from "@/contexts/AutContext"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { Building2, LogOut, Menu, Package, Settings, User, Users } from "lucide-react"
import Logo from "../ui/Logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import ThemeToggle from "../ui/ThemeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import LanguageSelector from "../ui/LanguageSelector"

interface NavbarGestProps {
  onOpenSidebar: () => void
}

export default function NavbarGest({ onOpenSidebar }: NavbarGestProps) {
  const d = useTranslations("Dictionary")
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const companyType = user?.organizationType || "Personal"

  // Extract locale from pathname
  const locale = pathname.split("/")[1] || "it"

  // controllo se user è administrator
  const isAdmin = user?.role === "Administrator" || user?.role === "SuperAdmin"

  // Ottengo le iniziali dell'utente per l'avatar di riserva
  const getUserInitials = () => {
    if (!user) return "U"
    return `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
  }

  return (
    <nav className="sticky top-0 z-50 h-10 border-b border-border bg-card">
      <div className="flex h-full items-center justify-between px-4">
        {/* Left: Mobile Hamburger + Logo */}
        <div className="flex items-center gap-2">
          {/* Mobile Hamburger - opens sidebar */}
          <button
            onClick={onOpenSidebar}
            className="rounded-lg p-2 transition-colors hover:bg-muted lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          {/* Logo */}
          <div className="origin-left scale-75">
            <Logo />
          </div>
        </div>

        {/* A destra: Profilo + Impostazioni + Tema + Lingua */}
        <div className="flex items-center gap-2">
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="itmes-center flex gap-2 rounded-lg p-1 transition-colors hover:bg-muted"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={undefined || "/placeholder.svg"} alt={user?.fullName} />
                  <AvatarFallback className="bg-fixed text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => (window.location.href = `/${locale}/user-profile`)}>
                <User className="h-4 w-4" />
                {d("profile")}
              </DropdownMenuItem>
              <DropdownMenuSeparator
                className={companyType === "Company" && isAdmin ? "" : "hidden"}
              />
              {/* Gestione Utenti solo per Company */}
              {isAdmin && companyType === "Company" && (
                <DropdownMenuItem
                  onClick={() => (window.location.href = `/${locale}/settings/users`)}
                >
                  <Users className="h-4 w-4" />
                  {d("users")}
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator className={isAdmin ? "" : "hidden"} />
              {isAdmin && companyType === "Company" && (
                <DropdownMenuItem
                  onClick={() => (window.location.href = `/${locale}/settings/conpany`)}
                >
                  <Building2 className="h-4 w-4" />
                  {d("company")}
                </DropdownMenuItem>
              )}
              {isAdmin && (
                <DropdownMenuItem
                  onClick={() => (window.location.href = `/${locale}/settings/assets`)}
                >
                  <Package className="h-4 w-4" />
                  {d("assets")}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="h-4 w-4" />
                {d("logout")}
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              {/* Theme + Language - Hidden on mobile */}
              <div className="flex items-center justify-center gap-1">
                <ThemeToggle />
                <LanguageSelector />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
