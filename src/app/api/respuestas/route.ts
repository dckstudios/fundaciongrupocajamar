import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { participante_id, formulario, datos, puntuacion_total } = body;

    // Validate required fields
    if (!participante_id || !formulario) {
      return NextResponse.json(
        { error: 'participante_id y formulario son requeridos' },
        { status: 400 }
      );
    }

    // Check if respuesta already exists for this participante and formulario
    const { data: existingRespuesta } = await supabase
      .from('respuestas')
      .select('id')
      .eq('participante_id', participante_id)
      .eq('formulario', formulario)
      .single();

    let respuesta;

    if (existingRespuesta) {
      // Update existing respuesta
      const { data, error } = await supabase
        .from('respuestas')
        .update({
          datos: datos || {},
          puntuacion_total: puntuacion_total || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingRespuesta.id)
        .select()
        .single();

      if (error) {
        console.error('Supabase update error:', error);
        return NextResponse.json(
          { error: 'Error al actualizar respuesta' },
          { status: 500 }
        );
      }

      respuesta = data;
    } else {
      // Create new respuesta
      const { data, error } = await supabase
        .from('respuestas')
        .insert([
          {
            participante_id,
            formulario,
            datos: datos || {},
            puntuacion_total: puntuacion_total || null,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json(
          { error: 'Error al crear respuesta' },
          { status: 500 }
        );
      }

      respuesta = data;
    }

    return NextResponse.json({ respuesta });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const participante_id = searchParams.get('participante_id');

    if (!participante_id) {
      return NextResponse.json(
        { error: 'participante_id es requerido' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('respuestas')
      .select('*')
      .eq('participante_id', participante_id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Error al obtener respuestas' },
        { status: 500 }
      );
    }

    return NextResponse.json({ respuestas: data || [] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
