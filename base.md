# Anush Cuidarte Tools — Base de Contexto

## Propósito

App React PWA que centralice herramientas digitales para maternidad, lactancia y crianza. Publicada via GitHub Pages. Mantiene la identidad visual de los sitios existentes de Anush Cuidarte.

---

## Contexto de los Sitios Existentes

### 1. `anush_cuidarte_posts` (publicaciones/recetas)

| Aspecto | Detalle |
|---------|---------|
| Stack | React 18 (CRA), react-router-dom v7, CSS vanilla, lucide-react |
| Deploy | GitHub Actions → GitHub Pages (CNAME: `posts.anush.com.ar`) |
| Tipografía | **Montserrat** (300, 400, 600, 700) via Google Fonts |
| Layout | Max-width 1200px, grid responsive auto-fill, padding 20px laterales |
| Cards | border-radius 20px, box-shadow sutil (0 4px 15px rgba(0,0,0,0.05)), hover translateY(-2px) + shadow |
| Tags | border-radius 24px/12px, active fill primary color |

**Color palette (CSS vars)**:
```css
--color-primario:    #D17A72   /* terracota/rosa */
--color-secundario:  #E9D5C8   /* beige cálido */
--color-fondo:       #FDF8F5   /* blanco rubor */
--color-texto-dark:  #4A3B39   /* marrón oscuro */
--color-footer:      #7C4B44   /* terracota oscuro */
```

**Micro-interacciones**: hover con `translateY(-2px)` + shadow mejorado en casi todos los elementos interactivos. Consistente.

---

### 2. `anush-cuidarte-app` (sitio principal Django)

| Aspecto | Detalle |
|---------|---------|
| Stack | Django 4.0, Bootstrap 5, jQuery, Font Awesome, Open Sans |
| Tipografía | **Open Sans** (body 16px, h1 38-56px, h2 22-36px) |
| Cards | border-radius 28px (--radius-lg), white bg, shadow-md, algunos con línea degradada top |
| Botones | **border-radius 50px** (píldora), padding 14px 32px, gradient pink con box-shadow |
| Secciones | Fondos con gradientes suaves, py-6 (96px vertical padding) |

**Color palette (CSS vars)**:
```css
--pink:         #C97B84   /* rosa principal */
--pink-dark:    #A85D66
--green:        #7AB892   /* verde acciones */
--green-dark:   #5A9470
--cream:        #F0E0E2   /* fondo cards/badges */
--mint:         #D4EDE0   /* fondo hero */
--sky:          #E0EEF6   /* fondo alterno */
--dark:         #1A1A2E   /* títulos */
--gray:         #4A4A5A   /* texto body */
```

**Gradientes definidos**:
```css
--gradient-pink:      linear-gradient(135deg, #C97B84, #A85D66)
--gradient-green:     linear-gradient(135deg, #7AB892, #5A9470)
--gradient-hero:      linear-gradient(180deg, #D4EDE0, #E0EEF6)
--gradient-services:  linear-gradient(135deg, #F0E0E2, #D4B896)
--gradient-resources: linear-gradient(135deg, #E0EEF6, #F0E0E2)
--gradient-mode:      linear-gradient(180deg, #F0E0E2, #D4EDE0)
```

**Sistema de sombras**:
```css
--shadow-sm: 0 4px 10px rgba(0,0,0,0.1)
--shadow-md: 0 8px 24px rgba(0,0,0,0.12)
--shadow-lg: 0 16px 48px rgba(0,0,0,0.16)
```

---

## Identidad Visual — Anush Cuidarte

Ambos sitios comparten una **identidad visual cálida, materna y profesional** con:

- **Paleta cálida**: rosas/terracotas, beiges/cremas, verdes suaves
- **Formas redondeadas**: esquinas generosas en cards, tags y botones
- **Sombras suaves**: elevación sutil, nada plano
- **Gradientes**: usados en fondos de sección y botones
- **Tipografía amable**: sans-serif humanista/geométrica
- **Blanco como base**: cards blancas sobre fondos tintados
- **Espacio generoso**: padding, gap, márgenes amplios

---

## Propuesta de Diseño para la PWA

### Fusión de estilos

Para la PWA React, propongo tomar lo mejor de ambos:

| Elemento | Decisión | Fuente |
|----------|----------|--------|
| Tipografía | **Montserrat** | Posts (más moderna, ideal para UI) |
| Primary color | **#C97B84** (rosa) | App Django (casi idéntico a #D17A72 de Posts) |
| Secondary | **#7AB892** (verde) | App Django |
| Background | **#FDF8F5** (blanco rubor) | Posts |
| Dark text | **#4A3B39** | Posts (más cálido que #1A1A2E) |
| Cards | **border-radius 24px**, sombra, hover sutil | Fusión (20px posts + 28px django = 24px) |
| Botones | **border-radius 50px** (píldora), gradient | Django |
| Fondos sección | **Gradientes suaves** (cream, mint, sky) | Django |
| Footer | **#7C4B44** con texto claro | Posts |

### CSS Custom Properties propuestos

```css
:root {
  /* Primarios */
  --pink:           #C97B84;
  --pink-dark:      #A85D66;
  --pink-light:     #E9B4BB;
  --green:          #7AB892;
  --green-dark:     #5A9470;

  /* Neutros */
  --bg:             #FDF8F5;
  --bg-card:        #FFFFFF;
  --text-dark:      #4A3B39;
  --text-body:      #636E72;
  --text-light:     #999999;

  /* Pasteles */
  --cream:          #F0E0E2;
  --mint:           #D4EDE0;
  --sky:            #E0EEF6;

  /* Funcionales */
  --footer-bg:      #7C4B44;
  --footer-text:    rgba(255,255,255,0.9);
  --success:        #7AB892;
  --error:          #C62828;

  /* Sombras */
  --shadow-sm:      0 4px 10px rgba(0,0,0,0.08);
  --shadow-md:      0 8px 24px rgba(0,0,0,0.1);
  --shadow-lg:      0 16px 48px rgba(0,0,0,0.14);

  /* Radios */
  --radius-sm:      8px;
  --radius-md:      16px;
  --radius-lg:      24px;
  --radius-xl:      32px;
  --radius-full:    50px;

  /* Layout */
  --max-width:      1200px;
  --page-gutter:    20px;
  --section-py:     80px;
}
```

### Gradientes propuestos

```css
--gradient-pink:  linear-gradient(135deg, #C97B84, #A85D66);
--gradient-green: linear-gradient(135deg, #7AB892, #5A9470);
--gradient-hero:  linear-gradient(180deg, #D4EDE0, #E0EEF6);
--gradient-card-top: linear-gradient(90deg, #C97B84, #7AB892);
```

---

## Arquitectura de la App

### Landing / Home (`/`)

Sección con **cards de herramientas disponibles**. Cada card muestra:
- Ícono representativo
- Título de la tool
- Breve descripción (1 línea)
- Hover sutil (translateY -2px, shadow++)
- Click → navega a `/:tool-slug`

### Tool: Calculadora de Capacidad Gástrica (`/gastric-capacity`)

Calculadora para determinar capacidad gástrica de bebés/niños y distribución entre leche materna y fórmula.

**Inputs del usuario**:
- Peso al nacer (P nac)
- Peso actual (P actual)
- Altura/Percentil (opcional)
- Modo de selección: 150ml o 200ml por kg (toggle o radio)

**Cálculos** (basados en los datos y fórmulas provistos):

| Campo | Fórmula | Ejemplo |
|-------|---------|---------|
| % de pérdida de peso | `(P_nac - P_actual) / P_nac * 100` | 3500→3250 = 7% |
| Cap. Gástrica (150ml) | `P_actual_kg * 150` | 5.6 * 150 = 840 |
| Cap. Gástrica (200ml) | `P_actual_kg * 200` | 5.6 * 200 = 1120 |
| Cap. Gástrica (promedio) | `AVG(150ml, 200ml)` | (840+1120)/2 = 980 |
| ml leche X día (fórmula) | `Capacidad * toma_formula` | 980 * 1 = 980 → 600 (con regla de 3) |
| ml leche X día (teta) | `Capacidad - ml_formula` | 980 - 600 = 380 |
| % fórmula | `ml_formula / Capacidad * 100` | 600/980 = 61% |
| % teta | `ml_teta / Capacidad * 100` | 380/980 = 39% |

> **Nota**: Los valores de `toma_formula` (cantidad de tomas de fórmula por día) deben ser editables. En el ejemplo es 1 toma (600ml) pero podrían ser 2, 3, etc.

**Layout de la calculadora**:
- Panel izquierdo: inputs del usuario (pesos, selector ml/kg, tomas de fórmula)
- Panel derecho: resultados con valores destacados y barras de proporción
- Botón **Exportar** → descarga resumen en PDF o imagen (png)

**Exportar**: Botón "Exportar resumen" que genere un PDF/imagen con:
- Valores ingresados
- Resultados calculados
- Distribución fórmula/teta (gráfico de torta simple)

---

### Tool: Curvas de Crecimiento Percentilar (`/growth-charts`)

Visualización interactiva de las curvas de crecimiento infantil (peso por edad) con la posibilidad de agregar mediciones del bebé.

**Librería recomendada**: **Recharts** (React-native, buena documentación, soporte para múltiples series, tooltips, responsive)

Alternativas consideradas:
- **nivo**: más customizable pero mayor bundle
- **visx**: muy flexible pero muy bajo nivel
- **chart.js**: no es React nativo

**Curvas de referencia**: Las curvas típicas de percentiles (OMS):
- P3, P10, P25, P50, P75, P90, P97
- Datos de peso por edad (0-24 meses o 0-5 años según OMS)
- Los datos de las curvas OMS se pueden obtener de:
  - `https://www.who.int/tools/child-growth-standards/standards` (datos públicos)
  - Librería `zgrow` o datasets en JSON/CSV
  - Alternativa: embeber datos estandarizados OMS para peso/edad

**Funcionalidad**:
1. Selector de género (niño/niña) — cambia las curvas de referencia
2. Selector de tipo de gráfico (peso/edad, talla/edad, PC/edad)
3. Gráfico con las curvas percentilares de referencia (líneas tenues)
4. Abajo: sección para agregar **mediciones del bebé**:
   - Input: edad (meses o días)
   - Input: peso (kg)
   - Botón **+** para agregar otra medición
   - Botón **Agregar** para añadir el punto
5. Cada punto agregado se muestra en el gráfico como marcador
6. Los puntos se **unen con una línea** que muestra la evolución individual
7. Tooltip al hover sobre cualquier punto (valor exacto + percentil relativo)
8. Leyenda indicando qué curva es cuál (P3, P50, etc.) y la del bebé

**Interacciones**:
- Zoom en área seleccionada (opcional)
- Hover para ver valores exactos
- Click en leyenda para ocultar/mostrar curvas

**Exportar**: Botón "Exportar gráfico" → descarga como PNG:
- Estado actual del gráfico con todas las mediciones
- Leyenda incluida

---

## Layout Global de la App

```
+----------------------------------+
|  Header                           |
|  [Logo Anush] [Back Button]*      |
+----------------------------------+
|                                  |
|  <main class="main-content">     |
|    {outlet} — cada tool/page     |
|  </main>                         |
|                                  |
+----------------------------------+
|  Footer                          |
|  Marca, links, copyright         |
+----------------------------------+
```

> `*` Back button solo visible en páginas de tool (no en home)

### Mobile First

- Navegación simple: home → tool, back button para volver
- En mobile: layout vertical apilado (inputs arriba, resultados abajo en la calculadora)
- Gráfico: responsive, ocupa el 100% del ancho disponible

---

## PWA y Cloudflare Pages

### Requisitos PWA
- `manifest.json` con nombre "Anush Cuidarte Tools", íconos, theme-color `#C97B84`
- Service Worker básico para cacheo de assets (workbox via vite-plugin-pwa)
- Meta tags: viewport, theme-color, apple-mobile-web-app-capable

### Estrategia Cloudflare Pages
- **Build**: `npm run build` → output en `dist/`
- **SPA routing**: archivo `public/_redirects` con `/* /index.html 200`
- **Deploy**: Conectado directo al repo de GitHub desde el dashboard de Cloudflare Pages (o via wrangler CLI)
- **Dominio**: `anush-cuidarte-tools.pages.dev` o dominio personalizado
- **Sin base path**: Cloudflare sirve desde root, `base: '/'` en vite

### `_redirects` (para SPA en Cloudflare Pages)

```
/* /index.html 200
```

---

## Stack Recomendado

| Capa | Tecnología |
|------|-----------|
| Framework | **React 18** + **Vite** (más rápido que CRA) |
| Routing | **react-router-dom** v6/v7 |
| Estilos | **Bootstrap 5** (CSS via npm, sin Bootstrap JS) + CSS Custom Properties para anular colores/tokens |
| Charts | **Recharts** (curvas de crecimiento) |
| Export | **html2canvas** + **jspdf** para exportar a PNG/PDF |
| PWA | **vite-plugin-pwa** (workbox integrado) |
| Deploy | **GitHub Actions** → gh-pages |
| Icons | **Bootstrap Icons** + **Font Awesome 6** (kit, como en la app Django) |

### Estrategia Bootstrap

Usamos Bootstrap 5 **solo para el sistema de grilla, utilidades de spacing, y componentes base** (buttons, cards, forms) vía su CSS. No necesitamos Bootstrap JS (ni jQuery) — los componentes interactivos los manejamos con React puro.

```bash
npm install bootstrap
```

En el entry point:
```js
import 'bootstrap/dist/css/bootstrap.min.css';
```

**Anulación de colores Bootstrap** con nuestras CSS Custom Properties de Anush:

```css
/* anush-variables.css */
:root {
  --bs-primary: #C97B84;
  --bs-primary-rgb: 201, 123, 132;
  --bs-success: #7AB892;
  --bs-success-rgb: 122, 184, 146;
  --bs-body-color: #4A3B39;
  --bs-body-bg: #FDF8F5;
  --bs-border-radius: 24px;
  --bs-border-radius-lg: 28px;
  --bs-border-radius-sm: 8px;
  --bs-border-radius-pill: 50px;
}
.btn-primary {
  background: linear-gradient(135deg, #C97B84, #A85D66);
  border: none;
  border-radius: 50px;
  padding: 14px 32px;
  box-shadow: 0 4px 15px rgba(201, 123, 132, 0.4);
}
.card {
  border: none;
  border-radius: 24px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```

Esto nos da:
- **Grilla responsive** de Bootstrap (`container`, `row`, `col-*`) → consistente con el sitio Django
- **Utilidades de spacing** (`m-*`, `p-*`, `gap-*`)
- **Componentes base** (`card`, `btn`, `form-control`, `badge`) re-estilizados con la identidad Anush
- **Sin jQuery, sin Bootstrap JS** — menos bundle, todo React

---

## Estructura de Archivos Propuesta

```
anush_cuidarte_tools/
├── public/
│   ├── manifest.json
│   ├── icons/              (íconos PWA 192x192, 512x512)
│   ├── index.html
│   └── 404.html            (para SPA redirect)
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles/
│   │   ├── anush-variables.css   (CSS custom properties + overrides Bootstrap)
│   │   └── global.css            (ajustes finos, tipografía, animaciones)
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ToolCard.jsx
│   │   └── Layout.jsx            (wrapper con header+footer + container)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── GastricCapacity.jsx
│   │   └── GrowthCharts.jsx
│   ├── hooks/
│   │   ├── useGastricCalc.js
│   │   └── useExport.js
│   ├── data/
│   │   ├── tools.js              (metadata de tools)
│   │   └── who-growth.js         (datos OMS curvas)
│   └── utils/
│       └── export.js             (html2canvas wrapper)
├── package.json
├── vite.config.js
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Datos OMS para Curvas de Crecimiento

Los datos estándar de la OMS para peso por edad (0-24 meses) deben ser precargados. Existen 3 fuentes viables:

1. **Datasets públicos OMS**: Descargar los archivos JSON/CSV del sitio de OMS
2. **Librería NPM**: `who-growth-charts` o similar (verificar si existe)
3. **Embed manual**: Extraer los valores tabulados de los estándares OMS para peso/edad

**Estructura de datos necesaria**:

```js
// who-growth-data.js
export const whoBoysWeight = [
  { month: 0, P3: 2.5, P10: 2.9, P25: 3.3, P50: 3.5, P75: 3.9, P90: 4.3, P97: 4.7 },
  { month: 1, P3: 3.4, P10: 3.9, P25: 4.3, P50: 4.8, P75: 5.1, P90: 5.5, P97: 5.9 },
  // ... hasta 24 o 60 meses
];
```

---

## Notas Adicionales

1. **Mobile-first**: La mayoría del público de Anush Cuidarte accede desde celular. Cada tool debe ser completamente funcional en pantallas de 360px.
2. **Sin login**: La app no requiere autenticación. Es completamente offline-capable después de la carga inicial (PWA).
3. **SEO mínimo**: Como es una SPA en GH Pages, el SEO es limitado. Usar meta tags estáticos en `index.html` y description por ruta via `react-helmet-async` (opcional).
4. **Idioma**: Todo en español neutro (coherente con el público de Anush).
5. **Exportar**: La funcionalidad de exportar (PDF/PNG) es clave para que las mamás puedan compartir con pediatras.
6. **Tool N + 1**: La arquitectura debe permitir agregar nuevas tools fácilmente — solo crear una página nueva y agregar la card en `tools.js`.
7. **sin dependencias pesadas**: Evitar lodash, moment.js, o librerías grandes. Preferir `date-fns` si se necesita manejo de fechas.
