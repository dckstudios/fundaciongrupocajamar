'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './Header';

interface FormWrapperProps {
  title: string;
  description: string;
  formularioId: string;
  children: React.ReactNode;
  onSubmit?: (datos: Record<string, unknown>, puntuacion?: number) => Promise<void>;
}

export default function FormWrapper({
  title,
  description,
  formularioId,
  children,
  onSubmit,
}: FormWrapperProps) {
  const router = useRouter();
  const [participanteId, setParticipanteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem('participante_id');
    if (!id) {
      router.push('/registro');
    } else {
      setParticipanteId(id);
    }
  }, [router]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!participanteId) return;

    const formEl = e.currentTarget;
    const hiddenInput = formEl.querySelector<HTMLInputElement>('[name="assessment-data"]');
    const rawData = hiddenInput?.value;

    if (!rawData) {
      setError('Por favor, completa todos los campos requeridos antes de enviar.');
      return;
    }

    let datos: Record<string, unknown>;
    try {
      datos = JSON.parse(rawData);
    } catch {
      setError('Error al procesar los datos del formulario.');
      return;
    }

    const puntuacion = typeof datos.total === 'number' ? datos.total : undefined;

    setLoading(true);
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(datos, puntuacion);
      }

      const response = await fetch('/api/respuestas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participante_id: participanteId,
          formulario: formularioId,
          datos,
          puntuacion_total: puntuacion || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar respuesta');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/formularios');
      }, 1500);
    } catch (err) {
      console.error('Error:', err);
      setError(
        err instanceof Error ? err.message : 'Error al guardar respuesta'
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Header showBack={true} backHref="/formularios" />

      <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-cream to-slate-100 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {success ? (
            <div className="bg-white rounded-lg shadow-xl p-12 text-center border-t-4 border-teal">
              <div className="mb-4 text-5xl">✅</div>
              <h2 className="text-3xl font-bold text-navy mb-3">
                ¡Respuestas guardadas!
              </h2>
              <p className="text-body text-lg">
                Volviendo a tu panel de formularios...
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-gold">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-navy mb-2">{title}</h1>
                <p className="text-body text-sm">{description}</p>
              </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form id="assessment-form" onSubmit={handleFormSubmit}>
                {children}
              </form>

              <div className="mt-8 pt-8 border-t border-slate-200">
                <button
                  type="submit"
                  form="assessment-form"
                  disabled={loading}
                  className="w-full bg-teal hover:bg-deep-blue text-white font-bold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Guardando...' : 'Guardar Respuestas'}
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-muted text-xs mt-8">
            Puedes editar tus respuestas en cualquier momento volviendo a este formulario.
          </p>
        </div>
      </main>
    </>
  );
}
