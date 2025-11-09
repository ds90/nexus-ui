"use client"
import { useTranslations } from "next-intl"
import { Sun, Moon, LaptopMinimalCheck, Check } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import type { ThemeMenuProps } from "@/types/themeMenu"
import Submenu from "@/components/ui/Submenu"

export default function ThemeMenu({ isExpanded, onToggle }: ThemeMenuProps) {
  const d = useTranslations("Dictionary")
  const { theme, setTheme } = useTheme()

  const getThemeIcon = () => {
    if (theme === "light") return <Sun className="h-5 w-5" />
    if (theme === "dark") return <Moon className="h-5 w-5" />
    return <LaptopMinimalCheck className="h-5 w-5" />
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
  }

  return (
    <Submenu icon={getThemeIcon()} label={d("theme")} isExpanded={isExpanded} onToggle={onToggle}>
      {/* Light */}
      <button
        onClick={() => handleThemeChange("light")}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-2 transition-colors ${
          theme === "light"
            ? "bg-primary/10 text-forground"
            : "text-muted-foreground hover:bg-muted"
        }`}
      >
        <div className="flex items-center gap-3">
          <Sun className="h-5 w-5" />
          <span className="text-sm">{d("light")}</span>
        </div>
        {theme === "light" && <Check className="text-secondary" />}
      </button>

      {/* Dark */}
      <button
        onClick={() => handleThemeChange("dark")}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-2 transition-colors ${
          theme === "dark" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
        }`}
      >
        <div className="flex items-center gap-3">
          <Moon className="h-5 w-5" />
          <span className="text-sm">{d("dark")}</span>
        </div>
        {theme === "dark" && <Check className="text-primary" />}
      </button>

      {/* System */}
      <button
        onClick={() => handleThemeChange("system")}
        className={`flex w-full items-center justify-between rounded-lg px-4 py-2 transition-colors ${
          theme === "system" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
        }`}
      >
        <div className="flex items-center gap-3">
          <LaptopMinimalCheck className="h-5 w-5" />
          <span className="text-sm">{d("system")}</span>
        </div>
        {theme === "system" && <Check className="text-fixed-secondary" />}
      </button>
    </Submenu>
  )
}
