# 📦 Plan Completo de Actualización de Dependencias

**Proyecto:** Magic Marble Foundation 2026  
**Fecha:** 4 de mayo de 2026  
**Estado actual:** 36 vulnerabilidades (25 moderate, 11 high), 31 paquetes desactualizados

---

## 📊 Resumen del Estado Actual

| Métrica | Valor |
|---|---|
| Total dependencias | 1,552 (prod: 1,218 / dev: 245) |
| Paquetes desactualizados | 31 |
| Vulnerabilidades | 36 (25 moderate, 11 high) |
| Next.js | 15.5.12 → 16.2.4 disponible |
| React | 19.2.4 → 19.2.5 disponible |
| Prisma | 5.22.0 → 7.8.0 disponible |

---

## 🔴 Vulnerabilidades de Seguridad Detectadas

| Paquete | Severidad | Descripción |
|---|---|---|
| `next` | **HIGH** | HTTP request smuggling, disk cache DoS, Server Components DoS |
| `picomatch` | **HIGH** | Method Injection, ReDoS via extglob |
| `rollup` | **HIGH** | Arbitrary File Write via Path Traversal |
| `undici` | **HIGH** | WebSocket overflow, HTTP smuggling, CRLF injection |
| `vite` | **HIGH** | Path Traversal, `server.fs.deny` bypass, WebSocket file read |
| `postcss` | MODERATE | XSS via unescaped `</style>` |
| `minimatch` | MODERATE | ReDoS via nested extglobs |
| `uuid` | MODERATE | Missing buffer bounds check |
| `yaml` | MODERATE | Stack Overflow via deeply nested collections |

---

## 🏗️ Estrategia de Actualización por Fases

### FASE 0 — Preparación (antes de todo)

```bash
# 1. Crear rama de trabajo
git checkout -b chore/dependency-updates

# 2. Verificar que el proyecto compila correctamente
npm run build

# 3. Hacer backup del lock file
copy package-lock.json package-lock.backup.json
```

---

### FASE 1 — Parches y Minor Updates (Riesgo: 🟢 Bajo)

Actualizaciones dentro del rango semver actual. No requieren cambios de código.

| Paquete | Actual | Target | Tipo |
|---|---|---|---|
| `@auth/prisma-adapter` | 2.11.1 | 2.11.2 | patch |
| `axios` | 1.13.5 | 1.16.0 | minor |
| `eslint-config-next` | 15.5.12 | 15.5.15 | patch |
| `next` | 15.5.12 | 15.5.15 | patch |
| `next-auth` | 5.0.0-beta.30 | 5.0.0-beta.31 | patch |
| `next-sanity` | 11.6.12 | 11.6.13 | patch |
| `postcss` | 8.5.6 | 8.5.14 | patch |
| `react` | 19.2.4 | 19.2.5 | patch |
| `react-dom` | 19.2.4 | 19.2.5 | patch |
| `react-hook-form` | 7.71.1 | 7.75.0 | minor |
| `react-icons` | 5.5.0 | 5.6.0 | minor |
| `use-debounce` | 10.1.0 | 10.1.1 | patch |
| `@types/node` | 20.19.33 | 20.19.39 | patch |

**Comando:**
```bash
npm update
```

**Verificación:**
```bash
npm run build
npm run dev
# Verificar que la app carga correctamente
```

---

### FASE 2 — Minor Updates fuera del rango semver (Riesgo: 🟡 Medio-Bajo)

Paquetes cuyo `wanted` coincide con `current` pero hay minor updates disponibles.

| Paquete | Actual | Target | Notas |
|---|---|---|---|
| `react-spinners` | 0.14.1 | 0.17.0 | Posibles cambios en props |
| `embla-carousel-autoplay` | 8.0.2 | latest | Verificar compatibilidad con embla-carousel-react |
| `embla-carousel-react` | 8.1.8 | latest | Mantener sincronizado con autoplay |
| `sonner` | 2.0.1 | latest | Verificar API de toasts |

**Comando:**
```bash
npm install react-spinners@latest embla-carousel-autoplay@latest embla-carousel-react@latest sonner@latest
```

---

### FASE 3 — Lucide React 0.x → 1.x (Riesgo: 🟡 Medio)

| Paquete | Actual | Target |
|---|---|---|
| `lucide-react` | 0.376.0 | 1.14.0 |

**Breaking changes:**
- Brand icons eliminados (Facebook, GitHub, etc.) — reemplazar con SVGs o `react-icons`
- Build UMD eliminado, solo ESM/CJS
- `aria-hidden="true"` por defecto en iconos

**Pasos:**
1. Buscar uso de brand icons en el código
2. Instalar: `npm install lucide-react@latest`
3. Verificar que todos los iconos importados existen en v1
4. Reemplazar brand icons faltantes con equivalentes de `react-icons`

---

### FASE 4 — Framer Motion → Motion (Riesgo: 🟡 Medio)

| Paquete | Actual | Target |
|---|---|---|
| `framer-motion` | 11.18.2 | `motion` 12.38.0 |

**Breaking changes:**
- Paquete renombrado de `framer-motion` a `motion`
- Imports cambian de `framer-motion` a `motion/react`
- Callbacks de gestos reciben `element` como primer argumento

**Pasos:**
```bash
npm uninstall framer-motion
npm install motion@latest
```

Luego buscar y reemplazar en todo el proyecto:
```diff
- import { motion, AnimatePresence } from "framer-motion";
+ import { motion, AnimatePresence } from "motion/react";
```

---

### FASE 5 — Recharts 2.x → 3.x (Riesgo: 🟡 Medio)

| Paquete | Actual | Target |
|---|---|---|
| `recharts` | 2.15.4 | 3.8.1 |

**Breaking changes:**
- `CategoricalChartState` eliminado — usar hooks nuevos
- `accessibilityLayer` ahora es `true` por defecto
- Dependencias `recharts-scale` y `react-smooth` removidas (internas ahora)
- Requiere React 16.8+, TypeScript 5+, Node 18+ ✅

**Pasos:**
1. Revisar componentes que usen `<Customized />` o accedan al estado interno
2. `npm install recharts@latest`
3. Probar todos los gráficos del dashboard

---

### FASE 6 — Zod 3.x → 4.x + @hookform/resolvers (Riesgo: 🟠 Medio-Alto)

| Paquete | Actual | Target |
|---|---|---|
| `zod` | 3.25.76 | 4.4.3 |
| `@hookform/resolvers` | 3.10.0 | 5.2.2 |

**Breaking changes Zod 4:**
- Validadores top-level: `z.email()`, `z.uuid()`, `z.url()` (los anteriores siguen funcionando temporalmente)
- `.default()` ahora cortocircuita parsing si input es `undefined` — usar `.prefault()` para comportamiento v3
- `.strict()` y `.passthrough()` deprecados → `z.strictObject()` y `z.looseObject()`
- `z.record()` requiere dos argumentos (key schema + value schema)

**Breaking changes @hookform/resolvers 5:**
- Requiere `react-hook-form@7.55.0+` ✅ (tenemos 7.75.0 tras Fase 1)
- Tipos ahora se infieren del schema (no definir manualmente)
- Soporte para Zod 3 y Zod 4 simultáneamente

**Pasos:**
1. Actualizar primero `@hookform/resolvers`: `npm install @hookform/resolvers@latest`
2. Actualizar Zod: `npm install zod@latest`
3. Revisar todos los schemas en `/schemas/` — buscar `.strict()`, `.passthrough()`, `.default()`
4. Actualizar imports si se desea usar la nueva API top-level
5. Probar todos los formularios

---

### FASE 7 — PayPal React v8 → v9 (Riesgo: 🟠 Medio-Alto)

| Paquete | Actual | Target |
|---|---|---|
| `@paypal/react-paypal-js` | 8.9.2 | 9.2.0 |

**Breaking changes:**
- Adopta PayPal V6 SDK
- `clientId` y `clientToken` son mutuamente exclusivos
- Nuevo hook `useEligibleMethods()` para métodos de pago disponibles
- Nuevos hooks de sesión para flujos de pago especializados

**Pasos:**
1. `npm install @paypal/react-paypal-js@latest`
2. Verificar configuración de `PayPalScriptProvider`
3. Probar flujo de checkout completo en sandbox
4. Adoptar nuevos hooks si aplica

---

### FASE 8 — Resend 3.x → 6.x (Riesgo: 🟠 Medio-Alto)

| Paquete | Actual | Target |
|---|---|---|
| `resend` | 3.5.0 | 6.12.2 |

**Pasos:**
1. Revisar changelog oficial en https://resend.com/changelog
2. `npm install resend@latest`
3. Verificar inicialización del cliente `Resend`
4. Verificar firma de `emails.send()` y estructura de respuesta
5. Probar envío de emails en desarrollo

---

### FASE 9 — googleapis (Riesgo: 🟡 Medio)

| Paquete | Actual | Target |
|---|---|---|
| `googleapis` | 144.0.0 | 171.4.0 |

**Pasos:**
1. `npm install googleapis@latest`
2. Verificar que las APIs de Google usadas sigan funcionando
3. Revisar archivos en `/googlekeys/` y uso de google APIs

---

### FASE 10 — uuid, bcryptjs, y utilidades menores (Riesgo: 🟡 Medio)

| Paquete | Actual | Target | Breaking changes |
|---|---|---|---|
| `uuid` | 10.0.0 | 14.0.0 | Buffer bounds check fix, posibles cambios API |
| `bcryptjs` | 2.4.3 | 3.0.3 | Verificar changelog |

**Pasos:**
```bash
npm install uuid@latest bcryptjs@latest
```

---

### FASE 11 — Prisma 5.x → 7.x (Riesgo: 🔴 Alto)

| Paquete | Actual | Target |
|---|---|---|
| `@prisma/client` | 5.22.0 | 7.8.0 |
| `prisma` (dev) | 5.22.0 | 7.8.0 |

> ⚠️ **IMPORTANTE:** Actualizar en dos pasos: primero a v6, luego a v7.

**Breaking changes v6:**
- Node.js 18.18.0+ requerido ✅
- TypeScript 5.1.0+ requerido ✅
- `Buffer` reemplazado por `Uint8Array` para campos `Bytes`
- Tablas many-to-many en PostgreSQL usan primary key en lugar de unique index

**Breaking changes v7:**
- Motor de consultas migrado de Rust a WASM (mejora rendimiento serverless)
- **Ya no genera el cliente dentro de `node_modules`** — DEBES especificar `output` en `schema.prisma`
- Carga automática de `.env` eliminada — usar `prisma.config.ts`

**Pasos:**
```bash
# Paso 1: Actualizar a v6
npm install @prisma/client@6 prisma@6
npx prisma generate
npx prisma migrate dev
npm run build
# Verificar que todo funcione

# Paso 2: Actualizar a v7
npm install @prisma/client@latest prisma@latest
```

Luego actualizar `schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../generated/client"
}
```

Crear `prisma.config.ts` para cargar `.env`.

Actualizar imports:
```diff
- import { PrismaClient } from "@prisma/client";
+ import { PrismaClient } from "../generated/client";
```

Actualizar `postinstall` en `package.json`:
```json
"postinstall": "prisma generate"
```

---

### FASE 12 — ESLint 8 → 10 + eslint-config-next (Riesgo: 🔴 Alto)

| Paquete | Actual | Target |
|---|---|---|
| `eslint` | 8.57.1 | 10.3.0 |
| `eslint-config-next` | 15.5.15 | 16.2.4 |

**Breaking changes:**
- `.eslintrc` eliminado completamente — migrar a `eslint.config.js` (Flat Config)
- `.eslintignore` ya no soportado
- Node.js ^20.19.0, ^22.13.0, o >=24.0.0 requerido
- `/* eslint-env */` ya no funciona
- Flags CLI `--env`, `--rulesdir` eliminados

**Pasos:**
1. Crear `eslint.config.js` con Flat Config
2. Migrar reglas de `.eslintrc.json` al nuevo formato
3. Mover patrones de ignore al config
4. `npm install eslint@latest eslint-config-next@latest`
5. Eliminar `.eslintrc.json`
6. Probar: `npx eslint .`

> 💡 Considerar hacer esta fase junto con la actualización a Next.js 16 (Fase 13).

---

### FASE 13 — Next.js 15 → 16 (Riesgo: 🔴 Alto)

| Paquete | Actual | Target |
|---|---|---|
| `next` | 15.5.15 | 16.2.4 |
| `eslint-config-next` | 15.5.15 | 16.2.4 |

**Breaking changes:**
- `params` y `searchParams` DEBEN ser `await`-eados (compatibilidad síncrona eliminada)
- **Turbopack** es el bundler por defecto (Webpack custom config no compatible directamente)
- `middleware.ts` renombrado a `proxy.ts` — las funciones proxy no pueden retornar body
- `next/legacy/image` eliminado
- `next lint` eliminado del core — usar ESLint CLI directo
- AMP eliminado completamente
- Parallel routes requieren `default.js` explícito
- Node.js 20.9+ requerido ✅

**Pasos:**
```bash
# 1. Usar codemod oficial
npx @next/codemod@latest upgrade latest

# 2. Actualizar dependencias
npm install next@latest eslint-config-next@latest

# 3. Renombrar middleware
# middleware.ts → proxy.ts (verificar lógica)

# 4. Verificar params/searchParams
# Buscar accesos síncronos y agregar await

# 5. Build y test
npm run build
```

---

### FASE 14 — Sanity v4 → v5 + next-sanity v12 (Riesgo: 🟡 Medio)

| Paquete | Actual | Target | Notas |
|---|---|---|---|
| `sanity` | 4.22.0 | 5.23.0 | Requiere React 19.2+ ✅ |
| `next-sanity` | 11.6.13 | 12.4.0 | Requiere Next.js 16 |

> ⚠️ Hacer DESPUÉS de actualizar Next.js a 16 (Fase 13).

**Breaking changes Sanity v5:**
- React 19.2+ requerido ✅ (tenemos 19.2.5)
- Schemas, plugins y customizaciones deben funcionar sin cambios

**Breaking changes next-sanity v12:**
- Diseñado para Next.js 16
- Verificar Visual Editing y Live Content

**Pasos:**
```bash
npm install sanity@latest next-sanity@latest @sanity/webhook@latest
```

---

### FASE 15 — TypeScript 5 → 6 (Riesgo: 🟡 Medio)

| Paquete | Actual | Target |
|---|---|---|
| `typescript` | 5.9.3 | 6.0.3 |
| `@types/node` | 20.19.39 | 25.6.0 |
| `@types/react` | ^19 | latest |
| `@types/react-dom` | ^19 | latest |

**Notas:**
- TS 6 es release puente hacia TS 7 (reescrito en Go)
- Opciones legacy deprecadas (usar `ignoreDeprecations: "6.0"` temporalmente)
- Targets antiguos (ES5) deprecados
- Defaults modernos (ES modules, targets es2025)

**Pasos:**
```bash
npm install typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest
npx tsc --noEmit
```

---

### FASE 16 — Tailwind CSS + tailwind-merge (⚠️ EVALUAR)

| Paquete | Actual | Target | Notas |
|---|---|---|---|
| `tailwindcss` | 3.4.19 | 4.2.4 | Cambio arquitectural masivo |
| `tailwind-merge` | 2.6.1 | 3.5.0 | Requiere Tailwind v4 |
| `tailwindcss-animate` | 1.0.7 | latest | Verificar compatibilidad con v4 |

> ⚠️ **RECOMENDACIÓN: POSPONER.** Tailwind v4 es una reescritura completa con cambios en configuración, plugins, y sistema de clases. `tailwind-merge` v3 REQUIERE Tailwind v4. Si te quedas en Tailwind v3, mantén `tailwind-merge` v2.6.x.

**Si decides actualizar:**
1. Leer guía oficial: https://tailwindcss.com/docs/upgrade-guide
2. Migrar `tailwind.config.ts` al nuevo formato
3. Verificar compatibilidad de `tailwindcss-animate`
4. Actualizar `tailwind-merge` a v3
5. Revisar todas las clases CSS del proyecto

---

## 📋 Orden de Ejecución Recomendado

```
Fase 0  → Preparación (backup, rama git)
Fase 1  → Parches semver (npm update)
Fase 2  → Minor updates seguros
Fase 3  → Lucide React v1
Fase 4  → Motion (framer-motion v12)
Fase 5  → Recharts v3
Fase 6  → Zod v4 + hookform/resolvers v5
Fase 7  → PayPal React v9
Fase 8  → Resend v6
Fase 9  → googleapis
Fase 10 → uuid, bcryptjs
Fase 11 → Prisma v7 (v5 → v6 → v7)
Fase 12 → ESLint 10 (flat config)
Fase 13 → Next.js 16
Fase 14 → Sanity v5 + next-sanity v12
Fase 15 → TypeScript 6
Fase 16 → Tailwind v4 (EVALUAR / POSPONER)
```

---

## ✅ Checklist Post-Actualización

- [ ] `npm run build` compila sin errores
- [ ] `npm run dev` inicia correctamente
- [ ] `npm audit` muestra 0 vulnerabilidades high/critical
- [ ] Formularios funcionan (Zod + react-hook-form)
- [ ] Checkout PayPal funciona en sandbox
- [ ] Envío de emails con Resend funciona
- [ ] Dashboard con gráficos Recharts renderiza correctamente
- [ ] Animaciones con Motion funcionan
- [ ] Sanity Studio carga y Visual Editing funciona
- [ ] Google APIs responden correctamente
- [ ] Auth (next-auth) login/logout funciona
- [ ] Prisma queries devuelven datos correctos
- [ ] ESLint pasa sin errores

---

## 🔗 Enlaces de Referencia

| Recurso | URL |
|---|---|
| Prisma v6 Upgrade | https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-6 |
| Prisma v7 Upgrade | https://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-7 |
| Next.js 16 Upgrade | https://nextjs.org/docs/app/guides/upgrading/version-16 |
| ESLint Flat Config | https://eslint.org/docs/latest/use/configure/migration-guide |
| Zod v4 Migration | https://zod.dev |
| Motion (framer-motion) | https://motion.dev/docs/migration |
| Recharts 3.0 Migration | https://github.com/recharts/recharts/wiki/3.0-migration-guide |
| Lucide React Migration | https://lucide.dev/guide/packages/lucide-react/migration |
| Tailwind v4 Upgrade | https://tailwindcss.com/docs/upgrade-guide |
| Sanity v5 Upgrade | https://www.sanity.io/docs/install-and-upgrade-sanity-studio |
| TypeScript 6.0 | https://devblogs.microsoft.com/typescript/ |
