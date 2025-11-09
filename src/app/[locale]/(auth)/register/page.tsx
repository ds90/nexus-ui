"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const pathname = usePathname();

  const g = useTranslations("General");
  const d = useTranslations("Dictionary");
  const e = useTranslations("Error");
  const p = useTranslations("Placeholder");
  const t = useTranslations("RegisterPage");

  const locale = pathname.split("/")[1];

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validazione email
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError(e("emailRequired"));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmail(e("emailInvalid"));
      return false;
    }
    setEmailError("");
    return true;
  };

  // Gestione email submit
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    // Salva email in local storage
    localStorage.setItem("registerEmail", email);

    // Redirect ai dettagli
    router.push(`/${locale}/register/details`);
  };

  // Gestione Google OAuth
  const handleGoogleSignup = () => {
    // TODO: Implementare redirect a backend OAuth
    console.log("Google signup - redirect a /api/auth/google/signup");
    // window.location.href = '/api/auth/google/signup';
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {d("signup")}
          </h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-background border-2 border-border rounded-lg hover:bg-accent transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {/* Logo Google */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="text-foreground font-medium">
            {t("continueWithGoogle")}
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground font-medium">
            {g("or")}
          </span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Email */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={() => validateEmail(email)}
              disabled={isLoading}
              placeholder={p("email")}
              className={`w-full px-4 py-3 bg-background border-2 rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
                emailError
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-border focus:ring-primary focus:border-primary"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              required
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            // disabled={isLoading||!emailError ||email}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isLoading ? g("loading") : d("continue")}
          </button>
        </form>

      {/* Terms and Privacy */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t("termsPrefix")}{" "}
            <Link
              href={`/${locale}/terms`}
              className="text-primary hover:underline font-medium"
            >
              {g("termsOfService")}
            </Link>{" "}
            {d("and")}{" "}
            <Link
              href={`/${locale}/privacy`}
              className="text-primary hover:underline font-medium"
            >
              {g("privacyPolicy")}
            </Link>
          </p>
        </div>
      </div>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {t("hasAccount")}{" "}
          <Link
            href={`/${locale}/login`}
            className="text-primary hover:underline font-semibold"
          >
            {d("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
