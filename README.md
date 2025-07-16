# 🌍 Dashboard de Países - React + Vite

Un dashboard interactivo y responsive para explorar información detallada sobre países de todo el mundo, consumiendo la API de REST Countries. Desarrollado con React, Vite y diseño mobile-first con enfoque en accesibilidad.

## 🔍 Descripción General

Este dashboard permite a los usuarios buscar, filtrar y explorar información sobre países de manera intuitiva. Incluye funcionalidades de búsqueda en tiempo real, filtrado por regiones, ordenamiento múltiple y scroll infinito, todo con un diseño moderno y accesible.

## ✨ Características Principales

- **🔍 Búsqueda Inteligente**: Búsqueda en tiempo real con debounce para optimizar llamadas a la API
- **🌎 Filtrado por Región**: Filtra países por continentes y regiones específicas
- **📊 Ordenamiento Múltiple**: Ordena por nombre, población, área o región en orden ascendente/descendente
- **📱 Diseño Responsive**: Mobile-first design que se adapta perfectamente a cualquier dispositivo
- **♿ Accesibilidad Completa**: Navegación por teclado, lectores de pantalla, alto contraste y más
- **🔄 Scroll Infinito**: Carga progresiva de países para mejor rendimiento
- **🎨 Interfaz Moderna**: Diseño atractivo con gradientes, animaciones suaves y modo oscuro

## 🛠 Estructura del Proyecto

```text
src/
├── components/         # Componentes reutilizables
│   ├── CountryCard.jsx/css
│   ├── CountryList.jsx/css
│   ├── FilterBar.jsx/css
│   └── Loader.jsx/css
├── pages/              # Página principal
│   └── Dashboard.jsx/css
├── services/           # Servicios para API
│   └── countryService.js
├── hooks/              # Hooks personalizados
│   └── useCountries.js
├── styles/             # Estilos globales
│   └── App.module.css
├── App.jsx
└── main.jsx
```


---

## 📋 Tabla de Contenidos
- [Demostración del Dashboard](#-demostración-del-dashboard)
- [Requisitos del Sistema](#-requisitos-del-sistema)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Características Técnicas](#-características-técnicas)
- [API Utilizada](#-api-utilizada)
- [Accesibilidad](#-accesibilidad)
- [Casos de Uso](#-casos-de-uso)
- [Contribuir](#-contribuir)
- [Contacto](#-contacto)

## 🎯 Demostración del Dashboard

### Interfaz Principal
El dashboard presenta una interfaz limpia y moderna con las siguientes secciones:

- **🎨 Header Atractivo**: Título con gradiente y descripción del proyecto
- **🔧 Barra de Filtros**: Búsqueda, filtrado por región y opciones de ordenamiento
- **📱 Grid de Países**: Cards responsive que muestran información detallada
- **⚡ Carga Infinita**: Scroll infinito para navegar entre países
- **📊 Información de Estado**: Contadores y estado de la aplicación

### Características de las Tarjetas de País
Cada tarjeta incluye:
- 🏴 Bandera del país (con fallback)
- 🏛️ Nombre oficial y común
- 🌆 Capital
- 👥 Población formateada
- 🌍 Región y subregión
- 📐 Área total
- 🗣️ Idiomas oficiales
- 💰 Monedas utilizadas

## 💻 Requisitos del Sistema

- **Node.js 16+** (recomendado 18+ o 20+)
- **npm 8+** o **pnpm 7+**
- Navegador moderno con soporte para:
  - ES6+ features
  - CSS Grid y Flexbox
  - Fetch API
  - Intersection Observer API

### Dependencias Principales
- **React 19.1.0**: Library principal de UI
- **Vite 7.0.4**: Build tool y dev server
- **REST Countries API**: Fuente de datos de países

## 🚀 Instalación

### 📥 Clonar el Repositorio
```bash
git clone https://github.com/BrayamFonck/Dashboard-react-vite.git
cd Dashboard-react-vite
```

### 📦 Instalar Dependencias
```bash
# Con npm
npm install

# O con pnpm (recomendado)
pnpm install
```

### 🔧 Configuración del Entorno
No se requiere configuración adicional. El proyecto está listo para usar con la API pública de REST Countries.

## 🎮 Uso

### 🔄 Servidor de Desarrollo
```bash
# Iniciar servidor de desarrollo
npm run dev
# o
pnpm dev

# El dashboard estará disponible en http://localhost:5173
```

### 🏗️ Build para Producción
```bash
# Crear build optimizado
npm run build
# o
pnpm build

# Previsualizar build
npm run preview
# o
pnpm preview
```

### 🚀 Despliegue
```bash
# Desplegar a GitHub Pages
npm run deploy
# o
pnpm deploy
```

## 🏗️ Arquitectura del Proyecto

### 🧩 Componentes Principales

#### `CountryCard.jsx`
- Tarjeta individual de país con información detallada
- Diseño responsive y accesible
- Manejo de errores en imágenes
- Soporte para interacciones por teclado

#### `CountryList.jsx`
- Contenedor de la lista de países
- Implementa scroll infinito con Intersection Observer
- Manejo de estados de carga y error
- Paginación inteligente

#### `FilterBar.jsx`
- Barra de búsqueda y filtros
- Debounce en búsqueda (300ms)
- Filtrado por región
- Opciones de ordenamiento múltiple

#### `Loader.jsx`
- Componente de carga animado
- Múltiples tamaños y estados
- Accesible y con soporte para reduced motion

### 🎣 Hook Personalizado: `useCountries`

```javascript
const {
  countries,           // Lista de países mostrados
  loading,            // Estado de carga
  error,              // Estado de error
  searchTerm,         // Término de búsqueda actual
  selectedRegion,     // Región seleccionada
  totalCountries,     // Total de países encontrados
  searchCountries,    // Función para buscar
  filterByRegion,     // Función para filtrar
  sortCountries,      // Función para ordenar
  loadMore,          // Función para cargar más
  resetFilters       // Función para resetear
} = useCountries(pageSize);
```

### 🌐 Servicio de API: `countryService`

```javascript
// Servicios disponibles
countryService.getAllCountries()     // Obtener todos los países
countryService.searchByName(name)    // Buscar por nombre
countryService.getByRegion(region)   // Filtrar por región
countryService.getByCode(code)       // Obtener por código
```

## ⚡ Características Técnicas

### 🎨 Diseño y UX
- **Mobile-First**: Diseño que prioriza la experiencia móvil
- **CSS Grid & Flexbox**: Layout moderno y flexible
- **Animaciones Suaves**: Transiciones CSS optimizadas
- **Modo Oscuro**: Soporte automático según preferencias del sistema
- **Alto Contraste**: Compatibilidad con preferencias de accesibilidad

### � Rendimiento
- **Debounce**: Optimización de llamadas a API (300ms)
- **Lazy Loading**: Carga diferida de imágenes
- **Scroll Infinito**: Paginación eficiente con Intersection Observer
- **Memoización**: Uso de `useCallback` para optimizar re-renders
- **Bundle Splitting**: Vite optimiza automáticamente el bundle

### 🔄 Estado y Gestión de Datos
- **Hook Personalizado**: `useCountries` centraliza la lógica de estado
- **Estado Local**: Manejo con `useState` y `useEffect`
- **Cache Inteligente**: Reutilización de datos filtrados
- **Error Boundaries**: Manejo robusto de errores

## 🌐 API Utilizada

### REST Countries API
- **Endpoint**: `https://restcountries.com/v3.1/`
- **Documentación**: [REST Countries](https://restcountries.com)
- **Campos utilizados**: `name`, `capital`, `population`, `region`, `subregion`, `flags`, `area`, `languages`, `currencies`

### Endpoints Implementados
```javascript
// Obtener todos los países
GET /all?fields=name,capital,population,region,subregion,flags,area,languages,currencies

// Buscar por nombre
GET /name/{name}?fields=...

// Filtrar por región
GET /region/{region}?fields=...

// Obtener por código
GET /alpha/{code}
```

## ♿ Accesibilidad

### Cumplimiento WCAG 2.1
- **🎯 Nivel AA**: Cumple con estándares de accesibilidad web
- **⌨️ Navegación por Teclado**: Todos los elementos son navegables
- **🔊 Lectores de Pantalla**: Etiquetas semánticas y ARIA
- **🎨 Contraste**: Ratios de contraste adecuados
- **📱 Zoom**: Soporte hasta 200% sin pérdida de funcionalidad

### Características Específicas
- `aria-label` y `aria-describedby` en formularios
- `role` apropiados para elementos interactivos
- `aria-live` para anuncios dinámicos
- Etiquetas semánticas HTML5
- Focus visible para navegación por teclado
- Soporte para `prefers-reduced-motion`

## 📊 Casos de Uso

### 🎓 Educativo
- **Geografía**: Explorar países y sus características
- **Demografía**: Analizar poblaciones y distribuciones
- **Cultura**: Conocer idiomas y monedas del mundo
- **Investigación**: Comparar datos entre países

### 💼 Profesional
- **Desarrollo Web**: Ejemplo de buenas prácticas en React
- **UX/UI**: Referencia para diseño responsive y accesible
- **Portfolio**: Demostración de habilidades técnicas
- **Consultorías**: Base para proyectos de visualización de datos

### 🌐 Personal
- **Viajes**: Planificación y exploración de destinos
- **Cultura General**: Ampliar conocimientos geográficos
- **Idiomas**: Descubrir idiomas por región
- **Curiosidad**: Explorar datos interesantes de países

## 🤝 Contribuir

### 🔧 Desarrollo Local
1. Fork el repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### 💡 Ideas para Contribuir
- 🗺️ Agregar mapas interactivos
- 📈 Implementar gráficos de datos
- 🔄 Comparador de países
- 📱 Mejoras en responsive design
- ♿ Nuevas características de accesibilidad
- 🎨 Temas y personalizaciones
- 🌐 Internacionalización (i18n)

### 🐛 Reportar Bugs
Usa el sistema de [Issues de GitHub](https://github.com/BrayamFonck/Dashboard-react-vite/issues) para reportar bugs o sugerir nuevas funcionalidades.

## 🙏 Agradecimientos

Agradecimientos especiales a:

- **[REST Countries API](https://restcountries.com)**: Por proporcionar datos gratuitos y actualizados de países
- **[React Team](https://react.dev)**: Por la excelente biblioteca de UI
- **[Vite](https://vitejs.dev)**: Por la herramienta de build rápida y moderna
- **Comunidad Open Source**: Por las innumerables contribuciones que hacen posible este proyecto

## 🔗 Enlaces Útiles

- **🌐 Demo en Vivo**: [https://brayamfonck.github.io/Dashboard-react-vite](https://brayamfonck.github.io/Dashboard-react-vite)
- **📖 REST Countries API**: [https://restcountries.com](https://restcountries.com)
- **⚡ Vite**: [https://vitejs.dev](https://vitejs.dev)
- **⚛️ React**: [https://react.dev](https://react.dev)
- **♿ WCAG Guidelines**: [https://www.w3.org/WAI/WCAG21/quickref/](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 📧 Contacto

Si tienes preguntas, sugerencias o quieres reportar problemas, puedes contactar al desarrollador:

**Brayan Fonseca**
- 🐙 **GitHub**: [BrayamFonck](https://github.com/BrayamFonck)
- 💼 **LinkedIn**: [Brayan Steven Fonseca González](https://www.linkedin.com/in/brayan-steven-fonseca-gonzalez/)
- 📧 **Email**: [Contacto](mailto:brayamfonck@gmail.com)

---

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

¡Gracias por visitar este repositorio! 🚀  
Esperamos que este proyecto sea útil para ti y que puedas sacarle el máximo provecho.  
¡No olvides darle una ⭐ si te gustó! 😊

## 🌟 ¡Con ❤️ desde Colombia para el mundo! 🇨🇴

---

<div align="center">
  <strong>Dashboard de Países</strong> - Explora el mundo desde tu navegador
  <br>
  <em>Desarrollado con React + Vite</em>
</div>

