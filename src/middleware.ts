import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n";

export default createMiddleware({
  // Lingue supportate
  locales,

  // Lingua di default
  defaultLocale,

  // Strategia di rilevamento locale
  localeDetection: true,

  // Prefisso sempre visibile nell'URL
  localePrefix: "always",
});

export const config = {
  // Matcher: applica middleware a tutti i path eccetto:
  // - API routes
  // - File statici (_next/static)
  // - Immagini (_next/image)
  // - Favicon
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
