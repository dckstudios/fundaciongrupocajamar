'use client'

import { useState } from 'react'
import FormWrapper from '@/components/FormWrapper'

interface Process {
  id: string
  nombre_proceso: string
  descripcion: string
  entradas: string
  salidas: string
  actores_involucrados: string
  herramientas_utilizadas: string
  frecuencia: string
  nivel_documentacion: string
}

const FRECUENCIAS = ['Diaria', 'Semanal', 'Mensual', 'Trimestral', 'Anual']
const NIVELES_DOC = [
  'Sin documentar',
  'Parcialmente documentado',
  'Documentado',
  'Bien documentado',
]

export default function MapeoProcesosPage() {
  const [processes, setProcesses] = useState<Process[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const addProcess = () => {
    const newId = Date.now().toString()
    setProcesses([
      ...processes,
      {
        id: newId,
        nombre_proceso: '',
        descripcion: '',
        entradas: '',
        salidas: '',
        actores_involucrados: '',
        herramientas_utilizadas: '',
        frecuencia: 'Mensual',
        nivel_documentacion: 'Sin documentar',
      },
    ])
    setExpandedId(newId)
  }

  const removeProcess = (id: string) => {
    setProcesses(processes.filter((p) => p.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const updateProcess = (id: string, field: keyof Process, value: string) => {
    setProcesses(
      processes.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    )
  }

  const isComplete =
    processes.length > 0 &&
    processes.length <= 5 &&
    processes.every(
      (p) =>
        p.nombre_proceso.trim() &&
        p.descripcion.trim() &&
        p.entradas.trim() &&
        p.salidas.trim() &&
        p.actores_involucrados.trim() &&
        p.herramientas_utilizadas.trim()
    )

  const formDataJson = isComplete
    ? JSON.stringify({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        processes: processes.map(({ id, ...rest }) => rest),
        cantidad_procesos: processes.length,
      })
    : ''

  return (
    <FormWrapper
      title="Mapeo de Procesos"
      description="Documenta entre 1 y 5 procesos clave de tu área. Para cada proceso, especifica entradas, salidas, actores e herramientas utilizadas."
      formularioId="mapeo-procesos"
    >
      <div className="space-y-8">
        {/* Instructions */}
        <div className="bg-purple-50 border border-purple-300 rounded-lg p-4">
          <p className="text-sm text-purple-900">
            📌 Añade entre 1 y 5 procesos. Haz clic en una tarjeta para expandir y editar.
          </p>
        </div>

        {/* Process Cards */}
        <div className="space-y-4">
          {processes.map((process, index) => (
            <div
              key={process.id}
              className="border border-slate-300 rounded-lg overflow-hidden"
            >
              {/* Card Header */}
              <button
                type="button"
                onClick={() =>
                  setExpandedId(expandedId === process.id ? null : process.id)
                }
                className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-navy">
                        {process.nombre_proceso || '(Sin nombre)'}
                      </p>
                      {process.descripcion && (
                        <p className="text-xs text-body mt-1 line-clamp-1">
                          {process.descripcion}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      process.nombre_proceso.trim()
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {process.nombre_proceso.trim() ? '✓ Completo' : 'Incompleto'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeProcess(process.id)
                    }}
                    className="ml-2 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm"
                  >
                    ✕
                  </button>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedId === process.id && (
                <div className="border-t border-slate-300 p-6 bg-white space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Nombre del Proceso *
                    </label>
                    <input
                      type="text"
                      value={process.nombre_proceso}
                      onChange={(e) =>
                        updateProcess(process.id, 'nombre_proceso', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      placeholder="Ej: Gestión de Pedidos"
                    />
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Descripción *
                    </label>
                    <textarea
                      value={process.descripcion}
                      onChange={(e) =>
                        updateProcess(process.id, 'descripcion', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                      rows={3}
                      placeholder="Descripción detallada del proceso..."
                    />
                  </div>

                  {/* Entradas */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Entradas (separadas por comas) *
                    </label>
                    <input
                      type="text"
                      value={process.entradas}
                      onChange={(e) =>
                        updateProcess(process.id, 'entradas', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      placeholder="Ej: Solicitud de cliente, Catálogo de productos"
                    />
                  </div>

                  {/* Salidas */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Salidas (separadas por comas) *
                    </label>
                    <input
                      type="text"
                      value={process.salidas}
                      onChange={(e) =>
                        updateProcess(process.id, 'salidas', e.target.value)
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      placeholder="Ej: Pedido procesado, Confirmación al cliente"
                    />
                  </div>

                  {/* Actores */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Actores Involucrados *
                    </label>
                    <input
                      type="text"
                      value={process.actores_involucrados}
                      onChange={(e) =>
                        updateProcess(
                          process.id,
                          'actores_involucrados',
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      placeholder="Ej: Vendedor, Almacén, Finanzas"
                    />
                  </div>

                  {/* Herramientas */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Herramientas Utilizadas *
                    </label>
                    <input
                      type="text"
                      value={process.herramientas_utilizadas}
                      onChange={(e) =>
                        updateProcess(
                          process.id,
                          'herramientas_utilizadas',
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      placeholder="Ej: ERP, Excel, Email"
                    />
                  </div>

                  {/* Frequency and Documentation */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Frecuencia
                      </label>
                      <select
                        value={process.frecuencia}
                        onChange={(e) =>
                          updateProcess(process.id, 'frecuencia', e.target.value)
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      >
                        {FRECUENCIAS.map((freq) => (
                          <option key={freq} value={freq}>
                            {freq}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        Nivel de Documentación
                      </label>
                      <select
                        value={process.nivel_documentacion}
                        onChange={(e) =>
                          updateProcess(
                            process.id,
                            'nivel_documentacion',
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                      >
                        {NIVELES_DOC.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Process Button */}
        <button
          type="button"
          onClick={addProcess}
          disabled={processes.length >= 5}
          className={`w-full py-3 px-4 border-2 border-dashed rounded-lg font-medium transition-colors ${
            processes.length >= 5
              ? 'border-slate-300 text-slate-400 cursor-not-allowed'
              : 'border-purple-600 text-purple-600 hover:bg-purple-50'
          }`}
        >
          + Añadir Proceso ({processes.length}/5)
        </button>

        {/* Summary */}
        <div className="bg-gradient-to-r from-purple-100 to-purple-100 border border-purple-300 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Procesos documentados</p>
              <p className="text-3xl font-bold text-purple-700">{processes.length}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-600 mb-2">
                Todos los procesos deben estar completos para enviar
              </p>
              {isComplete && <p className="text-green-600 font-medium">✓ Listo</p>}
            </div>
          </div>
        </div>

        {!isComplete && (
          <p className="text-center text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-4">
            Añade entre 1 y 5 procesos completos para enviar
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
