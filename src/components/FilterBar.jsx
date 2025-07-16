import { useState, useEffect } from 'react';
import './FilterBar.css';

/**
 * Componente de barra de filtros accesible
 */
const FilterBar = ({
  searchTerm,
  selectedRegion,
  regions,
  sortBy,
  sortOrder,
  onSearch,
  onRegionFilter,
  onSort,
  onReset,
  totalCountries
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Sincronizar el término de búsqueda local con el prop
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Manejar la búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(localSearchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchTerm, onSearch]);

  const handleSearchChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    onRegionFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split('-');
    onSort(field, order);
  };

  const handleReset = () => {
    setLocalSearchTerm('');
    onReset();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(localSearchTerm);
    }
  };

  return (
    <section className="filter-bar" role="search" aria-label="Filtros de países">
      <div className="filter-container">
        {/* Búsqueda por nombre */}
        <div className="search-group">
          <label htmlFor="country-search" className="search-label">
            Buscar país
          </label>
          <div className="search-input-container">
            <input
              id="country-search"
              type="text"
              value={localSearchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Buscar por nombre..."
              className="search-input"
              aria-describedby="search-help"
            />
            <span id="search-help" className="visually-hidden">
              Escribe el nombre de un país para filtrar los resultados
            </span>
            {localSearchTerm && (
              <button
                type="button"
                onClick={() => setLocalSearchTerm('')}
                className="clear-search-btn"
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filtro por región */}
        <div className="filter-group">
          <label htmlFor="region-filter" className="filter-label">
            Filtrar por región
          </label>
          <select
            id="region-filter"
            value={selectedRegion}
            onChange={handleRegionChange}
            className="region-select"
            aria-describedby="region-help"
          >
            <option value="">Todas las regiones</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <span id="region-help" className="visually-hidden">
            Selecciona una región para filtrar los países
          </span>
        </div>

        {/* Ordenamiento */}
        <div className="sort-group">
          <label htmlFor="sort-select" className="sort-label">
            Ordenar por
          </label>
          <select
            id="sort-select"
            value={`${sortBy}-${sortOrder}`}
            onChange={handleSortChange}
            className="sort-select"
            aria-describedby="sort-help"
          >
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="population-desc">Población (Mayor a menor)</option>
            <option value="population-asc">Población (Menor a mayor)</option>
            <option value="area-desc">Área (Mayor a menor)</option>
            <option value="area-asc">Área (Menor a mayor)</option>
            <option value="region-asc">Región (A-Z)</option>
            <option value="region-desc">Región (Z-A)</option>
          </select>
          <span id="sort-help" className="visually-hidden">
            Selecciona cómo ordenar la lista de países
          </span>
        </div>

        {/* Botón de reset */}
        <div className="reset-group">
          <button
            type="button"
            onClick={handleReset}
            className="reset-btn"
            aria-label="Restablecer todos los filtros"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Información de resultados */}
      <div className="results-info" aria-live="polite" aria-atomic="true">
        <span className="results-count">
          {totalCountries === 0 
            ? 'No se encontraron países' 
            : `${totalCountries} país${totalCountries !== 1 ? 'es' : ''} encontrado${totalCountries !== 1 ? 's' : ''}`
          }
        </span>
        {(searchTerm || selectedRegion) && (
          <span className="active-filters">
            {searchTerm && (
              <span className="filter-tag">
                Búsqueda: "{searchTerm}"
              </span>
            )}
            {selectedRegion && (
              <span className="filter-tag">
                Región: {selectedRegion}
              </span>
            )}
          </span>
        )}
      </div>
    </section>
  );
};

export default FilterBar;
