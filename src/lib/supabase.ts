import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Participante = {
  id: string
  nombre: string
  email: string
  departamento: string | null
  rol: string | null
  antiguedad: string | null
  created_at: string
}

export type Respuesta = {
  id: string
  participante_id: string
  formulario: string
  datos: Record<string, unknown>
  puntuacion_total: number | null
  created_at: string
  updated_at: string
}
