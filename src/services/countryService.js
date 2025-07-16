const BASE_URL = 'https://restcountries.com/v3.1';

/**
 * Servicio para consumir la API de REST Countries
 */
export const countryService = {
  /**
   * Obtiene todos los países
   * @returns {Promise<Array>} Lista de países
   */
  async getAllCountries() {
    try {
      const response = await fetch(`${BASE_URL}/all?fields=name,capital,population,region,subregion,flags,area,languages,currencies`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching all countries:', error);
      throw error;
    }
  },

  /**
   * Busca países por nombre
   * @param {string} name - Nombre del país a buscar
   * @returns {Promise<Array>} Lista de países que coinciden
   */
  async searchByName(name) {
    if (!name.trim()) {
      return this.getAllCountries();
    }
    
    try {
      const response = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}?fields=name,capital,population,region,subregion,flags,area,languages,currencies`);
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching countries by name:', error);
      throw error;
    }
  },

  /**
   * Filtra países por región
   * @param {string} region - Región a filtrar
   * @returns {Promise<Array>} Lista de países de la región
   */
  async getByRegion(region) {
    try {
      const response = await fetch(`${BASE_URL}/region/${encodeURIComponent(region)}?fields=name,capital,population,region,subregion,flags,area,languages,currencies`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching countries by region:', error);
      throw error;
    }
  },

  /**
   * Obtiene un país específico por código
   * @param {string} code - Código del país
   * @returns {Promise<Object>} Datos del país
   */
  async getByCode(code) {
    try {
      const response = await fetch(`${BASE_URL}/alpha/${code}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error('Error fetching country by code:', error);
      throw error;
    }
  }
};
