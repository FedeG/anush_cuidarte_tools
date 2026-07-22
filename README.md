# Anush Cuidarte Tools

App PWA con herramientas para maternidad, lactancia y crianza. Construida con React + Vite + Bootstrap 5.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + Vite 8 |
| Routing | react-router-dom (HashRouter) |
| Estilos | Bootstrap 5 + CSS Custom Properties |
| Charts | Recharts |
| Export | html2canvas |
| PWA | vite-plugin-pwa |
| Paquete | yarn |

## Tools incluidas

- **Calculadora de Capacidad Gástrica** — calcula capacidad gástrica del bebé y distribución entre leche materna y fórmula
- **Curvas de Crecimiento** — visualiza curvas percentilares OMS (P3–P97) y registra mediciones del bebé

## Comandos

```bash
# Desarrollo
yarn dev

# Build producción
yarn build

# Preview local del build
npx serve dist

# Deploy a GitHub Pages
yarn deploy
```

## Deploy

### GitHub Pages (testing)

El repo está configurado para deploy manual a `gh-pages`:

```bash
yarn build && npx gh-pages -d dist
```

Luego en GitHub → Settings → Pages → Source: `gh-pages` branch.

### Cloudflare Pages (producción)

Conectar repo desde el dashboard de Cloudflare:
- Build command: `yarn build`
- Output directory: `dist`

Requiere archivo `public/_redirects` para SPA routing:
```
/* /index.html 200
```

## Estructura

```
src/
├── components/     # Header, Footer, Layout, ToolCard
├── data/           # tools.js, who-growth.js (datos OMS)
├── hooks/          # useGastricCalc, useExport
├── pages/          # Home, GastricCapacity, GrowthCharts
├── styles/         # anush-variables.css, global.css
├── App.jsx         # Routes
└── main.jsx        # Entry point (HashRouter)
```

## Diseño

Basado en la identidad visual de [anushcuidarte.com.ar](https://anushcuidarte.com.ar) — paleta cálida, tipografía Montserrat, formas redondeadas y gradientes suaves.
