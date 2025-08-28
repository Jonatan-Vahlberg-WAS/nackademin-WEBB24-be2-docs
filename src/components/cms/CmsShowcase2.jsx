const CmsShowcase2 = () => {
  return (
    <div className="max-h-[600px] overflow-y-auto bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-900">Restaurant Showcase</h1>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-black">
            Välkommen till vår restaurang
          </h2>
          <p className="mb-4 text-gray-900">
            Upptäck våra mest populära rätter och smakupplevelser
          </p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Se meny
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Popular Dishes Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              Mest populära maträtter
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-gray-900">Pasta Carbonara</span>
                <span className="text-green-700 font-medium">189 kr</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-900">Grillad Lax</span>
                <span className="text-green-700 font-medium">245 kr</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-900">Margherita Pizza</span>
                <span className="text-green-700 font-medium">165 kr</span>
              </li>
            </ul>
          </div>

          {/* Special Offers Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              Dagens erbjudanden
            </h3>
            <div className="space-y-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm font-medium text-yellow-900">
                  Lunchspecial
                </p>
                <p className="text-xs text-yellow-800">
                  3-rätters meny för endast 299 kr
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm font-medium text-green-900">Happy Hour</p>
                <p className="text-xs text-green-800">
                  50% på alla drycker 15-18
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-6">
        <div className="text-center">
          <p className="text-sm text-gray-100">
            © 2024 Restaurant Showcase. Alla rättigheter förbehållna.
          </p>
          <p className="text-xs text-gray-200 mt-1">
            Kontakt: info@restaurant.se | 08-123 456 78
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CmsShowcase2;
