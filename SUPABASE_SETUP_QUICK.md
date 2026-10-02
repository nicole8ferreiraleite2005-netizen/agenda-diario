# SUPABASE BACKEND SETUP - Opção 2

## Passo 1: Criar Conta Supabase

1. Acesse: https://supabase.com
2. Clique: "Start your project"
3. Sign up com GitHub ou Email
4. Crie novo projeto
5. Escolha região: São Paulo (sa-east-1)
6. Aguarde inicialização (~2 min)

## Passo 2: Obter Credenciais

1. Vá para: Project Settings → API
2. Copie:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **anon public key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)

## Passo 3: Configurar .env.local

Crie arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...sua_chave...
```

## Passo 4: Criar Tabelas (Optional)

Execute no SQL Editor do Supabase:

```sql
-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  due_time TIME,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'pending',
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Memories table
CREATE TABLE IF NOT EXISTS memories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT,
  notes TEXT,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can access own tasks" ON tasks
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access own memories" ON memories
  FOR ALL USING (auth.uid() = (SELECT user_id FROM tasks WHERE id = task_id));
```

## Passo 5: Testar Localmente

```bash
npm run dev
# Acessar http://localhost:3002
# Login com credenciais de teste
```

## Status

✅ App funcionando com localStorage
✅ Pronto para conectar Supabase
⏳ Aguardando credenciais (optional)

## Próximo

Se tiver credenciais Supabase:
1. Crie `.env.local` com os valores
2. Reinicie dev server
3. App sincronizará com Supabase

Se preferir manter localStorage por enquanto:
1. Continue com Opção 3 (Testes)
2. Supabase fica para depois
