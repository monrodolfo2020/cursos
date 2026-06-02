# Curso de Instrumentación y Automatización — Videos (motion graphics HTML)

Paquete autocontenido para Claude Code. Cada video es un archivo **HTML que se abre
directo en el navegador** — sin build, sin servidor, sin `npm install`. Usan React 18 +
Babel standalone vía CDN y se escalan solos a 1920×1080.

## Cómo está organizado

```
curso-automatizacion/
├── index.html                 ← menú maestro: enlaza los 4 módulos + el extra
├── manifest.json              ← mapa máquina-legible (módulos, clases, archivos, deps)
├── README.md                  ← este archivo
│
├── modulo-0-bienvenida/       ← Módulo 0 · tema AZUL INDUSTRIAL · 7 clases
│   ├── index.html             ← índice del módulo (enlaza sus clases)
│   ├── animations.jsx         ← motor de animación (copia local)
│   ├── video-lib.jsx, clase-lib.jsx, scenes-a.jsx, scenes-b.jsx   ← tema + escenas
│   ├── clase2.jsx … clase7.jsx
│   └── Video Módulo 0.html, Clase 2 … 7 - *.html
│
├── modulo-1-fundamentos/      ← Módulo 1 · tema BLUEPRINT CLARO · 8 clases
│   ├── index.html, animations.jsx, m1-lib.jsx, m1c1.jsx … m1c8.jsx
│   └── Clase 1.1 … 1.8 - *.html
│
├── modulo-2-instrumentacion/  ← Módulo 2 · tema OSCURO TEAL · 10 clases
│   ├── index.html, animations.jsx, m2-dark.jsx, m2c1.jsx … m2c10.jsx
│   └── Clase 2.1 … 2.10 - *.html
│
├── modulo-3-sensores/         ← Módulo 3 · tema NEGRO + VERDE ROLEX + ROJO · 12 clases
│   ├── index.html, animations.jsx, m3-dark.jsx, m3c1.jsx … m3c12.jsx
│   └── Clase 3.1 … 3.12 - *.html
│
└── extra-ia-vida-real/        ← Video independiente (no es parte del temario)
    ├── index.html, animations.jsx, ia-lib.jsx, ia-scenes-a.jsx, ia-scenes-b.jsx
```

## Regla clave: cada módulo es autocontenido

Cada carpeta de módulo lleva **su propia copia** de `animations.jsx` y de sus archivos de
tema/escenas. Por eso puedes **abrir, mover o desplegar un módulo por separado** sin tocar
los demás. No hay dependencias compartidas entre carpetas.

## Cómo cargar / diferenciar cada curso

- **Diferenciar por módulo:** el número de la clase codifica el módulo →
  `Clase 1.x` = Módulo 1, `Clase 2.x` = Módulo 2, `Clase 3.x` = Módulo 3.
  (El Módulo 0 usa `Video Módulo 0.html` + `Clase 2..7 - *.html`.)
- **Cargar un módulo:** abre `modulo-N-*/index.html` → lista todas sus clases.
- **Cargar todo:** abre el `index.html` raíz → menú con los 4 módulos + el extra.
- **Programático:** `manifest.json` lista cada módulo con su carpeta, tema, e
  `lessons[]` (archivo HTML + título + dependencias `.jsx` exactas).

## Anatomía de un video (para editarlo)

Cada `Clase *.html` carga, en orden:
1. React 18 + ReactDOM + Babel standalone (CDN, con integrity hash).
2. `animations.jsx` — expone `Stage`, `useTime()`, `Easing`, `clamp` en `window`.
3. El **tema del módulo** (`m1-lib.jsx`, `m2-dark.jsx`, `m3-dark.jsx`, o
   `video-lib.jsx`+`clase-lib.jsx`) — tokens de color, tipografía y componentes
   reutilizables (`TitleCard`, `Cap`, `Closing`, iconos…).
4. El archivo de **escenas de esa clase** (`m3c6.jsx`, etc.) — define `SCENES_*`,
   un array de `{ C: Componente, dur, label }`.
5. Un bloque inline que monta `<ClassShell* scenes={SCENES_*} .../>`.

Para cambiar el contenido de una clase, edita su archivo de escenas `*.jsx`.
Para cambiar el look de todo un módulo, edita su archivo de tema.

## Notas técnicas

- **Reproductor:** barra de progreso, play/pausa, ←/→ para avanzar, espacio, `0` reinicia.
  La posición se guarda en `localStorage` con una clave única por clase (p. ej. `m3c6`).
- **Sin conexión:** requieren internet la primera vez (CDN de React/Babel y Google Fonts).
  Para uso 100% offline, hay que inlinear esos recursos (no incluido aquí).
- **Resolución:** lienzo fijo 1920×1080 que se letterboxea a cualquier viewport.
- **Idioma:** español, con términos técnicos en inglés (SCADA, PLC, PID, 4-20 mA…).
