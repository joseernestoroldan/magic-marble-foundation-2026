# Prisma Upgrade Plan: v5.22.0 → v7.8.0

**Current:** Prisma 5.22.0, @auth/prisma-adapter 2.4.1  
**Target:** Prisma 7.8.0, @auth/prisma-adapter latest  
**Database:** PostgreSQL (Neon)  
**Project:** Next.js 16 App Router with NextAuth v5

---

## Step 1: Preparation

1. Verify Node.js >= 20.19 (
ode -v)
2. Commit all current changes
3. Backup the Neon PostgreSQL database
4. Since no prisma/migrations/ folder exists (schema managed via prisma db push), ensure DB backup is solid before any schema push

---

## Step 2: Update @auth/prisma-adapter first

Bump independently since it supports Prisma 5/6/7:

- Update @auth/prisma-adapter from ^2.4.1 to ^2.11.1
- Run 
pm install
- Run 
pm run build and test auth flows

---

## Step 3: Upgrade to Prisma 6 (incremental intermediate step)

1. Update packages:
   - prisma → ^6.0.0
   - @prisma/client → ^6.0.0
2. 
pm install
3. 
px prisma generate
4. Test the app thoroughly (auth, donations, adoptions, sponsors)

---

## Step 4: Upgrade to Prisma 7

### 4a. Package updates

Add new dependencies:
- @prisma/adapter-pg (required PostgreSQL adapter)
- pg (PostgreSQL driver)
- @types/pg (dev dependency)
- dotenv (for env loading in config)

Update existing:
- prisma → ^7.8.0
- @prisma/client → ^7.8.0

### 4b. Schema changes (prisma/schema.prisma)

Remove url and directUrl from datasource db:

**Before:**
`prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL_UNPOOLED")
}
`

**After:**
`prisma
datasource db {
  provider = "postgresql"
}
`

### 4c. Create prisma.config.ts (project root)

`	s
import { defineConfig, env } from "prisma/config"
import dotenv from "dotenv"

dotenv.config()

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
    directUrl: env("DATABASE_URL_UNPOOLED"),
  },
})
`

### 4d. Update db.ts (PrismaClient instantiation)

**Before:**
`	s
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db
`

**After:**
`	s
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"

declare global {
  var prisma: PrismaClient | undefined
}

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

export const db = globalThis.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalThis.prisma = db
`

### 4e. Update next.config.mjs

Add to prevent Turbopack bundling issues:

`js
const nextConfig = {
  // ... existing config
  serverExternalPackages: ['@prisma/client', 'pg'],
}
`

---

## Step 5: Verify & Test

1. 
px prisma validate — check schema is valid
2. 
px prisma generate — regenerate client
3. 
px prisma db push — sync schema to DB (review diff carefully)
4. 
pm run build — ensure app compiles
5. Test all features:
   - Authentication (login, register, OAuth)
   - Donation form submissions
   - Adoption form submissions
   - Sponsor form submissions
6. Run lint/typecheck scripts

---

## Key Breaking Changes in Prisma 7

| Change | Impact |
|---|---|
| **Driver adapters required** | 
ew PrismaClient() no longer works; must pass dapter in constructor |
| **URL moved from schema** | datasource.url removed from schema.prisma; goes in prisma.config.ts |
| **ESM-first** | May need "type": "module" or explicit import adjustments |
| **WASM query engine** | Replaces Rust binary; better cold-start, different perf characteristics |
| **Node 20.19+ required** | Verify version before upgrading |
| **Generator output path** | May need explicit output in generator block |

---

## Rollback Plan

If issues arise:
1. git checkout -- . to revert file changes
2. 
pm install to restore node_modules from lockfile
3. If DB schema was pushed, use 
px prisma db push --force-reset with the backup

---

## Notes

- No prisma/migrations/ directory exists — the project uses prisma db push for schema management
- The .env file contains live secrets; ensure it's backed up and never committed
- @auth/prisma-adapter 2.11.x supports Prisma v7; upgrade tested independently in Step 2
