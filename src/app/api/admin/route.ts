import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface AdminResponse {
  total_participantes: number
  total_respuestas: number
  respuestas_por_formulario: Record<string, number>
  avg_puntuacion_disposicion: number
  participantes: Array<{
    id: string
    nombre: string
    email: string
    departamento: string | null
    rol: string | null
    antiguedad: string | null
    created_at: string
    respuestas: Array<{
      id: string
      formulario: string
      puntuacion_total: number | null
      created_at: string
      updated_at: string
    }>
    formularios_completados: number
  }>
  respuestas: Array<{
    id: string
    participante_id: string
    formulario: string
    datos: Record<string, unknown>
    puntuacion_total: number | null
    created_at: string
    updated_at: string
  }>
}

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get('password')

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    // Fetch all participantes
    const { data: participantes, error: participantesError } = await supabase
      .from('participantes')
      .select('*')
      .order('created_at', { ascending: false })

    if (participantesError) throw participantesError

    // Fetch all respuestas
    const { data: respuestas, error: respuestasError } = await supabase
      .from('respuestas')
      .select('*')
      .order('created_at', { ascending: false })

    if (respuestasError) throw respuestasError

    // Build respuestas por formulario
    const respuestas_por_formulario: Record<string, number> = {}
    let sum_disposicion = 0
    let count_disposicion = 0

    respuestas?.forEach((r) => {
      respuestas_por_formulario[r.formulario] = (respuestas_por_formulario[r.formulario] || 0) + 1

      // Calculate average for "disposicion-cambio"
      if (r.formulario === 'disposicion-cambio' && r.puntuacion_total !== null) {
        sum_disposicion += r.puntuacion_total
        count_disposicion += 1
      }
    })

    // Build participantes with their respuestas
    const participantesWithRespuestas = participantes?.map((p) => {
      const userRespuestas = respuestas?.filter((r) => r.participante_id === p.id) || []
      return {
        ...p,
        respuestas: userRespuestas.map((r) => ({
          id: r.id,
          formulario: r.formulario,
          puntuacion_total: r.puntuacion_total,
          created_at: r.created_at,
          updated_at: r.updated_at,
        })),
        formularios_completados: userRespuestas.length,
      }
    }) || []

    const avg_puntuacion_disposicion = count_disposicion > 0 ? sum_disposicion / count_disposicion : 0

    const response: AdminResponse = {
      total_participantes: participantes?.length || 0,
      total_respuestas: respuestas?.length || 0,
      respuestas_por_formulario,
      avg_puntuacion_disposicion: Math.round(avg_puntuacion_disposicion * 100) / 100,
      participantes: participantesWithRespuestas,
      respuestas: respuestas || [],
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
