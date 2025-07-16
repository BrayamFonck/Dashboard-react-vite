import './CountryCard.css';

/**
 * Componente de tarjeta de país accesible y responsive
 */
const CountryCard = ({ country, onClick }) => {
  if (!country) return null;

  const {
    name,
    capital,
    population,
    region,
    subregion,
    flags,
    area,
    languages,
    currencies
  } = country;

  // Formatear números grandes
  const formatNumber = (num) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('es-ES').format(num);
  };

  // Obtener idiomas como string
  const getLanguages = () => {
    if (!languages) return 'N/A';
    return Object.values(languages).join(', ');
  };

  // Obtener monedas como string
  const getCurrencies = () => {
    if (!currencies) return 'N/A';
    return Object.values(currencies).map(currency => 
      `${currency.name} (${currency.symbol || currency.code})`
    ).join(', ');
  };

  const handleClick = () => {
    if (onClick) {
      onClick(country);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article 
      className={`country-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : 'article'}
      aria-label={`Información de ${name?.common}${onClick ? ', hacer clic para ver más detalles' : ''}`}
    >
      {/* Bandera */}
      <div className="flag-container">
        <img
          src={flags?.svg || flags?.png}
          alt={`Bandera de ${name?.common}`}
          className="flag-image"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className="flag-placeholder" style={{ display: 'none' }}>
          🏴
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="card-content">
        <h2 className="country-name">
          {name?.common}
        </h2>
        
        {name?.official && name.official !== name.common && (
          <p className="official-name">
            {name.official}
          </p>
        )}

        <dl className="country-details">
          <div className="detail-item">
            <dt>Capital:</dt>
            <dd>{capital?.[0] || 'N/A'}</dd>
          </div>

          <div className="detail-item">
            <dt>Población:</dt>
            <dd>{formatNumber(population)}</dd>
          </div>

          <div className="detail-item">
            <dt>Región:</dt>
            <dd>{region || 'N/A'}</dd>
          </div>

          {subregion && (
            <div className="detail-item">
              <dt>Subregión:</dt>
              <dd>{subregion}</dd>
            </div>
          )}

          <div className="detail-item">
            <dt>Área:</dt>
            <dd>{area ? `${formatNumber(area)} km²` : 'N/A'}</dd>
          </div>

          <div className="detail-item">
            <dt>Idiomas:</dt>
            <dd>{getLanguages()}</dd>
          </div>

          <div className="detail-item">
            <dt>Monedas:</dt>
            <dd>{getCurrencies()}</dd>
          </div>
        </dl>
      </div>

      {/* Indicador de clickeable */}
      {onClick && (
        <div className="click-indicator" aria-hidden="true">
          →
        </div>
      )}
    </article>
  );
};

export default CountryCard;
