"use client";
import { useTranslations } from "next-intl";
import { Sun, Moon, LaptopMinimalCheck, Check } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import type { ThemeMenuProps } from "@/types/themeMenu";
import Submenu from "@/components/ui/Submenu";

export default function ThemeMenu({ isExpanded, onToggle }: ThemeMenuProps) {
  const t = useTranslations("ThemeToggle");
  const { theme, setTheme } = useTheme();

  const getThemeIcon = () => {
    if (theme === "light") return <Sun className="w-5 h-5" />;
    if (theme === "dark") return <Moon className="w-5 h-5" />;
    return <LaptopMinimalCheck className="w-5 h-5" />;
  };

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  return (
    <Submenu
      icon={getThemeIcon()}
      label={t("theme")}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      {/* Light */}
      <button
        onClick={() => handleThemeChange("light")}
        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
          theme === "light"
            ? "bg-primary/10 text-forground"
            : "text-muted-foreground hover:bg-muted"
        }`}
      >
        <div className="flex items-center gap-3">
          <Sun className="w-5 h-5" />
          <span className="text-sm">{t("light")}</span>
        </div>
        {theme === "light" && <Check className="text-secondary" />}
      </button>

      {/* Dark */}
      <button
        onClick={() => handleThemeChange("dark")}
        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
          theme === "dark"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted"
        }`}
      >
        <div className="flex items-center gap-3">
          <Moon className="w-5 h-5" />
          <span className="text-sm">{t("dark")}</span>
        </div>
        {theme === "dark" && <Check className="text-primary" />}
      </button>

      {/* System */}
      <button
        onClick={() => handleThemeChange("system")}
        className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
          theme === "system"
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted"
        }`}
      >
        <div className="flex items-center gap-3">
          <LaptopMinimalCheck className="w-5 h-5" />
          <span className="text-sm">{t("system")}</span>
        </div>
        {theme === "system" && <Check className="text-fixed-secondary" />}
      </button>
    </Submenu>
  );
}
