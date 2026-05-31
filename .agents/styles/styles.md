# Magic Marble Foundation — Style Guide


## Infobar Component

The background color must be

## Principios de diseño
- Minimalista y elegante
- Consistencia visual en toda la aplicación
- CSS Modules exclusivamente (sin Tailwind utility classes en JSX)
- Animaciones CSS-only (sin JS/TS para motion)
- Dirección estética: "Marble Polished" — superficies limpias con profundidad sutil, bordes refinados, detalles que brillan sin ser ostentosos

## Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#0891b2` (cyan-600) | Botones primarios, links, focus rings, íconos, headings de bienvenida |
| `--color-primary-light` | `#a5f3fc` (cyan-200) | Fondo de mensajes de confirmación |
| `--color-primary-dark` | `#0e7490` (cyan-700) | Gradient complementario en botones |
| `--color-text-label` | `#374151` (gray-700) | Labels de formularios |
| `--color-text-body` | `#6b7280` (gray-500) | Texto de cuerpo, placeholders, headings de login |
| `--color-text-subtle` | `#9ca3af` (gray-400) | Texto secundario muy suave |
| `--color-border` | `#e5e7eb` (gray-200) | Bordes de inputs, cards, separadores |
| `--color-border-strong` | `#d1d5db` (gray-300) | Bordes de separadores |
| `--color-error-bg` | `#fca5a5` (red-300) | Fondo de mensajes de error |
| `--color-error-text` | `#dc2626` (red-600) | Texto de error |
| `--color-error-field` | `#ef4444` (red-500) | Texto de error en campos individuales |
| `--color-white` | `#ffffff` | Fondos de cards y componentes |
| `--color-hover-bg` | `#fafafa` | Hover de inputs |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)` | Sombra de cards |
| `--shadow-button` | `0 2px 4px rgba(8,145,178,0.3)` | Sombra de botón primario |
| `--shadow-button-hover` | `0 4px 8px rgba(8,145,178,0.35)` | Sombra de botón en hover |
| `--shadow-dropdown` | `0 8px 24px rgba(0,0,0,0.12)` | Sombra de dropdowns |

## Border radius
- Uniforme: `5px` en inputs, botones, cards, dropdowns, mensajes
- Mensajes con barra lateral: `0 5px 5px 0` (solo esquinas derechas)

## Tipografía
- Font: Open Sans (vía `next/font/google`)
- Jerarquía:
  - Headings de bienvenida: `1.25rem` (20px), bold 700, color cyan-600 `#0891b2`
  - Botones primarios: medium 500
  - Labels: `0.875rem`, medium 500, color gray-700 `#374151`
  - Body/placeholders: `0.875rem`, regular 400, color gray-500 `#6b7280`
  - Mensajes de error/confirmación: `0.875rem`
  - Links: color cyan-600 `#0891b2`, underline

## Animaciones

| Nombre | Propiedades | Duración | Uso |
|---|---|---|---|
| `fadeIn` | opacity 0→1 | 0.3s | Mensajes de error/éxito/confirmación |
| `fadeUp` | opacity 0→1 + translateY(8px)→0 | 0.5s | Cards y contenedores al montar |
| `fadeInPro` | opacity 0→1 + translateY(10px)→0 | 0.6s | Secciones de formulario en página |
| `spin` | rotate 0→360° | 1s linear infinite | Spinners de carga |

### Stagger reveal
Los hijos directos de las cards aparecen secuencialmente con `animation-delay` progresivo:
- `> *` (todos): `animation: fadeUp 0.5s ease both`
- `:nth-child(1)`: delay 0.1s
- `:nth-child(2)`: delay 0.2s
- `:nth-child(3)`: delay 0.3s
- `:nth-child(4)`: delay 0.4s
- `:nth-child(5)`: delay 0.5s

### Hover states
- Botón primario: `translateY(-1px)` + `box-shadow` más intenso (0.25s)
- Botón primario active: `translateY(0)`
- Input: `background-color: #fafafa` (0.2s)
- Botón Google: `border-color: #0891b2` + `box-shadow` (0.25s)
- Checkbox: `transform: scale(1.1)` (0.2s)

### Focus states
- Inputs: `border-color: #0891b2` + `box-shadow: 0 0 0 2px rgba(8,145,178,0.15)` (0.25s)
- Trigger button: mismo estilo que inputs
- Search input: mismo estilo que inputs

## Cards
- `box-shadow`: `0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)`
- `padding`: 2rem
- `border-radius`: 5px
- `background-color`: white
- Spacing entre hijos: `> * + * { margin-top: 1.5rem }`

## Separator
- `border-top`: gradiente horizontal `transparent → #d1d5db → transparent`
- Label centrado con background blanco, px 1rem, color gray-400 `#9ca3af`, weight 500

## Mensajes de estado (FormError, FormConfirmation)
- Barra lateral izquierda de 3px del color del mensaje
- `border-radius: 0 5px 5px 0`

| Tipo | Color barra | bg | text |
|---|---|---|---|
| Error | `#dc2626` | `#fca5a5` | `#dc2626` |
| Confirmación | `#0891b2` | `#a5f3fc` | `#0891b2` |

## FormInput
- Hover: `background-color: #fafafa`
- Focus: borde cyan + `box-shadow: 0 0 0 2px rgba(8,145,178,0.15)`
- Disabled: opacity 0.5, cursor not-allowed
- Transiciones: 0.25s ease

## Botones primarios
- `background: linear-gradient(135deg, #0891b2, #0e7490)`
- `box-shadow: 0 2px 4px rgba(8,145,178,0.3)`
- Hover: `translateY(-1px)`, shadow más intenso
- Active: `translateY(0)`
- Disabled: opacity 0.5, cursor not-allowed, shadow none

## Botón Google
- `box-shadow: 0 1px 2px rgba(0,0,0,0.06)`
- Hover: `border-color: #0891b2`, `box-shadow: 0 2px 6px rgba(0,0,0,0.1)`

## Custom Checkbox
- Tamaño: 18px × 18px
- Border: 2px solid `#d1d5db`, border-radius 5px
- Checked: background cyan-600, border cyan-600
- Checkmark: pseudo-elemento `::after` con `transform: scale(0)→scale(1)` en `:checked`
- Transición: 0.2s

## Fondo de página (auth pages)
- `background: radial-gradient(ellipse at 20% 50%, rgba(8,145,178,0.03) 0%, transparent 50%)`
- Mantiene fondo blanco dominante

## Convenciones de CSS Modules
- Nombre del archivo: `Componente.module.css` (mismo nombre que el .tsx)
- Ubicación: misma carpeta que el .tsx
- Naming: camelCase para las clases
- No usar `@apply` ni dependencias de Tailwind dentro de los módulos

## Responsive breakpoints
- `sm: 640px` — usado para filas de formularios (flex column → row)
- `lg: 1024px` — usado para mostrar sección de imagen en pages auth

## Convenciones de nomenclatura para clases CSS
- `.card` / `.wrapper` — contenedor raíz del componente
- `.title` — headings de bienvenida
- `.label` — labels de formulario
- `.input` / `.checkbox` / `.trigger` — elementos de formulario
- `.submitButton` / `.googleButton` — botones
- `.error` / `.success` / `.confirmation` — mensajes de estado
- `.row` — contenedor flex row (con media query a column en mobile)
- `.rowEnd` — contenedor flex row con align-items: flex-end
- `.spinnerWrapper` / `.spinner` — indicadores de carga
