-- Desabilitar Row Level Security em todas as tabelas
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE task_attachments DISABLE ROW LEVEL SECURITY;
ALTER TABLE task_notes DISABLE ROW LEVEL SECURITY;
ALTER TABLE sent_reminders DISABLE ROW LEVEL SECURITY;

-- Verificar se RLS está desabilitado
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
