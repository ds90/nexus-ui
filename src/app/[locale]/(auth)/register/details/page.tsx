"use client";

import type { Register } from "@/types/register";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authApi } from "@/lib/api/auth";
import { Eye, EyeClosed } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("RegisterPage");
  const te = useTranslations("Error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {t("title")}
        </h1>
        <div>
          {t("google")}
        </div>
        <div>
          <div></div>
          O
          <div></div>
        </div>
        <form action="">
          {/* Name */}
          <div>
            <label className="">{t("firstName")}</label>
            <input type="text" disabled={isLoading} className="" required />
          </div>
          {/* Surname */}
          <div>
            <label className="">{t("lastName")}</label>
            <input type="text" disabled={isLoading} className="" required />
          </div>
          {/* Email */}
          <div>
            <label className="">{t("email")}</label>
            <input type="text" disabled={isLoading} className="" required />
          </div>
          {/* Password */}
          <div>
            <label className="">{t("password")}</label>
            <input type="text" disabled={isLoading} className="" required />
          </div>
          {/* Company */}
          <div>
            <input type="checkbox"
            name="isOrganization" />
            {t("isOrganization")}
            <div>
            <label className="">{t("organization")}</label>
            <input type="text" disabled={isLoading} className="" required />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
