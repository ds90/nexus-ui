"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import type { Locale } from "@/i18n";

const languages = [
    {code: "it" as Locale, name: "Italiano", flag: "🇮🇹"},
    {code: "en" as Locale, name: "English", flag: "🇬🇧"},
    {code: "es" as Locale, name: "Español", flag: "🇪🇸"},
]

export default function LanguageSelector() {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Lingua corrente
    const currentLocale = params.locale as Locale

    // Trova la lingua corrente
    const cyrrentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

    // Chiudi dropdown al click esterno
    useEffect(())
}