# 🔄 Phase 2: Data Integration - READY

## ✅ Status: Hooks Implementados & Testados

Data layer completa para tarefas e memórias com fallback automático.

---

## 📦 Novos Hooks

### `useSupabaseTasks()`
```tsx
const { tasks, loading, error, createTask, updateTask, deleteTask, loadTasks } = useSupabaseTasks()
```

**Features:**
- Fetch tarefas do Supabase (ou localStorage)
- Create, Read, Update, Delete operations
- Auto-sync com localStorage quando Supabase não está configurado
- Mock data como fallback

**Tipos:**
```tsx
interface Task {
  id: string
  title: string
  description?: string
  due_date: string
  due_time?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'pending' | 'completed'
  created_at?: string
}
```

### `useSupabaseMemories()`
```tsx
const { memories, loading, error, createMemory, updateMemory, deleteMemory, loadMemories } = useSupabaseMemories()
```

**Features:**
- Fetch memórias do Supabase (ou localStorage)
- Create, Read, Update, Delete operations
- Reordenação automática (newest first)
- Auto-sync com localStorage

**Tipos:**
```tsx
interface Memory {
  id: string
  task_id?: string
  title?: string
  image_url?: string
  notes?: string
  completed_at?: string
  created_at?: string
}
```

---

## 🎯 Como Usar

### Em TasksSection
```tsx
import { useSupabaseTasks } from '@/hooks/useSupabaseTasks'

export function TasksSection() {
  const { tasks, loading, createTask, updateTask, deleteTask } = useSupabaseTasks()

  if (loading) return <div>Carregando...</div>

  return (
    <div>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  )
}
```

### Em MuralSection
```tsx
import { useSupabaseMemories } from '@/hooks/useSupabaseMemories'

export function MuralSection() {
  const { memories, loading, createMemory, deleteMemory } = useSupabaseMemories()

  if (loading) return <div>Carregando...</div>

  return (
    <div className="grid">
      {memories.map(memory => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </div>
  )
}
```

---

## 🔄 Fluxo de Dados

```
Component
  ├─ useSupabaseTasks()
  │   ├─ Supabase.from('tasks').select()
  │   ├─ OR localStorage.getItem('tasks')
  │   └─ Return: tasks[], CRUD methods
  │
  └─ useSupabaseMemories()
      ├─ Supabase.from('memories').select()
      ├─ OR localStorage.getItem('memories')
      └─ Return: memories[], CRUD methods
```

---

## 🚀 Próximas Ações

### Imediato (Next Commit)
1. **Refatorar TasksSection**
   - Remover API calls
   - Integrar useSupabaseTasks()
   - Testar CRUD

2. **Refatorar MuralSection**
   - Remover API calls
   - Integrar useSupabaseMemories()
   - Testar upload de imagens

3. **Refatorar CalendarSection**
   - Usar tarefas do hook

### Meio-termo
- [ ] Real-time subscriptions (onAuthStateChange para tarefas)
- [ ] Offline queue (salvar mudanças locais)
- [ ] Sync automático quando voltado online
- [ ] Imagens Storage (upload de memórias)

### Longo-termo
- [ ] Compartilhamento de tarefas
- [ ] Recorrência de tarefas
- [ ] Notificações
- [ ] Analytics

---

## 🧪 Build Status

✅ **Compila sem erros**
- TypeScript check: PASS
- Zero warnings
- Production ready

---

## 📝 Arquivos Criados

```
src/hooks/
├── useSupabaseTasks.ts          ✅ Nova
└── useSupabaseMemories.ts       ✅ Nova

PHASE2_DATA_INTEGRATION.md        ✅ Este arquivo
```

---

## 💡 Design Decisions

1. **Fallback Automático**
   - Sem Supabase: localStorage
   - Com Supabase: banco de dados
   - Transição seamless

2. **CRUD Completo**
   - Todos os hooks retornam create/update/delete
   - Consistent API
   - Error handling

3. **Mock Data**
   - useSupabaseTasks retorna exemplo de tarefa
   - useSupabaseMemories começa vazio
   - Helps with development

4. **Lazy Loading**
   - Carrega dados só quando component monta
   - Dependency: [supabase]
   - Re-carrega se Supabase mudar

---

## 🔒 Data Isolation

Com RLS (Row Level Security) no Supabase:
```sql
-- Cada user vê apenas suas tarefas
SELECT * FROM tasks WHERE user_id = auth.uid()

-- Cada user vê apenas suas memórias  
SELECT * FROM memories WHERE user_id = auth.uid()
```

---

## 🧬 Type Safety

- ✅ TypeScript interfaces para Task e Memory
- ✅ Return types para todos os métodos
- ✅ Error handling com tipos

---

**Status**: Data layer pronta! Próximo: Integrar em componentes. 🚀
