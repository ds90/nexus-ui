"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { languages } from "@/datas/languages";
import type { Locale } from "@/i18n";

type LanguageSelectorProps = {
  variant?: "default" | "contrast";
};

export default function LanguageSelector({
  variant = "default",
}: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Lingua corrente
  const currentLocale = params.locale as Locale;

  // Chiudi dropdown al click esterno
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Cambia lingua
  const handleLanguageChange = (newLocale: Locale) => {
    // Rimuovi locale corrente dal pathname
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    // Naviga al nuovo path
    router.push(`/${newLocale}${pathWithoutLocale}`);

    setIsOpen(false);
  };

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
        aria-label="Select language"
      >
        <Globe
          className={
            variant === "contrast"
              ? "w-5 h-5 text-white"
              : "w-5 h-5 text-foreground"
          }
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className="w-full px-4 py-2 text-left hover:bg-muted flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{language.flag}</span>
                <span className="text-sm">{language.name}</span>
              </div>

              {currentLocale === language.code && (
                <Check className="w-5 h-5 text-fixed-secondary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
