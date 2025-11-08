"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useState, useRef, useEffect } from "react";
import { Sun, Moon, LaptopMinimalCheck, Check } from "lucide-react";
import { useTranslations } from "next-intl";

type ThemeToggleProps = {
  variant?: "default" | "contrast";
};

export default function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("ThemeToggle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Chiudi Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // HANDLER: Cambia theme
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setIsOpen(false); // Chiudi dropdown dopo selezione
  };

  const getIcon = () => {
    if (!mounted) {
      return LaptopMinimalCheck;
    }
    if (theme === "system") return LaptopMinimalCheck;
    return resolvedTheme === "dark" ? Moon : Sun;
  };

  const Icon = getIcon();

  // Stili basati su variant
  const buttonStyles =
    variant === "contrast"
      ? "flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors border border-white/20"
      : "flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-colors";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bottone toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonStyles}
        aria-label="Toggle theme"
      >
        <Icon
          className={
            variant === "contrast"
              ? "w-5 h-5 text-white"
              : "w-5 h-5 text-foreground"
          }
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg swadow-lg py-1 z-50">
          {/* Opzione: Light */}
          <button
            onClick={() => handleThemeChange("light")}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5" />
              <span className="text-sm">{t("light")}</span>
            </div>
            {theme === "light" && <Check className="text-secondary" />}
          </button>

          {/* Opzione: Dark */}
          <button
            onClick={() => handleThemeChange("dark")}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5" />
              <span className="text-sm">{t("dark")}</span>
            </div>
            {theme === "dark" && <Check className="text-primary" />}
          </button>

          {/* Opzione: System */}
          <button
            onClick={() => handleThemeChange("system")}
            className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <LaptopMinimalCheck className="w-5 h-5" />
              <span className="text-sm">{t("system")}</span>
            </div>
            {theme === "system" && <Check className="text-fixed-secondary" />}
          </button>
        </div>
      )}
    </div>
  );
}
