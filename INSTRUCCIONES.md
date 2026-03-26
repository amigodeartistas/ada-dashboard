# 🚀 GUÍA DE INSTALACIÓN — ADA Dashboard

Seguí estos pasos en orden. No necesitás saber programar.

---

## PASO 1 — Crear cuenta en Supabase (base de datos)

1. Entrá a **https://supabase.com** y creá una cuenta gratis
2. Hacé clic en **"New Project"**
3. Poné de nombre: `ada-dashboard`
4. Elegí una contraseña segura para la base de datos (guardála en algún lado)
5. Elegí la región más cercana (South America si está disponible)
6. Esperá ~2 minutos a que se cree el proyecto

---

## PASO 2 — Crear las tablas

1. En tu proyecto de Supabase, andá a **SQL Editor** (ícono de código en el menú izquierdo)
2. Hacé clic en **"New Query"**
3. Copiá todo el contenido del archivo `supabase_setup.sql` y pegalo ahí
4. Hacé clic en **"Run"** (botón verde)
5. Deberías ver "Success" — esto crea las tablas y carga los datos iniciales

---

## PASO 3 — Obtener tus credenciales

1. En Supabase, andá a **Settings** (engranaje) → **API**
2. Copiá estos dos valores:
   - **Project URL** → algo como `https://abcdef.supabase.co`
   - **anon public key** → una clave larga que empieza con `eyJ...`

3. Abrí el archivo `src/supabase.js` y reemplazá:
   ```js
   const SUPABASE_URL = 'https://TU_PROJECT_ID.supabase.co'  // ← pegá tu Project URL
   const SUPABASE_ANON_KEY = 'TU_ANON_KEY'                   // ← pegá tu anon key
   ```

---

## PASO 4 — Subir el código a GitHub

1. Entrá a **https://github.com** y creá una cuenta si no tenés
2. Creá un repositorio nuevo llamado `ada-dashboard` (privado si querés)
3. Subí todos los archivos de esta carpeta al repositorio

   **Si no sabés usar Git**, usá la opción "Upload files" en GitHub:
   - Abrí el repositorio
   - Arrastrá todos los archivos y carpetas
   - Hacé clic en "Commit changes"

---

## PASO 5 — Deploy en Vercel (publicar la app)

1. Entrá a **https://vercel.com** y creá una cuenta (podés entrar con GitHub)
2. Hacé clic en **"New Project"**
3. Importá el repositorio `ada-dashboard` de GitHub
4. Vercel detecta automáticamente que es un proyecto Vite — no toques nada
5. Hacé clic en **"Deploy"**
6. En ~1 minuto tenés una URL pública, algo como `ada-dashboard.vercel.app`

---

## PASO 6 — Invitar integrantes

1. Andá a tu app en la URL de Vercel
2. Cada integrante entra a la URL y se registra con su email
3. ¡Listo! Todos ven el mismo dashboard en tiempo real

---

## PASO 7 — Usar el asistente IA (opcional)

El chat con Claude está en la pestaña **IA** del dashboard.
Para que funcione necesitás una API key de Anthropic:

1. Entrá a **https://console.anthropic.com**
2. Creá una cuenta y generá una API key
3. Agregala en Vercel: **Settings → Environment Variables**
   - Nombre: `VITE_ANTHROPIC_KEY`
   - Valor: tu API key

> 💡 El costo es muy bajo — para un equipo chico, menos de $5/mes.

---

## ¿NECESITÁS AYUDA?

Escribile a Claude en el chat con cualquier error o paso que no entiendas,
y te guía exactamente qué hacer.
