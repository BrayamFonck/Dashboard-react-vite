import { useCallback } from 'react';
import { useCountries } from '../hooks/useCountries';
import FilterBar from '../components/FilterBar';
import CountryList from '../components/CountryList';
import './Dashboard.css';

/**
 * Página principal del dashboard de países
 */
const Dashboard = () => {
  const {
    countries,
    loading,
    error,
    searchTerm,
    selectedRegion,
    currentPage,
    totalPages,
    hasNextPage,
    sortBy,
    sortOrder,
    regions,
    searchCountries,
    filterByRegion,
    sortCountries,
    loadMore,
    resetFilters,
    totalCountries
  } = useCountries(20);

  // Manejar clic en país (para futuras funcionalidades como modal o página de detalles)
  const handleCountryClick = useCallback((country) => {
    console.log('País seleccionado:', country);
    // Aquí se podría implementar navegación a página de detalles o mostrar modal
    alert(`Información de ${country.name.common}\n\nCapital: ${country.capital?.[0] || 'N/A'}\nPoblación: ${new Intl.NumberFormat('es-ES').format(country.population)}\nRegión: ${country.region}`);
  }, []);

  return (
    <main className="dashboard" role="main">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            🌍 Dashboard de Países
          </h1>
          <p className="dashboard-subtitle">
            Explora información detallada sobre países de todo el mundo
          </p>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="dashboard-content">
        {/* Barra de filtros */}
        <FilterBar
          searchTerm={searchTerm}
          selectedRegion={selectedRegion}
          regions={regions}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSearch={searchCountries}
          onRegionFilter={filterByRegion}
          onSort={sortCountries}
          onReset={resetFilters}
          totalCountries={totalCountries}
        />

        {/* Lista de países */}
        <CountryList
          countries={countries}
          loading={loading}
          error={error}
          hasNextPage={hasNextPage}
          onLoadMore={loadMore}
          onCountryClick={handleCountryClick}
          currentPage={currentPage}
          totalPages={totalPages}
          totalCountries={totalCountries}
        />
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p className="footer-text">
            Datos proporcionados por{' '}
            <a 
              href="https://restcountries.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
              aria-label="REST Countries API (se abre en nueva pestaña)"
            >
              REST Countries API
            </a>
          </p>
          <p className="footer-credit">
            Desarrollado con React + Vite
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Dashboard;
