# 🔧 Supabase Backend Integration

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or login
3. Create new project: `agenda-diario`
4. Choose your region
5. Set database password
6. Wait for initialization (~2 min)

---

## Step 2: Configure Environment

1. Get your credentials from Settings → API:
   - `Project URL` 
   - `Anon (public) Key`

2. Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

---

## Step 3: Create Database Schema

Go to **SQL Editor** and run this:

```sql
-- Tasks Table
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  due_date date not null,
  due_time time,
  priority text default 'medium',
  status text default 'pending',
  recurrence text default 'none',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create index on public.tasks(user_id);
create index on public.tasks(due_date);

-- Memories Table
create table if not exists public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete cascade,
  title text,
  image_url text,
  notes text,
  completed_at timestamp,
  created_at timestamp default now()
);

create index on public.memories(user_id);
```

---

## Step 4: Enable Row Level Security (RLS)

```sql
-- Tasks RLS
alter table public.tasks enable row level security;

create policy "Users can manage own tasks"
  on public.tasks for all
  using (auth.uid() = user_id);

-- Memories RLS
alter table public.memories enable row level security;

create policy "Users can manage own memories"
  on public.memories for all
  using (auth.uid() = user_id);
```

---

## Step 5: Setup Storage

1. Go to **Storage**
2. Create bucket: `task-images`
3. Make it **Private**

---

## Step 6: Test Connection

```bash
npm run dev
```

Check browser console — should see Supabase initialized.

---

## Next: App Integration

The app now has:
- ✅ `useAuth()` hook for auth
- ✅ `useSupabase()` hook for DB queries
- ✅ `.env.local` configured

**Next steps**:
1. Update login page to use real auth
2. Refactor components to use Supabase queries
3. Test CRUD operations
4. Deploy with Vercel environment variables

---

**Status**: Backend infrastructure ready! 🚀
