# Magic Marble Foundation

> Mobilize Empathy For All Species And The World We Share.

Sitio web institucional de **Magic Marble Foundation**, una organización sin fines de lucro enfocada en el bienestar animal, activismo ambiental y construcción de comunidad. Este proyecto funciona como plataforma pública informativa, portal de donaciones y suscripciones, panel de administración de usuarios, y vitrina de contenido editorial vía CMS headless.

---

## Tech Stack

| Capa | Tecnología |
|---|---|
| **Framework** | Next.js 16.2.7 (App Router) |
| **Lenguaje** | TypeScript 5 |
| **UI** | React 19.2, CSS Modules, shadcn/ui |
| **Forms y validación** | react-hook-form + zod |
| **Autenticación** | Next-Auth v5 (Credentials, Google, Facebook) + bcryptjs |
| **Base de datos** | PostgreSQL + Prisma ORM 5.17 |
| **CMS Headless** | Sanity.io (next-sanity, @portabletext/react) |
| **Pagos** | PayPal REST API (billing plans, subscriptions) + Venmo |
| **Email** | Resend (verificación, password reset, notificaciones) |
| **APIs externas** | Google Drive API (documentos financieros), Google OAuth |
| **Tipografía** | Open Sans via `next/font` |
| **Gráficos** | recharts |
| **Íconos** | react-icons |

---

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   #   Páginas públicas de autenticación
│   │   ├── login/                #     Inicio de sesión
│   │   ├── register/             #     Registro de usuario
│   │   ├── new-verification/     #     Verificación de email
│   │   ├── reset-password/       #     Solicitud de reset
│   │   └── new-password/         #     Establecer nueva contraseña
│   ├── (protected)/              #   Páginas protegidas (requieren auth)
│   │   ├── profile/              #     Perfil del usuario
│   │   ├── settings/             #     Preferencias
│   │   └── details/[id]/         #     Detalle de usuario (admin)
│   ├── about/                    #   Página "Sobre nosotros"
│   ├── api/                      #   API routes internas
│   │   ├── auth/[...nextauth]/   #     NextAuth handler
│   │   ├── create-plan/          #     Crear plan PayPal
│   │   ├── create-subscription/  #     Crear suscripción PayPal
│   │   ├── cancel-subscription/  #     Cancelar suscripción PayPal
│   │   ├── query-all-plans/      #     Listar planes PayPal
│   │   ├── documents/            #     Documentos Google Drive
│   │   └── AccessToken.ts        #     Helper OAuth PayPal
│   ├── diaries/                  #   Diarios / blog
│   ├── donations/                #   Donaciones
│   ├── financials/               #   Financieros (documentos)
│   ├── gallery/                  #   Galería de imágenes
│   ├── getinvolved/              #   Cómo involucrarse
│   ├── grantees/                 #   Beneficiarios
│   ├── newsletter/               #   Newsletter
│   ├── projects/                 #   Proyectos
│   ├── lib/                      #   Utilidades del lado del servidor
│   │   ├── auth.ts               #     currentUser / currentRole
│   │   ├── sessions.ts           #     Session helpers
│   │   ├── mail.ts               #     Envío de emails (Resend)
│   │   ├── tokens.ts             #     Generación de tokens
│   │   ├── apiCalls.ts           #     Cliente API del lado cliente
│   │   └── imageLoader.ts        #     Loader custom de imágenes
├── components/                   # Componentes React
│   ├── auth/                     #   LoginCard, RegisterCard, ResetForm, etc.
│   ├── payments/                 #   PayPal y Venmo buttons
│   ├── emailTemplates/           #   Templates de email HTML
│   ├── Navbar/                   #   Navegación
│   ├── Footer/                   #   Pie de página
│   ├── Carousels/                #   Carruseles de imágenes
│   ├── Gallery/                  #   Componentes de galería
│   ├── Projects/                 #   Componentes de proyectos
│   ├── Diaries/                  #   Componentes de diarios
│   ├── PaddyField/               #   Portal PaddyField
│   ├── Profile/                  #   Componentes de perfil
│   ├── SettingsTabs/             #   Tabs de configuración
│   ├── Badges/                   #   Badges informativos
│   ├── DonationButton/           #   Botón de donación
│   ├── Newsletter/               #   Suscripción newsletter
│   ├── ui/                       #   Componentes base shadcn/ui
│   └── ...                       #   Otros componentes
├── actions/                      # Server Actions
│   ├── login.ts                  #   Login
│   ├── register.ts               #   Registro
│   ├── logout.ts                 #   Logout
│   ├── reset.ts                  #   Reset password request
│   ├── new-password.ts           #   Nueva contraseña
│   ├── new-verification.ts       #   Verificación de email
│   ├── update.ts                 #   Actualizar perfil
│   ├── updateRole.ts             #   Actualizar rol (admin)
│   ├── delete.ts                 #   Eliminar usuario (admin)
│   ├── unsubscribe.ts            #   Desuscribirse newsletter
│   ├── sentDiaries.ts            #   Enviar diaries por email
│   ├── searchQuery.ts            #   Búsqueda de usuarios
│   ├── searchQueryDonators.ts    #   Búsqueda de donadores
│   ├── resendVerification.ts     #   Reenviar verificación
│   └── signInGoogle.ts           #   Sign in con Google
├── data/                         # Data access layer
│   ├── user.ts                   #   Queries de usuario
│   ├── verificationToken.ts      #   Queries de tokens de verificación
│   └── password-reset-token.ts   #   Queries de tokens de reset
├── schemas/                      # Validación Zod
│   └── index.ts                  #   loginSchema, registerSchema, resetSchema, etc.
├── utils/                        # Utilidades
│   ├── groqQueries.ts            #   Queries GROQ para Sanity
│   ├── badges.ts                 #   Datos de badges
│   ├── carrouselImages.ts        #   Datos de imágenes de carrusel
│   ├── chartsData.ts             #   Datos de gráficos
│   ├── countries.ts              #   Lista de países
│   ├── formatDate.ts             #   Formateo de fechas
│   └── menuItems.ts              #   Items del menú
├── hooks/                        # Custom hooks
│   ├── useClickOutside.ts        #   Detectar click fuera de elemento
│   └── useIsVisible.ts           #   Detectar visibilidad en viewport
├── prisma/                       # Prisma ORM
│   └── schema.prisma             #   Modelos de base de datos
├── types/                        # Tipos compartidos
│   └── types.ts
├── client.ts                     # Cliente Sanity + funciones de datos
├── clientTypes.ts                # Tipos de datos de Sanity
├── auth.config.ts                # Configuración de NextAuth
├── auth.ts                       # Configuración de NextAuth + callbacks
├── routes.ts                     # Definición de rutas públicas y de auth
├── db.ts                         # Singleton de PrismaClient
└── proxy.ts                      # Middleware de autenticación (NextAuth middleware)
```

---

## Architecture

### Authentication Flow

```
Credentials / Google / Facebook
        │
        ▼
    NextAuth v5
        │
        ├── PrismaAdapter → PostgreSQL (users, accounts, tokens)
        ├── JWT Strategy
        │
        └── Middleware (proxy.ts) → protege rutas /profile, /settings, etc.
```

- **3 providers**: Credentials (email + password con bcryptjs), Google OAuth, Facebook OAuth.
- **JWT Sessions**: Las sesiones se manejan via JWT. El rol del usuario (ADMIN/USER) se almacena en el token.
- **Email Verification**: Los usuarios registrados con credentials deben verificar su email antes de iniciar sesión.
- **Password Reset**: Flujo completo con tokens de 1 hora de expiración.

### Data Flow (CMS)

```
Sanity.io (headless CMS)
        │
        ▼
  next-sanity (client.ts)
        │
        ├── GROQ queries (utils/groqQueries.ts)
        ├── React cache() → memoización
        │
        ▼
  Server Components / Pages
        │
        ▼
  @portabletext/react → renderizado de contenido rich text
```

### Payments Flow

```
User
  │
  ├── One-time donation → PayPal / Venmo (link externo)
  │
  └── Subscription (Sponsor)
        │
        ├── api/create-plan → PayPal (crea producto + plan)
        ├── api/create-subscription → PayPal (inicia suscripción)
        └── api/cancel-subscription → PayPal (suspende suscripción)
```

---

## Database Models (PostgreSQL + Prisma)

| Model | Descripción |
|---|---|
| **User** | Usuarios registrados (email, nombre, dirección, rol, suscripción newsletter) |
| **Account** | Cuentas OAuth vinculadas (NextAuth) |
| **VerificationToken** | Tokens de verificación de email |
| **PasswordResetToken** | Tokens de reset de contraseña |
| **Adoption** | Solicitudes de adopción de animales |
| **Donation** | Registro de donaciones |
| **Sponsor** | Registro de patrocinadores/suscripciones |

---

## CMS Content Types (Sanity.io)

| Type | Descripción |
|---|---|
| `chimp` | Sección CHIMP (blog posts con enlaces) |
| `dairies` | Diarios / blog principal con contenido rich text y autor |
| `projects` | Proyectos de la fundación |
| `board` | Miembros del directorio |
| `gallery` | Galería de imágenes |
| `grantees` | Beneficiarios |
| `portalPaddyField` | Portal PaddyField (multi-imagen, YouTube, rich text) |
| `recipes` | Recetas (multi-imagen, YouTube, rich text) |

---

## API Routes

| Route | Método | Descripción |
|---|---|---|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handler |
| `/api/create-plan` | POST | Crea un producto y plan de billing en PayPal |
| `/api/create-subscription` | POST | Inicia una suscripción PayPal |
| `/api/cancel-subscription` | POST | Suspende una suscripción PayPal |
| `/api/query-all-plans` | GET | Lista todos los planes PayPal |
| `/api/query-all-plans/[id]` | GET | Obtiene un plan PayPal por ID |
| `/api/documents` | GET | Obtiene documentos financieros desde Google Drive |

---

## Environment Variables

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | URL de conexión a PostgreSQL |
| `DATABASE_URL_UNPOOLED` | URL sin pool (para Prisma directo) |
| `AUTH_SECRET` | Secreto para NextAuth |
| `AUTH_GOOGLE_ID` | Client ID de Google OAuth |
| `AUTH_GOOGLE_SECRET` | Client Secret de Google OAuth |
| `AUTH_FACEBOOK_ID` | App ID de Facebook OAuth |
| `AUTH_FACEBOOK_SECRET` | App Secret de Facebook OAuth |
| `API_ID` | Project ID de Sanity.io |
| `API_TOKEN` | Token de API de Sanity.io |
| `RESEND_API_KEY` | API Key de Resend |
| `RESEND_EMAIL` | Email desde el cual se envían los correos |
| `PAYPAL_CLIENT_ID` | Client ID de PayPal REST API |
| `PAYPAL_APP_SECRET` | Secret de PayPal REST API |
| `PAYPAL_API_URL` | URL base de PayPal API (sandbox/live) |
| `NEXT_PUBLIC_APP_URL` | URL pública de la aplicación |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Email de service account de Google |
| `GOOGLE_PRIVATE_KEY` | Private key del service account de Google |
| `GOOGLE_DRIVE_FOLDER_ID` | ID del folder raíz en Google Drive |

---

## Getting Started

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd magic-marble-foundation-2026

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con los valores correspondientes

# 4. Generar cliente Prisma
npx prisma generate

# 5. Correr migraciones
npx prisma migrate dev

# 6. Iniciar servidor de desarrollo
npm run dev
```

---

## Available Scripts

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run postinstall` | Genera cliente Prisma automáticamente |

---

## License

Proyecto privado de **Magic Marble Foundation**.
