'use client'

import { useState } from 'react'
import FormWrapper from '@/components/FormWrapper'

interface Collaborator {
  id: string
  name: string
  department: string
  direction: 'comparto_con' | 'recibo_de'
  knowledge_type: string
}

const REFLECTION_QUESTIONS = [
  {
    key: 'bottlenecks',
    question: '¿Dónde están los principales cuellos de botella en el flujo de conocimiento?',
  },
  {
    key: 'hubs',
    question: '¿Quiénes son los "hubs" de conocimiento en tu equipo?',
  },
  {
    key: 'difficult_knowledge',
    question: '¿Qué tipo de conocimiento es más difícil de acceder o compartir?',
  },
  {
    key: 'improvements',
    question: '¿Qué mejorarías para que el conocimiento circule mejor?',
  },
]

export default function MapaColaboracionPage() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [reflections, setReflections] = useState({
    bottlenecks: '',
    hubs: '',
    difficult_knowledge: '',
    improvements: '',
  })

  const [formState, setFormState] = useState<{
    name: string
    department: string
    direction: 'comparto_con' | 'recibo_de'
    knowledge_type: string
  }>({
    name: '',
    department: '',
    direction: 'comparto_con',
    knowledge_type: '',
  })

  const addCollaborator = () => {
    if (!formState.name || !formState.department || !formState.knowledge_type) {
      alert('Por favor, completa todos los campos del colaborador')
      return
    }

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      name: formState.name,
      department: formState.department,
      direction: formState.direction,
      knowledge_type: formState.knowledge_type,
    }

    setCollaborators([...collaborators, newCollaborator])
    setFormState({
      name: '',
      department: '',
      direction: 'comparto_con',
      knowledge_type: '',
    })
  }

  const removeCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id))
  }

  const handleReflectionChange = (key: string, value: string) => {
    setReflections((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const isComplete =
    collaborators.length > 0 &&
    Object.values(reflections).every((val) => val.trim().length > 0)

  const formDataJson = isComplete
    ? JSON.stringify({
        collaborators,
        reflections,
      })
    : ''

  return (
    <FormWrapper
      title="Mapa de Colaboración"
      description="Identifica tu red de conocimiento: con quién compartes y de quién recibes información. Luego responde las preguntas de reflexión."
      formularioId="mapa-colaboracion"
    >
      <div className="space-y-8">
        {/* Collaborators Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Colaboradores</h2>
            <p className="text-sm text-body mb-4">
              Añade los colaboradores con los que compartes o recibes conocimiento
            </p>
          </div>

          {/* Add Collaborator Form */}
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Nombre del colaborador"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Departamento
                </label>
                <input
                  type="text"
                  value={formState.department}
                  onChange={(e) =>
                    setFormState({ ...formState, department: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Departamento"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Dirección
                </label>
                <select
                  value={formState.direction}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      direction: e.target.value as 'comparto_con' | 'recibo_de',
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <option value="comparto_con">Comparto conocimiento con</option>
                  <option value="recibo_de">Recibo conocimiento de</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Conocimiento
                </label>
                <input
                  type="text"
                  value={formState.knowledge_type}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      knowledge_type: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  placeholder="Ej: Procesos, Tecnología, etc."
                />
              </div>
            </div>

            <button
              type="button"
              onClick={addCollaborator}
              className="w-full bg-teal hover:bg-deep-blue text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              + Añadir Colaborador
            </button>
          </div>

          {/* Collaborators List */}
          {collaborators.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-navy">
                Colaboradores añadidos ({collaborators.length})
              </h3>
              {collaborators.map((collab) => (
                <div
                  key={collab.id}
                  className="flex items-start justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-navy">{collab.name}</p>
                    <p className="text-sm text-body">
                      {collab.department} •{' '}
                      {collab.direction === 'comparto_con'
                        ? 'Compartir'
                        : 'Recibir'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Conocimiento: {collab.knowledge_type}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCollaborator(collab.id)}
                    className="ml-4 px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors text-sm font-medium"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reflection Questions */}
        <div className="space-y-6 border-t border-slate-200 pt-8">
          <div>
            <h2 className="text-xl font-bold text-navy mb-4">Reflexiones</h2>
            <p className="text-sm text-body mb-4">
              Responde las siguientes preguntas de reflexión
            </p>
          </div>

          {REFLECTION_QUESTIONS.map(({ key, question }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-navy mb-2">
                {question}
              </label>
              <textarea
                value={reflections[key as keyof typeof reflections]}
                onChange={(e) =>
                  handleReflectionChange(key, e.target.value)
                }
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal resize-none"
                rows={4}
                placeholder="Tu respuesta..."
              />
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="bg-slate-100 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">
              Progreso: <span className="font-medium">{collaborators.length}</span> colaborador(es)
            </span>
            <span className="text-slate-600">
              Reflexiones: <span className="font-medium">
                {Object.values(reflections).filter((v) => v.trim()).length}
              </span> de <span className="font-medium">4</span>
            </span>
          </div>
        </div>

        {!isComplete && (
          <p className="text-center text-sm text-slate-500 bg-amber-50 border border-amber-200 rounded-lg p-4">
            Añade al menos un colaborador y completa todas las reflexiones
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
