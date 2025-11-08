"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("LoginPage")
  const te = useTranslations("Error")

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
      setEmailError(te("email_invalid"));
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
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redirect
      router.push("/");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setLoginError(te("login"));
      } else if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError(te("connection"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t("title")}</h1>
        <p className="text-muted-foreground mb-6">
          {t("subtitle")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Errore login */}
          {loginError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
              {loginError}
            </div>
          )}

          {/* Campo email */}
          <div>
            <label className="block text-foreground mb-1 font-medium">
              {t("email_label")}
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
              placeholder={t("email_placeholder")}
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
              {t("password_label")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="w-full rounded-md border border-border px-3 py-2 bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-border transition-colors"
                required
                placeholder={t("password_placeholder")}
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
            {isLoading ? t("button_loading") : t("button_login")}
          </button>
        </form>
      </div>
    </div>
  );
}
