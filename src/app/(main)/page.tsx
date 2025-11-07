export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-primary">
          Benvenuto in Nexus
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          La piattaforma di project management moderna per team che vogliono lavorare meglio.
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <a href="/register"
            className="bg-secondary text-white px-8 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Inizia Gratis
          </a>
          <a href="/prezzi"
            className="bg-white text-primary border-2 border-primary px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Vedi Prezzi
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-24">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Gestione Progetti
          </h3>
          <p className="text-gray-600">
            Organizza e traccia i tuoi progetti con facilità.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">👥</span>
          </div>
           <h3 className="text-xl font-semibold text-primary mb-2">
            Collaborazione Team
          </h3>
          <p className="text-gray-600">
            Lavora insieme al tuo team in tempo reale.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            Veloce e Potente
          </h3>
          <p className="text-gray-600">
            Prestazioni elevate per team di ogni dimensione.
          </p>
        </div>
      </div>
    </div>
  )
}