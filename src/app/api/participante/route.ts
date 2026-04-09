import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, departamento, rol, antiguedad } = body;

    // Validate required fields
    if (!nombre || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Check if participante already exists by email
    const { data: existingParticipante } = await supabase
      .from('participantes')
      .select('*')
      .eq('email', email)
      .single();

    if (existingParticipante) {
      return NextResponse.json({ participante: existingParticipante });
    }

    // Create new participante
    const { data, error } = await supabase
      .from('participantes')
      .insert([
        {
          nombre,
          email,
          departamento: departamento || null,
          rol: rol || null,
          antiguedad: antiguedad || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Error al crear participante' },
        { status: 500 }
      );
    }

    return NextResponse.json({ participante: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
