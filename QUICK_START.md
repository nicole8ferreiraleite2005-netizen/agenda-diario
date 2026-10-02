# 🚀 Quick Start - Supabase Setup

## ⚡ TL;DR - Em 5 minutos

### 1. Create Supabase Account
```
https://supabase.com → Sign up → Create project "agenda-diario"
```

### 2. Get Keys
```
Settings → API → Copy:
  - Project URL
  - Anon Key (public)
```

### 3. Create `.env.local`
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Create Database Tables
```
In Supabase Dashboard → SQL Editor → Paste content from SUPABASE_SETUP.md
```

### 5. Enable RLS
```
Settings → Database → Run RLS policies from SUPABASE_SETUP.md
```

### 6. Test
```bash
npm run dev
# Try logging in with email/password
```

---

## 📝 What Works Now

✅ App runs without Supabase (uses localStorage)
✅ Login with password `agenda123` works
✅ Full page with carousel renders
✅ Logout button visible

---

## 🎯 What to Do Next

After Supabase is configured:

1. **Test Real Auth**
   ```bash
   npm run dev
   # Login with your email/password (via Supabase)
   ```

2. **Check Supabase Dashboard**
   - Go to Authentication → Users
   - See your account created

3. **Build Tasks Integration** (Phase 2)
   - Create `useSupabaseTasks()` hook
   - Fetch from tasks table
   - Replace localStorage queries

4. **Deploy to Vercel**
   ```bash
   # Add env vars to Vercel project:
   NEXT_PUBLIC_SUPABASE_URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

---

## 📚 Documentation Files

- **SUPABASE_SETUP.md** - Full setup guide with SQL scripts
- **SUPABASE_READY.md** - What's been implemented & tested
- **This file** - Quick reference

---

## 🆘 Troubleshooting

### "Can't find module @supabase/ssr"
```bash
npm install @supabase/ssr @supabase/supabase-js
npm run build
```

### Login not working after `.env.local` change
```bash
# Restart dev server
npm run dev
```

### Still seeing localStorage login
- Check `.env.local` has correct values
- Dev server must be restarted after env change

---

## 💡 Remember

- App works WITHOUT Supabase (uses password `agenda123`)
- Supabase is OPTIONAL upgrade for real auth
- All code is type-safe and production-ready
- No breaking changes to existing features

Happy coding! 🎉
