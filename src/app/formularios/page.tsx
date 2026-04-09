'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import { FORMULARIOS } from '@/lib/formularios';

interface Participante {
  id: string;
  nombre: string;
  email: string;
}

interface Respuesta {
  id: string;
  participante_id: string;
  formulario: string;
  updated_at: string;
}

export default function FormulariosPage() {
  const router = useRouter();
  const [, setParticipanteId] = useState<string | null>(null);
  const [, setParticipante] = useState<Participante | null>(null);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('participante_id');
    if (!id) {
      router.push('/registro');
    } else {
      setParticipanteId(id);
      fetchParticipanteAndRespuestas(id);
    }
  }, [router]);

  const fetchParticipanteAndRespuestas = async (id: string) => {
    try {
      // Fetch respuestas for this participante
      const respuestasResponse = await fetch(`/api/respuestas?participante_id=${id}`);
      if (!respuestasResponse.ok) throw new Error('Error fetching respuestas');
      const respuestasData = await respuestasResponse.json();
      setRespuestas(respuestasData.respuestas || []);

      // For now, we'll extract participante info from localStorage
      // In a real app, you might want to fetch this from an API endpoint
      const nombre = sessionStorage.getItem('participante_nombre');
      if (nombre) {
        setParticipante({ id, nombre, email: '' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFormularioStatus = (formularioId: string) => {
    const respuesta = respuestas.find((r) => r.formulario === formularioId);
    return respuesta ? 'Completado' : 'Pendiente';
  };

  const getFormularioStatusColor = (formularioId: string) => {
    return getFormularioStatus(formularioId) === 'Completado'
      ? 'bg-green-100 text-green-800'
      : 'bg-amber-100 text-amber-800';
  };

  const completedCount = respuestas.length;
  const totalCount = FORMULARIOS.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  if (loading) {
    return (
      <>
        <Header showBack={false} />
        <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-cream to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal mx-auto mb-4"></div>
            <p className="text-body">Cargando tu panel...</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header showBack={false} />

      <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-cream to-slate-100 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-navy mb-2">
              ¡Bienvenido al Assessment!
            </h1>
            <p className="text-lg text-body mb-6">
              Completa los 6 cuestionarios para obtener un análisis completo de tu organización.
            </p>

            {/* Progress Bar */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-navy">
                  Progreso: {completedCount} de {totalCount} cuestionarios completados
                </span>
                <span className="text-2xl font-bold text-teal">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal to-light-teal h-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Forms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FORMULARIOS.map((formulario) => {
              const status = getFormularioStatus(formulario.id);
              const isCompleted = status === 'Completado';

              return (
                <Link
                  key={formulario.id}
                  href={`/formularios/${formulario.id}`}
                  className="group"
                >
                  <div
                    className={`h-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border-l-4 hover:-translate-y-1 cursor-pointer ${
                      isCompleted ? 'border-l-green-500' : 'border-l-gold'
                    }`}
                  >
                    {/* Header with Background Gradient */}
                    <div
                      className={`bg-gradient-to-br ${formulario.color} p-6 text-white relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-white transform -skew-y-3"></div>
                      </div>
                      <div className="relative z-10 flex items-start justify-between">
                        <div className="text-5xl">{formulario.icono}</div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getFormularioStatusColor(
                            formulario.id
                          )}`}
                        >
                          {status}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col h-[calc(100%-120px)]">
                      <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-teal transition-colors">
                        {formulario.titulo}
                      </h3>
                      <p className="text-sm text-body flex-grow">
                        {formulario.descripcion}
                      </p>

                      {/* Status Indicator */}
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        {isCompleted ? (
                          <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                            <span>✓</span> Respuestas guardadas
                          </div>
                        ) : (
                          <div className="text-teal font-semibold text-sm">
                            Comenzar cuestionario →
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-light-teal/10 border border-light-teal rounded-lg p-6">
            <h3 className="font-semibold text-navy mb-2">Información importante</h3>
            <ul className="text-sm text-body space-y-1">
              <li>✓ Puedes guardar tus respuestas en cualquier momento</li>
              <li>✓ Es posible editar respuestas anteriores</li>
              <li>✓ Todos los datos son confidenciales y seguros</li>
              <li>✓ Se estima 30-45 minutos para completar todos los cuestionarios</li>
            </ul>
          </div>

          {/* Logout Option */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                localStorage.removeItem('participante_id');
                sessionStorage.removeItem('participante_nombre');
                router.push('/');
              }}
              className="text-muted hover:text-navy text-sm font-medium transition-colors"
            >
              ← Volver al inicio
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
