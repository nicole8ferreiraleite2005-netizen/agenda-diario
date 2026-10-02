'use client'

import { useState, useEffect } from 'react'
import { Carousel } from '@/components/Carousel'
import { TasksSection } from '@/components/TasksSection'
import { MuralSection } from '@/components/MuralSection'
import { CalendarSection } from '@/components/CalendarSection'
import { useCarousel } from '@/hooks/useCarousel'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const { loading } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const auth = localStorage.getItem('auth')
      if (auth === 'true') {
        setIsLoggedIn(true)
      }
    } catch (e) {
      console.log('localStorage not available')
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'agenda123') {
      setIsLoggedIn(true)
      setError('')
      try {
        localStorage.setItem('auth', 'true')
      } catch (e) {
        console.log('localStorage not available')
      }
    } else {
      setError('Senha incorreta')
      setPassword('')
    }
  }

  if (!mounted || loading) return null

  if (isLoggedIn) {
    return <HomePage />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">📅 Cronograma & Diário</h1>
        <p className="text-gray-600 text-center mb-8">Seu calendário pessoal com lembretes automáticos</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          🔒 Senha padrão: <code className="bg-gray-100 px-2 py-1 rounded">agenda123</code>
        </p>
      </div>
    </main>
  )
}

function HomePage() {
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  const { activeSection, goToPrevious, goToNext, goToSection } = useCarousel()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex flex-col md:flex-row">
      {/* Sidebar Esquerdo */}
      <aside className="hidden lg:flex lg:w-64 flex-col bg-white/80 backdrop-blur border-r border-orange-200 p-6 gap-8 md:p-4 md:gap-6">
        {/* Logo/Header com Logout */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center text-white font-bold">
              📅
            </div>
            <h1 className="text-xl font-bold text-gray-800">Agenda</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800 transition"
            title="Logout"
          >
            🚪
          </button>
        </div>

        {/* Calendário Semanal */}
        <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Esta Semana</h2>
          <div className="space-y-2">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'].map((dia, i) => (
              <div key={dia} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                i === 2 ? 'bg-orange-400 text-white' : 'bg-white/60 text-gray-700 hover:bg-white'
              }`}>
                {dia}
              </div>
            ))}
          </div>
        </div>

        {/* Atividades Rápidas */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Atividades</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 bg-orange-100/50 rounded-lg hover:bg-orange-100 transition cursor-pointer">
              <span className="text-lg">📝</span>
              <span className="text-sm text-gray-700">Tarefas do dia</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-amber-100/50 rounded-lg hover:bg-amber-100 transition cursor-pointer">
              <span className="text-lg">🖼️</span>
              <span className="text-sm text-gray-700">Mural</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-rose-100/50 rounded-lg hover:bg-rose-100 transition cursor-pointer">
              <span className="text-lg">📅</span>
              <span className="text-sm text-gray-700">Calendário</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-auto pt-4 border-t border-orange-200">
          <div className="text-center text-xs text-gray-600">
            <p className="font-semibold text-gray-700">3 tarefas</p>
            <p>para hoje</p>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col">
        {/* Indicador de Seção (Mobile) */}
        <div className="md:hidden flex gap-2 justify-center p-4 bg-white/80 backdrop-blur border-b border-orange-200">
          <button
            onClick={() => goToSection('tasks')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeSection === 'tasks'
                ? 'bg-orange-400 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📝
          </button>
          <button
            onClick={() => goToSection('mural')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeSection === 'mural'
                ? 'bg-orange-400 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🖼️
          </button>
          <button
            onClick={() => goToSection('calendar')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeSection === 'calendar'
                ? 'bg-orange-400 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📅
          </button>
        </div>

        {/* Carousel Melhorado */}
        <Carousel
          activeSection={activeSection}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onGoToSection={goToSection}
          tasks={<TasksSection />}
          mural={<MuralSection />}
          calendar={<CalendarSection />}
        />
      </main>
    </div>
  )
}
