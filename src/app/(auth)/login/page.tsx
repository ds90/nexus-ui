"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Formato email non valido.");
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
        setLoginError("Email o password non corretti.");
      } else if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("Errore di connessione. Riprova.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-primary mb-2">Accedi</h1>
        <p className="text-gray-600 mb-6">Inserisci le tue credenziali</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Errore login */}
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {loginError}
            </div>
          )}

          {/* Campo email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              className={`w-full rounded-md border px-3 py-2 ${
                emailError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              required
              placeholder="nome@example.com"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Campo password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}   
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}              
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              required
              placeholder="********"
            />
          </div>
          {/* Button invia */}
          <button
            type="submit"
            disabled={!!emailError || isLoading}
            className={`w-full py-2 px-4 rounded-md font-semibold text-white transition-colors ${
              emailError || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-secondary hover:bg-secondary/90"
            }`}
          >
            {isLoading ? "Accesso in corso ..." : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
