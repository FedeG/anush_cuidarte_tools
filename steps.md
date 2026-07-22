# Plan de Implementación — Anush Cuidarte Tools

> Estado: 🔲 Pendiente · 🔄 En progreso · ✅ Completado

---

## FASE 0 — Setup del Proyecto

- [x] **0.1** Inicializar proyecto React + Vite
  - Dependencias instaladas: `react`, `react-dom`, `react-router-dom`, `recharts`, `html2canvas`, `jspdf`, `bootstrap`, `bootstrap-icons`, `vite`, `@vitejs/plugin-react`, `vite-plugin-pwa`
- [x] **0.2** Configurar Vite para Cloudflare Pages
  - `base: '/'` (default, Cloudflare sirve desde root)
  - `outDir: 'dist'`
- [x] **0.3** Configurar PWA con `vite-plugin-pwa`
  - `manifest.json` con nombre, íconos, theme-color `#C97B84`
  - Service Worker automático
- [x] **0.4** Crear `public/_redirects` para SPA en Cloudflare Pages (`/* /index.html 200`)
- [x] **0.5** Configurar build + directorios
  - `package.json` con scripts dev/build/preview
  - `src/` con estructura de carpetas (`components/`, `pages/`, `hooks/`, `data/`, `utils/`, `styles/`)

---

## FASE 1 — Base Visual y Layout

- [x] **1.1** Definir CSS Custom Properties (`styles/anush-variables.css`)
  - Paleta completa, sombras, radios, layout + overrides Bootstrap
- [x] **1.2** Reset y estilos globales (`styles/global.css`)
  - Box-sizing, body (Montserrat, bg color), scroll suave, animaciones
- [x] **1.3** Componente `Layout` (Header + main + Footer)
  - Header con logo "Anush Tools" y back button condicional
  - Footer con marca y copyright
- [x] **1.4** Configurar Router (`App.jsx` con `HashRouter`)
  - `/` → Home, `/gastric-capacity` → Calculadora, `/growth-charts` → Curvas de crecimiento
- [x] **1.5** Componente `ToolCard`
  - Ícono (Bootstrap Icons), título, descripción, hover effect
- [x] **1.6** Página `Home`
  - Grid de ToolCards con datos de `tools.js`
  - Hero section chica con descripción del sitio

---

## FASE 2 — Tool: Calculadora de Capacidad Gástrica

- [x] **2.1** Hook `useGastricCalc`
  - Estado: pesoNac, pesoActual, modo150_200, tomasFormula, mlPorToma
  - Cálculos: % pérdida, cap 150/200/promedio, ml fórmula/teta, % fórmula/teta
  - Validaciones, color según rango de pérdida
- [x] **2.2** Formulario de inputs
  - Peso al nacer (g, opcional), peso actual (g, requerido)
  - Toggle 150ml / 200ml
  - Tomas de fórmula al día + ml por toma
- [x] **2.3** Panel de resultados
  - % pérdida con badge de color, capacidad (3 cards), distribución con ProgressBar + DonutChart SVG, tabla resumen
- [x] **2.4** Diseño responsive
  - Mobile: apilado; Desktop: 5-col form + 7-col resultados
- [x] **2.5** Exportar a PNG con `html2canvas`
  - Botón "Exportar resumen", captura el panel de resultados
- [ ] **2.6** Tests unitarios del hook (pendiente)

---

## FASE 3 — Tool: Curvas de Crecimiento Percentilar

- [x] **3.1** Datos OMS (`data/who-growth.js`)
  - Curvas P3, P10, P25, P50, P75, P90, P97 para niños y niñas (0-24 meses)
  - Basado en LMS parameters de WHO, interpolación lineal mensual
  - Función `estimatePercentile()` para estimar percentil de una medición
- [x] **3.2** Selector de género
  - Niño / Niña con toggle Bootstrap y Bootstrap Icons
- [x] **3.3** Gráfico con Recharts
  - `LineChart` con 7 líneas percentilares en paleta degradada anush
  - Línea P50 sólida, las demás punteadas
  - Tooltip personalizado con valores exactos + punto del bebé
  - Leyenda personalizada
- [x] **3.4** Sección "Agregar mediciones"
  - Inputs: edad (meses) + peso (kg)
  - Botón "Agregar al gráfico" + Enter key support
- [x] **3.5** Puntos del bebé en el gráfico
  - Línea destacada (3px, #A85D66) que conecta mediciones
  - Puntos con relleno blanco y borde
- [x] **3.6** Tabla resumen
  - Edad | Peso | Percentil estimado con badge de color
  - Botón limpiar todas, botón eliminar individual
- [x] **3.7** Exportar gráfico a PNG
  - Botón "Exportar gráfico" captura chart + leyenda
- [ ] **3.8** Tests (pendiente)

---

## FASE 4 — Pulido y Detalles

- [ ] **4.1** PWA
  - Probar manifest.json
  - Verificar service worker registrado
  - Testear install prompt en mobile
- [ ] **4.2** Responsive final
  - Testear en 360px, 768px, 1024px, 1440px
  - Ajustar breakpoints si es necesario
- [ ] **4.3** Animaciones y micro-interacciones
  - Transiciones en cards (hover)
  - FadeIn al cambiar de página
  - Transiciones suaves en cálculos (cambio de valores)
- [ ] **4.4** Meta tags y SEO
  - title, description, og:image en `index.html`
  - theme-color, apple-mobile-web-app-capable
- [ ] **4.5** Auditoría final
  - Lighthouse (performance, accessibility, PWA)
  - Cobertura de tests
  - Prueba manual en mobile real

---

## FASE 5 — Deploy (Cloudflare Pages)

- [ ] **5.1** Probar build local
  - `yarn build`
  - Verificar que `dist/` está correcto
  - Probar con `npx serve dist`
- [ ] **5.2** Conectar repo a Cloudflare Pages
  - Desde dashboard CF Pages → Create project → Connect Git
  - Build command: `yarn build`
  - Output directory: `dist`
- [ ] **5.3** Post-deploy
  - Verificar SPA routing funciona (navegación directa a rutas)
  - Verificar PWA funciona desde el dominio
  - Test mobile real

---

## Leyenda

```
✅ Completado
🔄 En progreso
🔲 Pendiente
❌ Bloqueado
```
