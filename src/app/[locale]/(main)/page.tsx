"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen bg overflow-y-auto">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-primary">{t("hero.title")}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <Link
            href="/register"
            className="bg-fixed-secondary text-white px-4 py-2 rounded-lg transform hover:scale-105 hover:shadow-md transition-all duration-200 font-medium"
          >
            {t("hero.cta_start")}
          </Link>
          <Link
            href="/price"
            className="text-foreground hover:bg-muted px-4 py-2 rounded-lg transition-colors"
          >
            {t("hero.cta_pricing")}
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-24">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Gestione Progetti
          </h3>
          <p className="text-gray-600">
            Organizza e traccia i tuoi progetti con facilità.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">👥</span>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Collaborazione Team
          </h3>
          <p className="text-gray-600">
            Lavora insieme al tuo team in tempo reale.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Veloce e Potente
          </h3>
          <p className="text-gray-600">
            Prestazioni elevate per team di ogni dimensione.
          </p>
        </div>
      </div>
    </div>
  );
}
