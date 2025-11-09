"use client";

import LanguageSelector from "../ui/LanguageSelector";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";

export default function NavbarGest() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header con Logo + Controls */}
          <div className="p-2 flex justify-between items-center border-border border-b">
            {/* Logo a sinistra */}
            <Logo />

            {/* Desktop navigation link */}
            <div>

            </div>
            {/* Theme + Language a destra con variant contrast */}
            <div className="flex items-center gap-2">
              <ThemeToggle
              //variant="contrast"
              />
              <LanguageSelector
              //variant="contrast"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
