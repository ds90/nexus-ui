import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Crea plugin next-intl puntando al file i18n.ts
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);