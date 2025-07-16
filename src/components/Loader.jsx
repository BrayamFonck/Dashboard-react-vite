import './Loader.css';

/**
 * Componente de carga accesible
 */
const Loader = ({ message = "Cargando países...", size = "medium" }) => {
  return (
    <div className={`loader-container ${size}`} role="status" aria-live="polite">
      <div className="loader-spinner" aria-hidden="true">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <span className="loader-text">{message}</span>
    </div>
  );
};

export default Loader;
