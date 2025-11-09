"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { authApi } from "@/lib/api/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function RegisterDetailsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const d = useTranslations("Dictionary");
  const g = useTranslations("General");
  const e = useTranslations("Error");
  const p = useTranslations("Placeholder");
  const t = useTranslations("RegisterPage");

  // Estrai il locale dal pathname
  const locale = pathname.split('/')[1];

  // Form fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isOrganization, setIsOrganization] = useState(false);
  const [organizationName, setOrganizationName] = useState("");

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation errors
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [organizationError, setOrganizationError] = useState("");
  const [generalError, setGeneralError] = useState("");

  // Recupera email da localStorage al mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("registerEmail");
    if (!savedEmail) {
      // Se non c'è email salvata, torna alla prima pagina
      router.push(`/${locale}/register`);
      return;
    }
    setEmail(savedEmail);
  }, [router, locale]);

  // First name validation
  const validateFirstName = (name: string): boolean => {
    if (!name || name.trim().length === 0) {
      setFirstNameError(e("firstNameRequired"));
      return false;
    }
    if (name.trim().length < 2) {
      setFirstNameError(e("firstNameTooShort"));
      return false;
    }
    setFirstNameError("");
    return true;
  };

  // Last name validation
  const validateLastName = (name: string): boolean => {
    if (!name || name.trim().length === 0) {
      setLastNameError(e("lastNameRequired"));
      return false;
    }
    if (name.trim().length < 2) {
      setLastNameError(e("lastNameTooShort"));
      return false;
    }
    setLastNameError("");
    return true;
  };

  // Password validation
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError(e("passwordRequired"));
      return false;
    }
    if (password.length < 8) {
      setPasswordError(e("passwordTooShort"));
      return false;
    }
    // Check for at least one uppercase, one lowercase, one number
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*?:_\-]/.test(password);

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      setPasswordError(e("passwordWeak"));
      return false;
    }
    setPasswordError("");
    return true;
  };

  // Organization name validation
  const validateOrganization = (name: string): boolean => {
    if (isOrganization && (!name || name.trim().length === 0)) {
      setOrganizationError(e("organizationRequired"));
      return false;
    }
    if (isOrganization && name.trim().length < 3) {
      setOrganizationError(e("organizationTooShort"));
      return false;
    }
    setOrganizationError("");
    return true;
  };

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isPasswordValid = validatePassword(password);
    const isOrganizationValid = validateOrganization(organizationName);

    if (!isFirstNameValid || !isLastNameValid || !isPasswordValid || !isOrganizationValid) {
      return;
    }

    setIsLoading(true);
    setGeneralError("");

    try {
      // Chiamata API di registrazione
      const response = await authApi.register({
        email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        password,
        organizationName: isOrganization ? organizationName.trim() : undefined,
      });

      // Registrazione riuscita
      console.log("Registration successful:", response);

      // Pulisci localStorage
      localStorage.removeItem("registerEmail");

      // Opzione 1: Salva token e vai al dashboard
      if (response.token) {
        localStorage.setItem("token", response.token);
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }
        router.push(`/${locale}/dashboard`);
      } else {
        // Opzione 2: Vai al login
        router.push(`/${locale}/login`);
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      // Gestione errori specifici
      if (error.response?.data?.message) {
        setGeneralError(error.response.data.message);
      } else if (error.response?.status === 400) {
        setGeneralError(e("emailAlreadyExists"));
      } else if (error.response?.status === 500) {
        setGeneralError(e("serverError"));
      } else {
        setGeneralError(e("registrationFailed"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back to email
  const handleBackToEmail = () => {
    localStorage.removeItem("registerEmail");
    router.push(`/${locale}/register`);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {d("signup")}
          </h1>
          <p className="text-muted-foreground">
            {t("subtitleDetails")}
          </p>
        </div>

        {/* Back to email button */}
        <button
          type="button"
          onClick={handleBackToEmail}
          className="text-sm text-primary hover:underline mb-4 flex items-center gap-1"
        >
          <span>←</span> {t("backToEmail")}
        </button>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {d("email")}
            </label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full px-4 py-3 bg-muted border-2 border-border rounded-lg text-muted-foreground cursor-not-allowed"
            />
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
              {d("firstName")}
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (firstNameError) validateFirstName(e.target.value);
              }}
              onBlur={() => validateFirstName(firstName)}
              disabled={isLoading}
              placeholder={p("firstName")}
              className={`w-full px-4 py-3 bg-background border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                firstNameError
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-border focus:ring-primary focus:border-primary"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              required
            />
            {firstNameError && (
              <p className="mt-1 text-sm text-red-500">{firstNameError}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
              {d("lastName")}
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (lastNameError) validateLastName(e.target.value);
              }}
              onBlur={() => validateLastName(lastName)}
              disabled={isLoading}
              placeholder={p("lastName")}
              className={`w-full px-4 py-3 bg-background border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                lastNameError
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-border focus:ring-primary focus:border-primary"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              required
            />
            {lastNameError && (
              <p className="mt-1 text-sm text-red-500">{lastNameError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              {d("password")}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) validatePassword(e.target.value);
                }}
                onBlur={() => validatePassword(password)}
                disabled={isLoading}
                placeholder={p("password")}
                className={`w-full px-4 py-3 pr-12 bg-background border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-border focus:ring-primary focus:border-primary"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="mt-1 text-sm text-red-500">{passwordError}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {g("passwordHint")}
            </p>
          </div>

          {/* Organization Checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isOrganization}
                onChange={(e) => {
                  setIsOrganization(e.target.checked);
                  if (!e.target.checked) {
                    setOrganizationName("");
                    setOrganizationError("");
                  }
                }}
                disabled={isLoading}
                className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {t("isCompany")}
              </span>
            </label>
          </div>

          {/* Organization Name (conditional) */}
          {isOrganization && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <label htmlFor="organizationName" className="block text-sm font-medium text-foreground mb-2">
                {g("companyName")}
              </label>
              <input
                id="organizationName"
                type="text"
                value={organizationName}
                onChange={(e) => {
                  setOrganizationName(e.target.value);
                  if (organizationError) validateOrganization(e.target.value);
                }}
                onBlur={() => validateOrganization(organizationName)}
                disabled={isLoading}
                placeholder={p("company")}
                className={`w-full px-4 py-3 bg-background border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  organizationError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-border focus:ring-primary focus:border-primary"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                required={isOrganization}
              />
              {organizationError && (
                <p className="mt-1 text-sm text-red-500">{organizationError}</p>
              )}
            </div>
          )}

          {/* General Error */}
          {generalError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{generalError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isLoading ||
              !!firstNameError ||
              !!lastNameError ||
              !!passwordError ||
              !!organizationError ||
              !firstName ||
              !lastName ||
              !password
            }
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-6"
          >
            {isLoading ? g("creating") : t("createAccount")}
          </button>
        </form>

        {/* Terms reminder */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {t("termsPrefix")}{" "}
            <Link
              href={`/${locale}/terms`}
              className="text-primary hover:underline"
            >
              {g("termsOfService")}
            </Link>{" "}
            {d("and")}{" "}
            <Link
              href={`/${locale}/privacy`}
              className="text-primary hover:underline"
            >
              {g("privacyPolicy")}
            </Link>
          </p>
        </div>
      </div>

      {/* Login Link */}
      <div className="mt-6 text-center pb-10">
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
