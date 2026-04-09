'use client'

import { Fragment, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Lock, LogOut, Download, Users, FileText, TrendingUp, Award } from 'lucide-react'
import { FORMULARIOS } from '@/lib/formularios'

interface AdminData {
  total_participantes: number
  total_respuestas: number
  respuestas_por_formulario: Record<string, number>
  avg_puntuacion_disposicion: number
  participantes: Array<{
    id: string
    nombre: string
    email: string
    departamento: string | null
    rol: string | null
    antiguedad: string | null
    created_at: string
    respuestas: Array<{
      id: string
      formulario: string
      puntuacion_total: number | null
      created_at: string
      updated_at: string
    }>
    formularios_completados: number
  }>
  respuestas: Array<{
    id: string
    participante_id: string
    formulario: string
    datos: Record<string, unknown>
    puntuacion_total: number | null
    created_at: string
    updated_at: string
  }>
}

interface ExpandedRows {
  [key: string]: boolean
}

interface SortConfig {
  key: keyof typeof SORT_FUNCTIONS
  direction: 'asc' | 'desc'
}

const SORT_FUNCTIONS = {
  nombre: (a: AdminData['participantes'][0], b: AdminData['participantes'][0]) =>
    a.nombre.localeCompare(b.nombre),
  email: (a: AdminData['participantes'][0], b: AdminData['participantes'][0]) =>
    a.email.localeCompare(b.email),
  departamento: (a: AdminData['participantes'][0], b: AdminData['participantes'][0]) =>
    (a.departamento || '').localeCompare(b.departamento || ''),
  rol: (a: AdminData['participantes'][0], b: AdminData['participantes'][0]) =>
    (a.rol || '').localeCompare(b.rol || ''),
  formularios_completados: (a: AdminData['participantes'][0], b: AdminData['participantes'][0]) =>
    a.formularios_completados - b.formularios_completados,
  created_at: (a: AdminData['participantes'][0], b: AdminData['participantes'][0]) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AdminData | null>(null)
  const [expandedRows, setExpandedRows] = useState<ExpandedRows>({})
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'created_at',
    direction: 'desc',
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin?password=${encodeURIComponent(password)}`)

      if (response.status === 401) {
        setError('Contraseña incorrecta')
        setLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error('Error al cargar los datos')
      }

      const adminData = await response.json()
      setData(adminData)
      setIsLoggedIn(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setData(null)
    setPassword('')
    setError('')
  }

  const toggleRowExpanded = (participanteId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [participanteId]: !prev[participanteId],
    }))
  }

  const handleSort = (key: keyof typeof SORT_FUNCTIONS) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  const getSortedParticipantes = () => {
    if (!data) return []
    const sorted = [...data.participantes]
    const sortFn = SORT_FUNCTIONS[sortConfig.key]
    sorted.sort(sortFn)
    if (sortConfig.direction === 'desc') sorted.reverse()
    return sorted
  }

  const handleExportData = () => {
    if (!data) return
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `kga-f-datos-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const completitudPercentage = data
    ? Math.round((data.total_respuestas / (data.total_participantes * 6)) * 100)
    : 0

  const chartData = data
    ? Object.entries(data.respuestas_por_formulario).map(([formulario, count]) => ({
        name: FORMULARIOS.find((f) => f.id === formulario)?.titulo || formulario,
        value: count,
      }))
    : []

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1E2761] via-[#065A82] to-[#0891B2] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Lock className="w-8 h-8 text-[#1E2761] mr-3" />
            <h1 className="text-2xl font-bold text-[#1E2761]">Panel Admin</h1>
          </div>

          <p className="text-gray-600 text-center mb-6">
            Assessment KGA-F — Fundación Grupo Cajamar
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent outline-none transition"
              />
            </div>

            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0891B2] to-[#065A82] text-white font-semibold py-2 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Cargando datos...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1E2761]">Panel Administrativo</h1>
            <p className="text-gray-600 text-sm mt-1">
              Assessment KGA-F — Fundación Grupo Cajamar
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Participantes */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#1E2761]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Participantes</p>
                <p className="text-3xl font-bold text-[#1E2761] mt-2">
                  {data.total_participantes}
                </p>
              </div>
              <Users className="w-12 h-12 text-[#1E2761] opacity-20" />
            </div>
          </div>

          {/* Total Respuestas */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#065A82]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Respuestas</p>
                <p className="text-3xl font-bold text-[#065A82] mt-2">
                  {data.total_respuestas}
                </p>
              </div>
              <FileText className="w-12 h-12 text-[#065A82] opacity-20" />
            </div>
          </div>

          {/* Tasa de Completitud */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#0891B2]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Tasa de Completitud</p>
                <p className="text-3xl font-bold text-[#0891B2] mt-2">{completitudPercentage}%</p>
                <p className="text-xs text-gray-500 mt-2">
                  {data.total_respuestas} de {data.total_participantes * 6} respuestas
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-[#0891B2] opacity-20" />
            </div>
          </div>

          {/* Puntuación Media Disposición */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-[#F59E0B]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Puntuación Media Disposición
                </p>
                <p className="text-3xl font-bold text-[#F59E0B] mt-2">
                  {data.avg_puntuacion_disposicion.toFixed(1)}
                </p>
              </div>
              <Award className="w-12 h-12 text-[#F59E0B] opacity-20" />
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-[#1E2761] mb-4">Respuestas por Formulario</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
                formatter={(value) => [`${value} respuestas`, 'Count']}
              />
              <Bar dataKey="value" fill="#0891B2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Participantes Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-[#1E2761]">Participantes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('nombre')}
                      className="hover:text-[#0891B2] transition"
                    >
                      Nombre{' '}
                      {sortConfig.key === 'nombre' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('email')}
                      className="hover:text-[#0891B2] transition"
                    >
                      Email{' '}
                      {sortConfig.key === 'email' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('departamento')}
                      className="hover:text-[#0891B2] transition"
                    >
                      Departamento{' '}
                      {sortConfig.key === 'departamento' &&
                        (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('rol')}
                      className="hover:text-[#0891B2] transition"
                    >
                      Rol{' '}
                      {sortConfig.key === 'rol' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('formularios_completados')}
                      className="hover:text-[#0891B2] transition"
                    >
                      Formularios{' '}
                      {sortConfig.key === 'formularios_completados' &&
                        (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('created_at')}
                      className="hover:text-[#0891B2] transition"
                    >
                      Registro{' '}
                      {sortConfig.key === 'created_at' &&
                        (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getSortedParticipantes().map((participante) => (
                  <Fragment key={participante.id}>
                    <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {participante.nombre}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{participante.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {participante.departamento || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {participante.rol || '—'}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0891B2] bg-opacity-10 text-[#0891B2]">
                          {participante.formularios_completados}/6
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(participante.created_at).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => toggleRowExpanded(participante.id)}
                          className="text-[#0891B2] hover:text-[#065A82] font-medium transition"
                        >
                          {expandedRows[participante.id] ? 'Ocultar' : 'Ver'}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Row */}
                    {expandedRows[participante.id] && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div>
                            <h4 className="font-semibold text-[#1E2761] mb-3">
                              Respuestas de {participante.nombre}
                            </h4>
                            {participante.respuestas.length > 0 ? (
                              <div className="space-y-2">
                                {participante.respuestas.map((respuesta) => {
                                  const formulario = FORMULARIOS.find(
                                    (f) => f.id === respuesta.formulario
                                  )
                                  return (
                                    <div
                                      key={respuesta.id}
                                      className="flex items-center justify-between p-3 bg-white rounded border border-gray-200"
                                    >
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-900">
                                          {formulario?.titulo || respuesta.formulario}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {new Date(respuesta.created_at).toLocaleString(
                                            'es-ES'
                                          )}
                                        </p>
                                      </div>
                                      {respuesta.puntuacion_total !== null && (
                                        <div className="text-right">
                                          <p className="font-semibold text-[#0891B2]">
                                            {respuesta.puntuacion_total}
                                          </p>
                                          <p className="text-xs text-gray-500">puntuación</p>
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm italic">
                                No hay respuestas registradas
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0891B2] to-[#065A82] text-white font-semibold rounded-lg hover:shadow-lg transition"
          >
            <Download className="w-5 h-5" />
            Exportar Datos JSON
          </button>
        </div>
      </main>
    </div>
  )
}
