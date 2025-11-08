"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { Sun, Moon, LaptopMinimalCheck, Check } from "lucide-react";

export default function ThemeToggle() {
  // ==========================================
  // HOOKS
  // ==========================================
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ==========================================
  // CHIUDI DROPDOWN AL CLICK FUORI
  // ==========================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Se clicco fuori dal dropdown, chiudi
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Aggiungi listener solo se dropdown è aperto
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup: rimuovi listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ==========================================
  // HANDLER: Cambia theme
  // ==========================================
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setIsOpen(false); // Chiudi dropdown dopo selezione
  };

  // ==========================================
  // ICONA DINAMICA - Mostra icona del theme attivo
  // ==========================================
  const getIcon = () => {
    if (theme === "system") {
      return <LaptopMinimalCheck className="w-6 h-6" />;
    }
    return resolvedTheme === "dark" ? (
      <Moon className="w-6 h-6" />
    ) : (
      <Sun className="w-6 h-6" />
    );
  };

  // ==========================================
  // LABEL - Testo leggibile del theme
  // ==========================================
  const getLabel = (themeOption: "light" | "dark" | "system") => {
    switch (themeOption) {
      case "light":
        return "Chiaro";
      case "dark":
        return "Scuro";
      case "system":
        return "Sistema";
    }
  };

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bottone Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-muted transation-colors"
        aria-label="Cambia tema"
      >
        <span className="text-2xl">{getIcon()}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg swadow-lg py-1 z-50">
          {/* Opzione: Light */}
          <button
            onClick={() => handleThemeChange("light")}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-3">
              <Sun className="w-5 h-5" />
              <span className="text-foreground">{getLabel("light")}</span>
            </span>
            {theme === "light" && <Check className="text-secondary" />}
          </button>

          {/* Opzione: Dark */}
          <button
            onClick={() => handleThemeChange("dark")}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-3">
              <Moon className="w-5 h-5" />
              <span className="text-foreground">
                {getLabel("dark")}
              </span>
            </span>
            {theme === "dark" && <Check className="text-primary" />}
          </button>

          {/* Opzione: System */}
          <button
            onClick={() => handleThemeChange("system")}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-3">
              <LaptopMinimalCheck className="w-5 h-5" />
              <span className="text-foreground">
                {getLabel("system")}
              </span>
            </span>
            {theme === "system" && <Check className="text-fixed-secondary"/>}
          </button>
        </div>
      )}
    </div>
  );
}
