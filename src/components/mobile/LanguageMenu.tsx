"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { languages } from "@/datas/languages";
import type { Locale } from "@/i18n";
import Submenu from "@/components/ui/Submenu";
import type { LanguageMenuProps } from "@/types/languageMenu";

export default function LanguageMenu({
  isExpanded,
  onToggle,
  onLanguageChange,
}: LanguageMenuProps) {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === currentLocale);
  };

  const handleLanguageChange = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);

    // Chiama callback opzionale (per chiudere la sidebar)
    if (onLanguageChange) {
      onLanguageChange();
    }
  };

  return (
    <Submenu
      icon={<Globe className="w-5 h-5" />}
      label={getCurrentLanguage()?.name || "Language"}
      isExpanded={isExpanded}
      onToggle={onToggle}
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
            currentLocale === lang.code
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm">{lang.name}</span>
          </div>
          {currentLocale === lang.code && <Check className="w-4 h-4" />}
        </button>
      ))}
    </Submenu>
  );
}
