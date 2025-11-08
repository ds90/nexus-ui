import Logo from '@/components/ui/Logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-fixed to-fixed-secondary flex flex-col">
      {/* Logo in alto a sinistra */}
      <div className="p-6">
        <Logo />
      </div>      
      {/* Contenuto centrato */}
      <main className="flex-1 flex items-center justify-center px-4">
        {children}
      </main>
    </div>
  )
}