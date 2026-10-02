# 🚀 Phase 6: Deploy & Production - GUIDE

**Data**: 2026-10-02  
**Status**: ⏳ READY TO DEPLOY  

---

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] Production build passes
- [x] Zero TypeScript errors
- [x] All features tested
- [x] Components memoized
- [x] Error handling in place

### ✅ Features Complete
- [x] Auth system (useAuth)
- [x] Data layer (Supabase hooks)
- [x] Offline support (useOfflineQueue)
- [x] Error handling (ErrorBoundary)
- [x] UX polish (Toast, ConfirmDialog)

### ⏳ Before Deployment
- [ ] Configure actual Supabase account
- [ ] Set environment variables
- [ ] Test with production Supabase
- [ ] Verify auth flow
- [ ] Check offline mode works

---

## Vercel Deployment Steps

### 1. Initialize Git Repository
```bash
cd agenda-diario
git init
git add .
git commit -m "Initial commit: Agenda Diário v2.0 with Supabase"
```

### 2. Create GitHub Repository
- Go to github.com/new
- Create repo "agenda-diario" (or your choice)
- Follow GitHub instructions to add remote:
```bash
git remote add origin https://github.com/YOUR_USERNAME/agenda-diario.git
git branch -M main
git push -u origin main
```

### 3. Create .env.local
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Deploy to Vercel
**Option A: Using Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option B: Using Web UI**
- Go to vercel.com/new
- Import your GitHub repository
- Vercel auto-detects Next.js
- Add environment variables
- Deploy!

### 5. Set Environment Variables in Vercel
In Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
```

---

## Production Supabase Setup

### 1. Create Supabase Account
- Go to supabase.com
- Create new project
- Choose region closest to users

### 2. Get Credentials
- Project Settings → API
- Copy:
  - Project URL → NEXT_PUBLIC_SUPABASE_URL
  - Anon Key → NEXT_PUBLIC_SUPABASE_ANON_KEY

### 3. Configure Database
The app uses localStorage fallback, so:
- Optional: Create tables manually in Supabase
- Or: Keep localStorage-only for MVP
- Later: Migrate to Supabase when ready

### 4. Configure Auth (Optional)
- Authentication → Providers
- Enable Email/Password or OAuth (Google, GitHub)
- Set redirect URL to your Vercel domain

### 5. Setup RLS (Row Level Security)
Example policy for tasks table:
```sql
CREATE POLICY "Users can access own tasks" ON tasks
  FOR ALL USING (auth.uid() = user_id);
```

---

## Post-Deployment Verification

### ✅ Check These Work:
- [ ] App loads from Vercel domain
- [ ] Calendar displays correctly
- [ ] Tasks can be created/edited/deleted
- [ ] Mural section shows completed tasks
- [ ] Auth login/logout works
- [ ] Offline mode works (disable internet)
- [ ] Toasts appear on actions
- [ ] Error boundary catches errors
- [ ] Mobile responsive works

### ✅ Performance Checks:
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Monitor build size
- [ ] Check API response times

---

## Monitoring & Maintenance

### Vercel Analytics
- Dashboard → Analytics
- Monitor page performance
- Track user errors
- Check uptime

### Error Tracking
- Monitor.vercel.com (with Pro plan)
- Or: Setup Sentry for error logging
- Custom logging to database

### Backup Strategy
- Regular Supabase backups (automatic on Pro)
- Export data weekly
- Version control for code

---

## Environment Variables Reference

| Variable | Required | Example |
|----------|----------|---------|
| NEXT_PUBLIC_SUPABASE_URL | No* | https://xxx.supabase.co |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | No* | eyJxxx... |

*Public - can be in frontend code

---

## Rollback Plan

If deployment fails:
```bash
# Revert to last working commit
git revert HEAD
git push origin main

# Vercel automatically redeploys
# Check deployment history in Vercel dashboard
```

---

## Next Steps

1. **Push to GitHub** (if not already done)
2. **Create Supabase account** (if you want live backend)
3. **Deploy to Vercel** (via CLI or web UI)
4. **Configure environment variables**
5. **Verify all features work**
6. **Share link with users!** 🎉

---

## Phase 6 Status

- [x] Deployment guide created
- [x] Pre-deployment checklist ready
- [x] Code ready for production
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Verify in production

**Next**: Phase 7 (Advanced Features) or maintain current release

---

**Ready to go live! 🚀**
