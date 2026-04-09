'use client'

import { useState } from 'react'
import FormWrapper from '@/components/FormWrapper'

interface LikertResponse {
  [key: string]: number
}

const ITEMS = [
  'Estoy abierto/a a adoptar nuevas herramientas de trabajo',
  'Me siento cómodo/a utilizando tecnología en mi día a día',
  'Compartir conocimiento con otros mejora el rendimiento del equipo',
  'Confío en que la IA puede mejorar mi trabajo',
  'He participado activamente en procesos de cambio anteriores',
  'Dispongo de tiempo suficiente para aprender nuevas herramientas',
  'Mis superiores apoyan activamente la innovación',
  'Creo que esta transformación beneficiará a la organización',
  'Me siento informado/a sobre los cambios que se están planificando',
  'Estoy dispuesto/a a ser embajador/a del cambio en mi área',
]

const SCALE = [
  { value: 1, label: 'Totalmente en desacuerdo' },
  { value: 2, label: 'En desacuerdo' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'De acuerdo' },
  { value: 5, label: 'Totalmente de acuerdo' },
]

const SCALE_COLORS = {
  1: 'text-red-600',
  2: 'text-orange-500',
  3: 'text-yellow-500',
  4: 'text-blue-500',
  5: 'text-green-600',
}

export default function DisposicionCambioPage() {
  const [responses, setResponses] = useState<LikertResponse>({})

  const handleResponse = (itemIndex: number, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [`item_${itemIndex + 1}`]: value,
    }))
  }

  const calculateTotal = () => {
    return Object.values(responses).reduce((sum, val) => sum + (val || 0), 0)
  }

  const isComplete = Object.keys(responses).length === ITEMS.length
  const total = calculateTotal()

  return (
    <FormWrapper
      title="Disposición al Cambio"
      description="Cuestionario para evaluar tu disposición a adoptar nuevas herramientas y procesos. Por favor, selecciona tu nivel de acuerdo con cada afirmación."
      formularioId="disposicion-cambio"
      onSubmit={() => Promise.resolve()}
    >
      <div className="space-y-8">
        {/* Items */}
        <div className="space-y-8">
          {ITEMS.map((item, index) => (
            <div key={index} className="border-b border-slate-200 pb-6">
              <div className="mb-4">
                <p className="font-medium text-navy">
                  {index + 1}. {item}
                </p>
              </div>

              {/* Scale */}
              <div className="space-y-2">
                {SCALE.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name={`item_${index + 1}`}
                      value={value}
                      checked={responses[`item_${index + 1}`] === value}
                      onChange={() => handleResponse(index, value)}
                      className="w-4 h-4 accent-teal"
                    />
                    <span className={`text-sm font-medium ${SCALE_COLORS[value as keyof typeof SCALE_COLORS]}`}>
                      {value}
                    </span>
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Score Summary */}
        {isComplete && (
          <div className="bg-gradient-to-r from-teal to-cyan-600 bg-opacity-10 border border-teal rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Puntuación Total</p>
                <p className="text-3xl font-bold text-teal">{total}</p>
                <p className="text-xs text-slate-500 mt-1">De 50 puntos máximo</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">
                  <span className="font-medium">{Object.keys(responses).length}</span> de{' '}
                  <span className="font-medium">{ITEMS.length}</span> preguntas respondidas
                </p>
                <div className="mt-3 text-2xl">
                  {total >= 40 && '🎉'}
                  {total >= 30 && total < 40 && '✓'}
                  {total < 30 && '→'}
                </div>
              </div>
            </div>
          </div>
        )}

        {!isComplete && (
          <p className="text-center text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-4">
            Completa todas las preguntas para poder enviar el formulario
          </p>
        )}

        <input
          type="hidden"
          name="assessment-data"
          id="assessment-data"
          value={isComplete ? JSON.stringify({
            items: responses,
            total: total,
          }) : ''}
        />
      </div>
    </FormWrapper>
  )
}
