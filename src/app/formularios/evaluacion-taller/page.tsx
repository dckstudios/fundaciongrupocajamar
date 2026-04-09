'use client'

import { useState } from 'react'
import FormWrapper from '@/components/FormWrapper'

interface FormData {
  satisfaccion: string
  dinamicas_claras: string
  dinamica_valiosa: string
  dinamica_valiosa_razon: string
  cambios_mejoras: string
  preparacion_cambio: string
  comentarios_adicionales: string
}

export default function EvaluacionTallerPage() {
  const [formData, setFormData] = useState<FormData>({
    satisfaccion: '',
    dinamicas_claras: '',
    dinamica_valiosa: '',
    dinamica_valiosa_razon: '',
    cambios_mejoras: '',
    preparacion_cambio: '',
    comentarios_adicionales: '',
  })

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isComplete = Object.values(formData).every((val) => val.trim().length > 0)

  const formDataJson = isComplete ? JSON.stringify(formData) : ''

  return (
    <FormWrapper
      title="Evaluación del Taller"
      description="Tu opinión nos ayuda a mejorar continuamente nuestros procesos de transformación. Por favor, sé honesto en tus respuestas."
      formularioId="evaluacion-taller"
    >
      <div className="space-y-8">
        {/* Q1: Satisfacción General */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-navy mb-1">
              1. ¿Cuál es tu nivel de satisfacción general con el taller?
            </h3>
            <p className="text-sm text-body mb-4">
              Tu experiencia general del evento
            </p>
          </div>
          <div className="space-y-2">
            {[
              'Muy satisfecho/a',
              'Satisfecho/a',
              'Neutral',
              'Poco satisfecho/a',
              'Insatisfecho/a',
            ].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="satisfaccion"
                  value={option}
                  checked={formData.satisfaccion === option}
                  onChange={(e) => handleChange('satisfaccion', e.target.value)}
                  className="w-4 h-4 accent-teal"
                />
                <span className="text-navy">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q2: Dinámicas Claras */}
        <div className="space-y-4 border-t border-slate-200 pt-8">
          <div>
            <h3 className="font-semibold text-navy mb-1">
              2. Las dinámicas fueron claras y bien facilitadas
            </h3>
            <p className="text-sm text-body mb-4">
              Claridad en la comunicación y facilidación del taller
            </p>
          </div>
          <div className="space-y-2">
            {[
              'Totalmente de acuerdo',
              'De acuerdo',
              'Neutral',
              'En desacuerdo',
              'Totalmente en desacuerdo',
            ].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="dinamicas_claras"
                  value={option}
                  checked={formData.dinamicas_claras === option}
                  onChange={(e) => handleChange('dinamicas_claras', e.target.value)}
                  className="w-4 h-4 accent-teal"
                />
                <span className="text-navy">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q3: Dinámica Más Valiosa */}
        <div className="space-y-4 border-t border-slate-200 pt-8">
          <div>
            <h3 className="font-semibold text-navy mb-1">
              3. ¿Cuál fue la dinámica más valiosa para ti?
            </h3>
            <p className="text-sm text-body mb-4">
              La que más te aportó o que te resultó más interesante
            </p>
          </div>
          <div className="space-y-2 mb-4">
            {[
              'Disposición al Cambio',
              'Mapa de Colaboración',
              'Champions y Barreras',
            ].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="dinamica_valiosa"
                  value={option}
                  checked={formData.dinamica_valiosa === option}
                  onChange={(e) => handleChange('dinamica_valiosa', e.target.value)}
                  className="w-4 h-4 accent-teal"
                />
                <span className="text-navy">{option}</span>
              </label>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-2">
              ¿Por qué?
            </label>
            <textarea
              value={formData.dinamica_valiosa_razon}
              onChange={(e) =>
                handleChange('dinamica_valiosa_razon', e.target.value)
              }
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
              rows={3}
              placeholder="Cuéntanos tus razones..."
            />
          </div>
        </div>

        {/* Q4: Cambios o Mejoras */}
        <div className="space-y-4 border-t border-slate-200 pt-8">
          <div>
            <h3 className="font-semibold text-navy mb-1">
              4. ¿Qué cambiarías o mejorarías del taller?
            </h3>
            <p className="text-sm text-body mb-4">
              Sugerencias constructivas para próximas sesiones
            </p>
          </div>
          <textarea
            value={formData.cambios_mejoras}
            onChange={(e) => handleChange('cambios_mejoras', e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
            rows={4}
            placeholder="Tu feedback es valioso..."
          />
        </div>

        {/* Q5: Preparación para el Cambio */}
        <div className="space-y-4 border-t border-slate-200 pt-8">
          <div>
            <h3 className="font-semibold text-navy mb-1">
              5. ¿Te sientes más preparado/a para el cambio después del taller?
            </h3>
            <p className="text-sm text-body mb-4">
              Impacto del taller en tu disposición al cambio
            </p>
          </div>
          <div className="space-y-2">
            {['Mucho más', 'Más', 'Igual', 'Menos'].map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="preparacion_cambio"
                  value={option}
                  checked={formData.preparacion_cambio === option}
                  onChange={(e) => handleChange('preparacion_cambio', e.target.value)}
                  className="w-4 h-4 accent-teal"
                />
                <span className="text-navy">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Q6: Comentarios Adicionales */}
        <div className="space-y-4 border-t border-slate-200 pt-8">
          <div>
            <h3 className="font-semibold text-navy mb-1">
              6. ¿Algún comentario adicional?
            </h3>
            <p className="text-sm text-body mb-4">
              Espacio libre para cualquier observación
            </p>
          </div>
          <textarea
            value={formData.comentarios_adicionales}
            onChange={(e) =>
              handleChange('comentarios_adicionales', e.target.value)
            }
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
            rows={4}
            placeholder="Tus comentarios finales..."
          />
        </div>

        {/* Progress Indicator */}
        <div className="bg-teal bg-opacity-10 border border-teal rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">
              Formulario completado:{' '}
              <span className="font-medium">
                {Object.values(formData).filter((v) => v.trim()).length} de 7
              </span>
            </span>
            {isComplete && <span className="text-teal font-medium">✓ Listo para enviar</span>}
          </div>
        </div>

        {!isComplete && (
          <p className="text-center text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-4">
            Completa todas las preguntas para enviar la evaluación
          </p>
        )}

        <input
          type="hidden"
          name="assessment-data"
          id="assessment-data"
          value={formDataJson}
        />
      </div>
    </FormWrapper>
  )
}
