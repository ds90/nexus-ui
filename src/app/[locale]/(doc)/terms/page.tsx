"use client";
import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("TermsPage");
  const g = useTranslations("General");

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {g("termsService")}
            </h1>
            <p className="text-muted-foreground">
              {t("lastUpdated")}: 8 Novembre 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">{t("introduction")}</p>

            {/* Section 1 */}
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              1. {t("section1Title")}
            </h2>
            <p className="text-muted-foreground mb-4">{t("section1Content")}</p>

            {/* Section 2 */}
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              2. {t("section2Title")}
            </h2>
            <p className="text-muted-foreground mb-4">{t("section2Content")}</p>

            {/* Section 3 */}
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              3. {t("section3Title")}
            </h2>
            <p className="text-muted-foreground mb-4">{t("section3Content")}</p>

            {/* Section 4 */}
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              4. {t("section4Title")}
            </h2>
            <p className="text-muted-foreground mb-4">{t("section4Content")}</p>

            {/* Section 5 */}
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              5. {t("section5Title")}
            </h2>
            <p className="text-muted-foreground mb-4">{t("section5Content")}</p>

            {/* Contact */}
            <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              {t("contactTitle")}
            </h2>
            <p className="text-muted-foreground">
              {t("contactContent")}{" "}
              <a
                href="mailto:legal@nexus.com"
                className="text-primary hover:underline"
              >
                legal@nexus.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
