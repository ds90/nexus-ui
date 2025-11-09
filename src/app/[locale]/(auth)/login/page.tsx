"use client";
import { useState } from "react";
import type React from "react";

import { usePathname, useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/contexts/AutContext";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[0];
  const { login } = useAuth();

  const d = useTranslations("Dictionary");
  const g = useTranslations("General");
  const et = useTranslations("Error");
  const p = useTranslations("Placeholder");
  const t = useTranslations("LoginPage");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError(et("emailInvalid"));
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError("");

    if (emailError) return;

    setIsLoading(true);

    try {
      const data = await authApi.login({ email, password });

      // Salva il token
      if (data.token && data.user) {
        login(data.token, data.user);
        router.push(`${locale}/dashboard`);
      } else {
        setLoginError(et("login"));
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setLoginError(et("login"));
      } else if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError(et("connection"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {d("login")}
          </h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Email */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {/* Errore login */}
          {loginError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
              {loginError}
            </div>
          )}

          {/* Campo email */}
          <div>
            <label className="block text-foreground mb-1 font-medium">
              {d("email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              className={`w-full rounded-md border border-border px-3 py-2 bg-background text-foreground transition-colors ${
                emailError
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-2 focus:ring-ring"
              }`}
              required
              placeholder={p("email")}
            />
            {emailError && (
              <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>

          {/* Campo password */}
          <div>
            <label className="block text-foreground mb-1 font-medium">
              {d("password")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-border transition-colors"
                required
                placeholder={p("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          {/* Button invia */}
          <button
            type="submit"
            disabled={!!emailError || isLoading}
            className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors ${
              emailError || isLoading || !email || !password
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {isLoading ? t("button_loading") : d("login")}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border"></div>
          <span className="text-sm text-muted-foreground font-medium">
            {g("or")}
          </span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-background border-2 border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
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
            {t("loginWithGoogle")}
          </span>
        </button>
      </div>
      {/* Register Link */}
      <div className="mt-6 text-center">
        <p className="text-muted-foreground">
          {t("noAccount")}{" "}
          <Link
            href={`${locale}/register`}
            className="text-primary hover:underline font-semibold"
          >
            {d("register")}
          </Link>
        </p>
      </div>
    </div>
  );
}
