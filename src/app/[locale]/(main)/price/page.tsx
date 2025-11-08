"use client"
import { useTranslations } from "next-intl"

export default function PricePage() {

  const g = useTranslations("General")
  const t = useTranslations("PricingPage")

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-primary">{g("pricing")}</h1>
      <p className="text-gray-600 mt-4">
        {t("subtitle")}
      </p>
    </div>
  )
}