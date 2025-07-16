import { useRef, useEffect } from 'react';
import CountryCard from './CountryCard';
import Loader from './Loader';
import './CountryList.css';

/**
 * Componente de lista de países con soporte para scroll infinito
 */
const CountryList = ({
  countries,
  loading,
  error,
  hasNextPage,
  onLoadMore,
  onCountryClick,
  currentPage,
  totalPages,
  totalCountries
}) => {
  const observerRef = useRef();
  const loadingRef = useRef();

  // Configurar Intersection Observer para scroll infinito
  useEffect(() => {
    if (loading || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    const currentLoadingRef = loadingRef.current;
    if (currentLoadingRef) {
      observer.observe(currentLoadingRef);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current && currentLoadingRef) {
        observerRef.current.unobserve(currentLoadingRef);
      }
    };
  }, [loading, hasNextPage, onLoadMore]);

  // Manejar errores
  if (error) {
    return (
      <section className="error-container" role="alert" aria-live="assertive">
        <div className="error-content">
          <h2 className="error-title">Error al cargar países</h2>
          <p className="error-message">{error}</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
            aria-label="Intentar cargar los países nuevamente"
          >
            Intentar nuevamente
          </button>
        </div>
      </section>
    );
  }

  // Mostrar estado vacío
  if (!loading && countries.length === 0) {
    return (
      <section className="empty-state" role="status" aria-live="polite">
        <div className="empty-content">
          <div className="empty-icon" aria-hidden="true">🌍</div>
          <h2 className="empty-title">No se encontraron países</h2>
          <p className="empty-message">
            Intenta ajustar tus filtros de búsqueda o seleccionar una región diferente.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="country-list-container" aria-label="Lista de países">
      {/* Información de paginación */}
      {totalCountries > 0 && (
        <div className="pagination-info" aria-live="polite">
          <span className="page-info">
            Página {currentPage} de {totalPages}
          </span>
          <span className="total-info">
            {countries.length} de {totalCountries} países mostrados
          </span>
        </div>
      )}

      {/* Lista de países */}
      <div 
        className="countries-grid"
        role="list"
        aria-label={`${countries.length} países mostrados`}
      >
        {countries.map((country, index) => (
          <div 
            key={`${country.name.common}-${index}`}
            role="listitem"
          >
            <CountryCard
              country={country}
              onClick={onCountryClick}
            />
          </div>
        ))}
      </div>

      {/* Indicador de carga para scroll infinito */}
      {hasNextPage && (
        <div 
          ref={loadingRef}
          className="load-more-container"
          aria-live="polite"
        >
          {loading ? (
            <Loader message="Cargando más países..." size="small" />
          ) : (
            <button
              className="load-more-button"
              onClick={onLoadMore}
              aria-label="Cargar más países"
            >
              Cargar más países
            </button>
          )}
        </div>
      )}

      {/* Indicador de final de lista */}
      {!hasNextPage && countries.length > 0 && (
        <div className="end-of-list" role="status" aria-live="polite">
          <p>Has visto todos los países disponibles</p>
        </div>
      )}

      {/* Loader inicial */}
      {loading && countries.length === 0 && (
        <div className="initial-loading">
          <Loader message="Cargando países..." size="large" />
        </div>
      )}
    </section>
  );
};

export default CountryList;
