# Assessment KGA-F — Fundacion Grupo Cajamar

Plataforma web de assessment para evaluar la implementacion de la metodologia **KGA-F** (Knowledge Governance & Agentic AI Framework) en la Fundacion Grupo Cajamar.

Desarrollado por **DCK Studios**.

## Stack Tecnologico

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Supabase** (PostgreSQL + API)
- **Recharts** (graficos en dashboard admin)
- **Vercel** (deploy)

## Funcionalidades

- Registro simple de participantes (nombre, email, departamento, rol)
- 6 formularios de assessment:
  1. Disposicion al Cambio (Likert 1-5, 10 items)
  2. Mapa de Colaboracion (red de conocimiento)
  3. Champions y Barreras (facilitadores/obstaculos)
  4. Evaluacion del Taller (satisfaccion)
  5. Mapeo de Procesos (documentacion de procesos)
  6. Auditoria de Sistemas (inventario + madurez DAMA + IA)
- Panel admin con dashboard, graficos y exportacion de datos
- Todas las respuestas se guardan en Supabase (PostgreSQL)

## Configuracion

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto
2. En el **SQL Editor**, ejecuta el contenido de `supabase/schema.sql`
3. Copia la **URL** y la **anon key** desde Settings > API

### 2. Variables de entorno

Crea un archivo `.env.local` basado en `.env.local.example`:

```
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
ADMIN_PASSWORD=tu-password-admin
```

### 3. Desarrollo local

```bash
npm install
npm run dev
```

La app estara disponible en `http://localhost:3000`.

### 4. Deploy en Vercel

1. Sube el repositorio a GitHub
2. Importa el proyecto en [vercel.com](https://vercel.com)
3. Configura las variables de entorno en Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_PASSWORD`
4. Deploy automatico

## Estructura del Proyecto

```
src/
  app/
    page.tsx                    # Landing page
    registro/page.tsx           # Registro de participantes
    formularios/
      page.tsx                  # Hub de formularios
      disposicion-cambio/       # Formulario Likert
      mapa-colaboracion/        # Red de conocimiento
      champions-barreras/       # Facilitadores/barreras
      evaluacion-taller/        # Evaluacion post-taller
      mapeo-procesos/           # Documentacion de procesos
      auditoria-sistemas/       # Inventario + madurez
    admin/page.tsx              # Dashboard admin
    api/
      participante/route.ts     # API registro
      respuestas/route.ts       # API formularios
      admin/route.ts            # API dashboard
  components/
    Header.tsx                  # Header reutilizable
    FormWrapper.tsx             # Wrapper para formularios
  lib/
    supabase.ts                 # Cliente Supabase
    formularios.ts              # Configuracion formularios
supabase/
  schema.sql                    # Esquema de base de datos
```

## Acceso Admin

Navega a `/admin` e introduce la contrasena configurada en `ADMIN_PASSWORD`.

El dashboard muestra: participantes, respuestas, tasa de completitud, puntuacion media, graficos por formulario y tabla de participantes con detalle.

## Licencia

Propiedad de DCK Studios. Todos los derechos reservados.
