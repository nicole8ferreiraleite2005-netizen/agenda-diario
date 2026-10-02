-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de Categorias
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tarefas
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  due_time TIME,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  priority VARCHAR(10) DEFAULT 'medium', -- low, medium, high
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, cancelled
  recurrence VARCHAR(20) DEFAULT 'none', -- none, daily, weekly, monthly
  reminder_before_hours INTEGER DEFAULT 24,
  reminder_before_day BOOLEAN DEFAULT FALSE,
  reminder_before_hours_2 INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de Anexos (para tarefas concluídas)
CREATE TABLE IF NOT EXISTS task_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  file_url VARCHAR(500) NOT NULL,
  file_name VARCHAR(255),
  file_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Notas de Conclusão (diário)
CREATE TABLE IF NOT EXISTS task_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Lembretes Enviados (para não enviar duas vezes)
CREATE TABLE IF NOT EXISTS sent_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  reminder_type VARCHAR(20), -- before_day, before_hours
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(task_id, reminder_type)
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_category ON tasks(category_id);
CREATE INDEX IF NOT EXISTS idx_task_attachments_task_id ON task_attachments(task_id);
CREATE INDEX IF NOT EXISTS idx_task_notes_task_id ON task_notes(task_id);

-- Inserir categorias padrão
INSERT INTO categories (name, color) VALUES
  ('Trabalho', '#EF4444'),
  ('Pessoal', '#3B82F6'),
  ('Saúde', '#10B981'),
  ('Lazer', '#F59E0B'),
  ('Financeiro', '#8B5CF6')
ON CONFLICT DO NOTHING;

-- RLS (Row Level Security) - Desabilitar por enquanto (usar com cuidado em produção)
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE task_attachments ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE task_notes ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE sent_reminders ENABLE ROW LEVEL SECURITY;
