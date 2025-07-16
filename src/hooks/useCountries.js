import { useState, useEffect, useCallback } from 'react';
import { countryService } from '../services/countryService';

/**
 * Hook personalizado para manejar el estado de los países
 * @param {number} pageSize - Número de países por página
 * @returns {Object} Estado y funciones para manejar países
 */
export const useCountries = (pageSize = 20) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Cargar todos los países al inicio
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await countryService.getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError('Error al cargar los países. Por favor, intenta nuevamente.');
        console.error('Error loading countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Función para buscar países por nombre
  const searchCountries = useCallback(async (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    
    if (!term.trim()) {
      setFilteredCountries(countries);
      return;
    }

    try {
      setLoading(true);
      const results = await countryService.searchByName(term);
      setFilteredCountries(results);
    } catch (err) {
      setError('Error en la búsqueda. Por favor, intenta nuevamente.');
      setFilteredCountries([]);
    } finally {
      setLoading(false);
    }
  }, [countries]);

  // Función para filtrar por región
  const filterByRegion = useCallback(async (region) => {
    setSelectedRegion(region);
    setCurrentPage(1);
    
    if (!region) {
      setFilteredCountries(countries);
      return;
    }

    try {
      setLoading(true);
      const results = await countryService.getByRegion(region);
      setFilteredCountries(results);
    } catch (err) {
      setError('Error al filtrar por región. Por favor, intenta nuevamente.');
      setFilteredCountries([]);
    } finally {
      setLoading(false);
    }
  }, [countries]);

  // Función para ordenar países
  const sortCountries = useCallback((field, order = 'asc') => {
    setSortBy(field);
    setSortOrder(order);
    
    const sorted = [...filteredCountries].sort((a, b) => {
      let aValue, bValue;
      
      switch (field) {
        case 'name':
          aValue = a.name.common.toLowerCase();
          bValue = b.name.common.toLowerCase();
          break;
        case 'population':
          aValue = a.population;
          bValue = b.population;
          break;
        case 'area':
          aValue = a.area || 0;
          bValue = b.area || 0;
          break;
        case 'region':
          aValue = a.region.toLowerCase();
          bValue = b.region.toLowerCase();
          break;
        default:
          aValue = a.name.common.toLowerCase();
          bValue = b.name.common.toLowerCase();
      }

      if (order === 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
    
    setFilteredCountries(sorted);
  }, [filteredCountries]);

  // Actualizar países mostrados cuando cambia la página o los países filtrados
  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedCountries(filteredCountries.slice(startIndex, endIndex));
  }, [filteredCountries, currentPage, pageSize]);

  // Función para cambiar página
  const goToPage = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  // Función para cargar más países (scroll infinito)
  const loadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    const maxPage = Math.ceil(filteredCountries.length / pageSize);
    
    if (nextPage <= maxPage) {
      setCurrentPage(nextPage);
      const startIndex = (nextPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const newCountries = filteredCountries.slice(startIndex, endIndex);
      setDisplayedCountries(prev => [...prev, ...newCountries]);
    }
  }, [currentPage, filteredCountries, pageSize]);

  // Función para resetear filtros
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedRegion('');
    setCurrentPage(1);
    setFilteredCountries(countries);
    setSortBy('name');
    setSortOrder('asc');
  }, [countries]);

  // Obtener regiones únicas
  const regions = [...new Set(countries.map(country => country.region))].filter(Boolean).sort();

  // Calcular información de paginación
  const totalPages = Math.ceil(filteredCountries.length / pageSize);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    // Estados
    countries: displayedCountries,
    allCountries: filteredCountries,
    loading,
    error,
    searchTerm,
    selectedRegion,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    sortBy,
    sortOrder,
    regions,
    
    // Funciones
    searchCountries,
    filterByRegion,
    sortCountries,
    goToPage,
    loadMore,
    resetFilters,
    
    // Información útil
    totalCountries: filteredCountries.length,
    displayedCount: displayedCountries.length
  };
};
