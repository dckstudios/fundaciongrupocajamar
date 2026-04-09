export type FormularioConfig = {
  id: string
  titulo: string
  descripcion: string
  icono: string
  color: string
}

export const FORMULARIOS: FormularioConfig[] = [
  {
    id: 'disposicion-cambio',
    titulo: 'Disposición al Cambio',
    descripcion: 'Cuestionario Likert para evaluar tu disposición a adoptar nuevas herramientas y procesos.',
    icono: '📊',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'mapa-colaboracion',
    titulo: 'Mapa de Colaboración',
    descripcion: 'Identifica tu red de conocimiento: con quién compartes y de quién recibes información.',
    icono: '🗺️',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'champions-barreras',
    titulo: 'Champions y Barreras',
    descripcion: 'Identifica facilitadores y obstáculos para la transformación organizacional.',
    icono: '⚡',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'evaluacion-taller',
    titulo: 'Evaluación del Taller',
    descripcion: 'Tu opinión sobre el taller nos ayuda a mejorar futuros procesos.',
    icono: '✅',
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'mapeo-procesos',
    titulo: 'Mapeo de Procesos',
    descripcion: 'Documenta los procesos clave de tu área: entradas, salidas y actores.',
    icono: '🔄',
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: 'auditoria-sistemas',
    titulo: 'Auditoría de Sistemas',
    descripcion: 'Inventario de herramientas, repositorios y nivel de madurez tecnológica.',
    icono: '🖥️',
    color: 'from-slate-500 to-gray-700',
  },
]
