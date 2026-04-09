'use client'

import { useState } from 'react'
import FormWrapper from '@/components/FormWrapper'

interface System {
  id: string
  nombre: string
  tipo: string
  estado: string
  usuarios_aprox: string
}

const TIPOS_SISTEMA = ['ERP', 'CRM', 'BBDD', 'Documental', 'Comunicación', 'Otro']
const ESTADOS = ['Activo', 'En migración', 'Legacy', 'Obsoleto']

const ITEMS_DAMA = [
  'Gobernanza de datos',
  'Calidad de datos',
  'Metadata management',
  'Integración de datos',
  'Seguridad de datos',
  'Almacenamiento y operaciones',
]

export default function AuditoriaSistemasPage() {
  const [systems, setSystems] = useState<System[]>([])
  const [systemForm, setSystemForm] = useState({
    nombre: '',
    tipo: 'ERP',
    estado: 'Activo',
    usuarios_aprox: '',
  })

  const [damaRatings, setDamaRatings] = useState({
    gobernanza: '',
    calidad: '',
    metadata: '',
    integracion: '',
    seguridad: '',
    almacenamiento: '',
  })

  const [iaQuestions, setIaQuestions] = useState({
    procesos_ia: '',
    datos_estructurados: '',
    barreras_tecnicas: '',
  })

  const addSystem = () => {
    if (!systemForm.nombre || !systemForm.usuarios_aprox) {
      alert('Por favor, completa nombre y número de usuarios')
      return
    }

    setSystems([
      ...systems,
      {
        id: Date.now().toString(),
        nombre: systemForm.nombre,
        tipo: systemForm.tipo,
        estado: systemForm.estado,
        usuarios_aprox: systemForm.usuarios_aprox,
      },
    ])

    setSystemForm({
      nombre: '',
      tipo: 'ERP',
      estado: 'Activo',
      usuarios_aprox: '',
    })
  }

  const removeSystem = (id: string) => {
    setSystems(systems.filter((s) => s.id !== id))
  }

  const isDamaComplete = Object.values(damaRatings).every((v) => v)
  const isIaComplete = Object.values(iaQuestions).every((v) => v.trim())
  const isComplete = systems.length > 0 && isDamaComplete && isIaComplete

  const formDataJson = isComplete
    ? JSON.stringify({
        sistemas: systems,
        madurez_dama: damaRatings,
        preparacion_ia: iaQuestions,
      })
    : ''

  return (
    <FormWrapper
      title="Auditoría de Sistemas"
      description="Documenta el inventario de sistemas, evalúa la madurez de datos (DAMA) y analiza la preparación para IA."
      formularioId="auditoria-sistemas"
    >
      <div className="space-y-10">
        {/* Section A: Inventario de Sistemas */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">
              A) Inventario de Sistemas
            </h2>
            <p className="text-sm text-body">
              Añade los sistemas principales de tu organización
            </p>
          </div>

          {/* Add System Form */}
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Nombre del Sistema
                </label>
                <input
                  type="text"
                  value={systemForm.nombre}
                  onChange={(e) =>
                    setSystemForm({ ...systemForm, nombre: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Ej: SAP ERP"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Tipo
                </label>
                <select
                  value={systemForm.tipo}
                  onChange={(e) =>
                    setSystemForm({ ...systemForm, tipo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  {TIPOS_SISTEMA.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Estado
                </label>
                <select
                  value={systemForm.estado}
                  onChange={(e) =>
                    setSystemForm({ ...systemForm, estado: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  {ESTADOS.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-2">
                  Usuarios aproximados
                </label>
                <input
                  type="number"
                  value={systemForm.usuarios_aprox}
                  onChange={(e) =>
                    setSystemForm({
                      ...systemForm,
                      usuarios_aprox: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Ej: 50"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={addSystem}
              className="w-full bg-teal hover:bg-deep-blue text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              + Añadir Sistema
            </button>
          </div>

          {/* Systems List */}
          {systems.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-navy">
                Sistemas añadidos ({systems.length})
              </h3>
              {systems.map((system) => (
                <div
                  key={system.id}
                  className="flex items-start justify-between p-4 bg-slate-50 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                >
                  <div className="flex-1">
                    <p className="font-medium text-navy">{system.nombre}</p>
                    <p className="text-sm text-body mt-1">
                      {system.tipo} • {system.estado} • {system.usuarios_aprox} usuarios
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSystem(system.id)}
                    className="ml-4 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section B: Madurez DAMA */}
        <div className="space-y-6 border-t border-slate-200 pt-10">
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">
              B) Madurez de Datos (DAMA)
            </h2>
            <p className="text-sm text-body">
              Evalúa cada área en escala 1-5 (1=Inicial, 5=Optimizado)
            </p>
          </div>

          <div className="space-y-6">
            {ITEMS_DAMA.map((item, index) => {
              const key = Object.keys(damaRatings)[index] as keyof typeof damaRatings
              return (
                <div key={item}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-medium text-navy">{item}</label>
                    {damaRatings[key] && (
                      <span className="text-sm font-bold text-teal">
                        {damaRatings[key]}/5
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          setDamaRatings({
                            ...damaRatings,
                            [key]: rating.toString(),
                          })
                        }
                        className={`flex-1 py-2 px-1 rounded font-bold transition-colors ${
                          damaRatings[key] === rating.toString()
                            ? 'bg-teal text-white'
                            : 'bg-slate-100 text-navy hover:bg-slate-200'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Section C: Preparación para IA */}
        <div className="space-y-6 border-t border-slate-200 pt-10">
          <div>
            <h2 className="text-xl font-bold text-navy mb-2">
              C) Preparación para IA
            </h2>
            <p className="text-sm text-body">
              Responde las siguientes preguntas sobre tu organización
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                1. ¿Qué procesos podrían beneficiarse de automatización con IA?
              </label>
              <textarea
                value={iaQuestions.procesos_ia}
                onChange={(e) =>
                  setIaQuestions({
                    ...iaQuestions,
                    procesos_ia: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                rows={4}
                placeholder="Describe procesos candidatos para automatización..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                2. ¿Existen datos estructurados suficientes para entrenar modelos?
              </label>
              <textarea
                value={iaQuestions.datos_estructurados}
                onChange={(e) =>
                  setIaQuestions({
                    ...iaQuestions,
                    datos_estructurados: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                rows={4}
                placeholder="Describe la disponibilidad de datos estructurados..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                3. ¿Qué barreras técnicas anticipas para implementar IA?
              </label>
              <textarea
                value={iaQuestions.barreras_tecnicas}
                onChange={(e) =>
                  setIaQuestions({
                    ...iaQuestions,
                    barreras_tecnicas: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                rows={4}
                placeholder="Describe posibles barreras técnicas..."
              />
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-slate-100 to-slate-100 border border-slate-300 rounded-lg p-6 space-y-3">
          <h3 className="font-semibold text-navy">Progreso del Formulario</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">A) Sistemas documentados</span>
              <span className={`font-medium ${systems.length > 0 ? 'text-green-600' : 'text-slate-400'}`}>
                {systems.length > 0 ? '✓' : '○'} {systems.length} sistema(s)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">B) DAMA evaluado</span>
              <span className={`font-medium ${isDamaComplete ? 'text-green-600' : 'text-slate-400'}`}>
                {isDamaComplete ? '✓' : '○'} {Object.values(damaRatings).filter(v => v).length}/6 items
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">C) IA preparación</span>
              <span className={`font-medium ${isIaComplete ? 'text-green-600' : 'text-slate-400'}`}>
                {isIaComplete ? '✓' : '○'} {Object.values(iaQuestions).filter(v => v.trim()).length}/3 preguntas
              </span>
            </div>
          </div>
        </div>

        {!isComplete && (
          <p className="text-center text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-4">
            Completa todas las secciones para enviar el formulario
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
