import { NextRequest, NextResponse } from 'next/server'

// Seed data (initial tasks)
const SEED_TASKS = [
  {
    id: '1',
    title: 'Estudar React',
    description: '',
    due_date: '2026-10-01',
    due_time: '14:00:00',
    priority: 'medium',
    status: 'pending',
    mural_image_url: null,
    mural_notes: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: '✅ Etapa 2 COMPLETA - Tarefas criadas com sucesso!',
    description: '',
    due_date: '2026-10-01',
    due_time: '',
    priority: 'high',
    status: 'pending',
    mural_image_url: null,
    mural_notes: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Obter tasks do localStorage ou seed data
function getTasks(): any[] {
  try {
    // Simulação: usar globalThis para simular localStorage (Next.js SSR)
    // Em produção real com Node.js, usar arquivo ou DB
    const g = globalThis as any
    if (typeof global !== 'undefined' && !g.__tasksDb) {
      g.__tasksDb = SEED_TASKS
    }
    return g.__tasksDb || SEED_TASKS
  } catch {
    return SEED_TASKS
  }
}

// Salvar tasks (em memória durante SSR, localStorage no browser)
function saveTasks(tasks: any[]): void {
  try {
    if (typeof global !== 'undefined') {
      const g = globalThis as any
      g.__tasksDb = tasks
    }
  } catch {
    // Falha silenciosa em SSR
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')

    let results = getTasks()

    if (date) {
      results = results.filter((t) => t.due_date === date)
    }

    results.sort((a, b) => (a.due_time || '').localeCompare(b.due_time || ''))
    return NextResponse.json(results)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro ao carregar tarefas'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const tasks = getTasks()

    const newTask = {
      id: Date.now().toString(),
      status: 'pending',
      mural_image_url: null,
      mural_notes: '',
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    tasks.push(newTask)
    saveTasks(tasks)

    return NextResponse.json(newTask, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro ao criar tarefa'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updates } = body

    const tasks = getTasks()
    const idx = tasks.findIndex((t) => t.id === id)

    if (idx === -1) {
      return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 })
    }

    tasks[idx] = {
      ...tasks[idx],
      ...updates,
      updated_at: new Date().toISOString(),
    }

    saveTasks(tasks)

    return NextResponse.json(tasks[idx])
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro ao atualizar tarefa'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    const tasks = getTasks()
    const idx = tasks.findIndex((t) => t.id === id)

    if (idx === -1) {
      return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 })
    }

    tasks.splice(idx, 1)
    saveTasks(tasks)

    return NextResponse.json({ success: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Erro ao deletar tarefa'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
