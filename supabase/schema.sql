-- ============================================================
-- Schema: Assessment KGA-F — Fundación Grupo Cajamar
-- ============================================================

-- Participantes (registro simple)
CREATE TABLE participantes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  departamento TEXT,
  rol TEXT,
  antiguedad TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Respuestas genéricas de formularios
CREATE TABLE respuestas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  participante_id UUID REFERENCES participantes(id) ON DELETE CASCADE,
  formulario TEXT NOT NULL, -- 'disposicion-cambio', 'mapa-colaboracion', etc.
  datos JSONB NOT NULL,     -- Todas las respuestas del formulario
  puntuacion_total NUMERIC, -- Para formularios con puntuación
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_respuestas_participante ON respuestas(participante_id);
CREATE INDEX idx_respuestas_formulario ON respuestas(formulario);
CREATE INDEX idx_participantes_email ON participantes(email);

-- RLS (Row Level Security) - desactivado para simplicidad
-- En producción, activar y configurar políticas
ALTER TABLE participantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE respuestas ENABLE ROW LEVEL SECURITY;

-- Políticas permisivas para la app (sin auth de Supabase)
CREATE POLICY "allow_all_participantes" ON participantes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_respuestas" ON respuestas FOR ALL USING (true) WITH CHECK (true);
