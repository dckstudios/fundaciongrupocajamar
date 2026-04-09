'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

interface FormData {
  nombre: string;
  email: string;
  departamento: string;
  rol: string;
  antiguedad: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function RegistroPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    departamento: '',
    rol: '',
    antiguedad: '',
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.departamento) {
      newErrors.departamento = 'El departamento es requerido';
    }

    if (!formData.rol.trim()) {
      newErrors.rol = 'El rol es requerido';
    }

    if (!formData.antiguedad) {
      newErrors.antiguedad = 'La antigüedad es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/participante', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar participante');
      }

      const data = await response.json();
      const participanteId = data.participante.id;

      // Save to localStorage
      localStorage.setItem('participante_id', participanteId);

      // Redirect to formularios
      router.push('/formularios');
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'Error al registrar. Por favor, intenta de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header showBack={true} backHref="/" />

      <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-cream to-slate-100 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8 border-t-4 border-gold">
            <h1 className="text-3xl font-bold text-navy mb-2">Registro</h1>
            <p className="text-body text-sm mb-8">
              Completa tus datos para comenzar el assessment
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-navy mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition ${
                    errors.nombre ? 'border-red-500 bg-red-50' : 'border-slate-300'
                  }`}
                  placeholder="Tu nombre completo"
                  disabled={loading}
                />
                {errors.nombre && (
                  <p className="text-red-600 text-xs mt-1">{errors.nombre}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'
                  }`}
                  placeholder="tu.email@example.com"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Departamento */}
              <div>
                <label htmlFor="departamento" className="block text-sm font-semibold text-navy mb-2">
                  Departamento *
                </label>
                <select
                  id="departamento"
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition ${
                    errors.departamento ? 'border-red-500 bg-red-50' : 'border-slate-300'
                  }`}
                  disabled={loading}
                >
                  <option value="">Selecciona un departamento</option>
                  <option value="Dirección">Dirección</option>
                  <option value="Investigación">Investigación</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Administración">Administración</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.departamento && (
                  <p className="text-red-600 text-xs mt-1">{errors.departamento}</p>
                )}
              </div>

              {/* Rol */}
              <div>
                <label htmlFor="rol" className="block text-sm font-semibold text-navy mb-2">
                  Rol/Cargo *
                </label>
                <input
                  type="text"
                  id="rol"
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition ${
                    errors.rol ? 'border-red-500 bg-red-50' : 'border-slate-300'
                  }`}
                  placeholder="Tu cargo en la organización"
                  disabled={loading}
                />
                {errors.rol && (
                  <p className="text-red-600 text-xs mt-1">{errors.rol}</p>
                )}
              </div>

              {/* Antiguedad */}
              <div>
                <label htmlFor="antiguedad" className="block text-sm font-semibold text-navy mb-2">
                  Antigüedad en la organización *
                </label>
                <select
                  id="antiguedad"
                  name="antiguedad"
                  value={formData.antiguedad}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal focus:border-transparent outline-none transition ${
                    errors.antiguedad ? 'border-red-500 bg-red-50' : 'border-slate-300'
                  }`}
                  disabled={loading}
                >
                  <option value="">Selecciona tu antigüedad</option>
                  <option value="Menos de 1 año">Menos de 1 año</option>
                  <option value="1-3 años">1-3 años</option>
                  <option value="3-5 años">3-5 años</option>
                  <option value="5-10 años">5-10 años</option>
                  <option value="Más de 10 años">Más de 10 años</option>
                </select>
                {errors.antiguedad && (
                  <p className="text-red-600 text-xs mt-1">{errors.antiguedad}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal hover:bg-deep-blue text-white font-bold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Registrando...' : 'Continuar al Assessment'}
              </button>
            </form>

            <p className="text-center text-muted text-xs mt-6">
              La información proporcionada se utilizará únicamente para este assessment.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
