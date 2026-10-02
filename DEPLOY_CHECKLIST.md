# ✅ Deploy Checklist - Agenda Diário

## Pre-Deploy Validation

- [ ] `npm run build` succeeds locally
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No ESLint warnings: `npm run lint`
- [ ] `.env.local` has valid Supabase credentials (or mock values)
- [ ] `vercel.json` configured
- [ ] `package.json` has all dependencies
- [ ] `.gitignore` excludes `.env.local`, `.next`, `node_modules`

## Git Setup

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit: agenda-diario"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/agenda-diario.git
git push -u origin main
```

## Vercel Deployment

### Option 1: CLI
```bash
npm i -g vercel
cd /path/to/agenda-diario
vercel
# Follow prompts, link to GitHub repo
```

### Option 2: Web Dashboard
1. Login to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import GitHub repository
4. Framework: Next.js (auto-detected)
5. Build Command: `next build` ✓
6. Install Command: `npm ci` ✓
7. Output Directory: `.next` ✓

## Environment Variables (Vercel)

In Vercel Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Post-Deployment Tests

- [ ] Visit deployed URL
- [ ] Test login with `agenda123`
- [ ] Create new task
- [ ] Mark task complete
- [ ] Upload image (check Supabase bucket)
- [ ] Refresh page (test persistence)
- [ ] Navigate carousel (swipe on mobile)
- [ ] Check Mural section (shows completed tasks)
- [ ] Test on mobile (375px viewport)

## Monitoring

- [ ] Enable Analytics in Vercel
- [ ] Set up error tracking (Sentry optional)
- [ ] Monitor Build & Deployment logs
- [ ] Check Performance metrics

## Rollback Plan

If deployment fails:
```bash
vercel rollback  # Revert to previous deployment
# OR manually trigger deploy from commit
```

## Notes

- **Dev URL:** http://localhost:3000
- **Prod URL:** [INSERT VERCEL URL]
- **Repository:** [INSERT GITHUB URL]
- **Status:** [ ] Live | [ ] Staging | [ ] Failed

---

**Deployed By:** Claude (Autonomous)
**Date:** 2026-10-01
**Version:** 1.0
