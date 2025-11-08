import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSelector from "@/components/ui/LanguageSelector";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-fixed to-fixed-secondary flex flex-col">
      {/* Header con Logo + Controls */}
      <div className="p-6 flex justify-between items-center">
        {/* Logo a sinistra */}
        <Logo />

        {/* Theme + Language a destra con variant contrast */}
        <div className="flex items-center gap-2">
          <ThemeToggle variant="contrast" />
          <LanguageSelector variant="contrast" />
        </div>
      </div>

      {/* Contenuto centrato */}
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}
