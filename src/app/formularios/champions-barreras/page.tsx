'use client'

import { useState } from 'react'
import FormWrapper from '@/components/FormWrapper'

interface ActionPlan {
  id: string
  barrera: string
  accion_propuesta: string
  responsable_plazo: string
}

export default function ChampionsBarrerasPage() {
  const [facilitadores, setFacilitadores] = useState<string[]>(['', '', '', ''])
  const [barreras, setBarreras] = useState<string[]>(['', '', '', ''])
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([
    { id: '1', barrera: '', accion_propuesta: '', responsable_plazo: '' },
    { id: '2', barrera: '', accion_propuesta: '', responsable_plazo: '' },
    { id: '3', barrera: '', accion_propuesta: '', responsable_plazo: '' },
    { id: '4', barrera: '', accion_propuesta: '', responsable_plazo: '' },
  ])

  const handleFacilitadorChange = (index: number, value: string) => {
    const updated = [...facilitadores]
    updated[index] = value
    setFacilitadores(updated)
  }

  const handleBarreraChange = (index: number, value: string) => {
    const updated = [...barreras]
    updated[index] = value
    setBarreras(updated)
  }

  const handleActionPlanChange = (
    id: string,
    field: keyof ActionPlan,
    value: string
  ) => {
    setActionPlans(
      actionPlans.map((plan) =>
        plan.id === id ? { ...plan, [field]: value } : plan
      )
    )
  }

  const isComplete =
    facilitadores.some((f) => f.trim()) &&
    barreras.some((b) => b.trim()) &&
    actionPlans.some((ap) => ap.barrera.trim() && ap.accion_propuesta.trim())

  const formDataJson = isComplete
    ? JSON.stringify({
        facilitadores: facilitadores.filter((f) => f.trim()),
        barreras: barreras.filter((b) => b.trim()),
        action_plans: actionPlans.filter(
          (ap) => ap.barrera.trim() && ap.accion_propuesta.trim()
        ),
      })
    : ''

  return (
    <FormWrapper
      title="Champions y Barreras"
      description="Identifica los facilitadores del cambio y las barreras a la transformación organizacional. Crea un plan de acción para superarlas."
      formularioId="champions-barreras"
    >
      <div className="space-y-10">
        {/* Two Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Facilitadores */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-navy mb-2">
                🌟 Facilitadores del Cambio
              </h2>
              <p className="text-sm text-body">
                Elementos, personas o recursos que facilitan la transformación
              </p>
            </div>

            <div className="space-y-3">
              {facilitadores.map((facilitador, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-navy mb-1">
                    Facilitador {index + 1}
                  </label>
                  <input
                    type="text"
                    value={facilitador}
                    onChange={(e) =>
                      handleFacilitadorChange(index, e.target.value)
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder-slate-400"
                    placeholder="Ej: Liderazgo comprometido..."
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Barreras */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-navy mb-2">
                🚧 Barreras al Cambio
              </h2>
              <p className="text-sm text-body">
                Obstáculos u retos a la transformación organizacional
              </p>
            </div>

            <div className="space-y-3">
              {barreras.map((barrera, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-navy mb-1">
                    Barrera {index + 1}
                  </label>
                  <input
                    type="text"
                    value={barrera}
                    onChange={(e) =>
                      handleBarreraChange(index, e.target.value)
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold placeholder-slate-400"
                    placeholder="Ej: Resistencia al cambio..."
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Plan Table */}
        <div className="space-y-4 border-t border-slate-200 pt-8">
          <div>
            <h2 className="text-lg font-bold text-navy mb-2">
              📋 Plan de Acción
            </h2>
            <p className="text-sm text-body">
              Define acciones para superar las barreras identificadas
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-300 bg-slate-50">
                  <th className="text-left px-4 py-3 font-semibold text-navy">
                    Barrera
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-navy">
                    Acción Propuesta
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-navy">
                    Responsable/Plazo
                  </th>
                </tr>
              </thead>
              <tbody>
                {actionPlans.map((plan) => (
                  <tr key={plan.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={plan.barrera}
                        onChange={(e) =>
                          handleActionPlanChange(plan.id, 'barrera', e.target.value)
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-teal"
                        placeholder="Barrera a superar"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={plan.accion_propuesta}
                        onChange={(e) =>
                          handleActionPlanChange(
                            plan.id,
                            'accion_propuesta',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-teal"
                        placeholder="Acción a realizar"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={plan.responsable_plazo}
                        onChange={(e) =>
                          handleActionPlanChange(
                            plan.id,
                            'responsable_plazo',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-teal"
                        placeholder="Quién / Cuándo"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-gold to-gold bg-opacity-10 border border-gold rounded-lg p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-slate-600">Facilitadores</p>
              <p className="text-2xl font-bold text-gold">
                {facilitadores.filter((f) => f.trim()).length}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Barreras</p>
              <p className="text-2xl font-bold text-gold">
                {barreras.filter((b) => b.trim()).length}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Planes de Acción</p>
              <p className="text-2xl font-bold text-gold">
                {actionPlans.filter((ap) => ap.barrera.trim()).length}
              </p>
            </div>
          </div>
        </div>

        {!isComplete && (
          <p className="text-center text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-4">
            Completa al menos un facilitador, una barrera y un plan de acción
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
