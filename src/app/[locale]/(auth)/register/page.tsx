"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const t = useTranslations("RegisterPage");
  const te = useTranslations("Error");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


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
        
          {/* Email */}
          <div>            
            <input type="text" disabled={isLoading} className="" required />
          </div>
        
      </div>
      <div>
        
      </div>
    </div>
  );
}
