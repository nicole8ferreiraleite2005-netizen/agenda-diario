# 🚀 Deploy Guide - Agenda Diário

## Quick Start (Vercel)

### 1. Prerequisites
- Git repository initialized
- Vercel account (https://vercel.com)
- GitHub/GitLab/Bitbucket account

### 2. Push to Git
```bash
git add .
git commit -m "feat: initial agenda-diario release"
git push origin main
```

### 3. Deploy to Vercel
```bash
# Option A: Via CLI
npm i -g vercel
vercel

# Option B: Via Web
# 1. Go to vercel.com/dashboard
# 2. Click "New Project"
# 3. Import this repository
# 4. Configure environment variables
# 5. Deploy
```

### 4. Environment Variables (Vercel Settings)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 5. Post-Deploy
- ✅ Test login: `agenda123`
- ✅ Create task
- ✅ Upload image
- ✅ Verify persistence

---

## Development Mode (Local)

```bash
npm install
npm run dev
# Opens http://localhost:3000
```

## Production Build (Local)

```bash
npm run build
npm run start
```

---

## Architecture

- **Framework:** Next.js 15 (App Router)
- **UI:** React 18 + Tailwind CSS
- **State:** React Hooks + custom hooks
- **API:** Route handlers (`/api/*`)
- **Storage:** localStorage (persistent in-memory)
- **Database:** Supabase (optional, currently mocked)

---

## Features

✅ Task CRUD (Create, Read, Update, Delete)
✅ Carousel navigation (3 sections)
✅ Image upload modal
✅ Task completion with photos
✅ Persistent storage
✅ Responsive design (mobile-first)
✅ localStorage persistence

---

## Troubleshooting

### Build fails
- Clear `.next` folder: `rm -rf .next`
- Reinstall deps: `rm -rf node_modules && npm install`
- Check Node version: `node --version` (should be 18+)

### Images not uploading
- Verify Supabase credentials in `.env.local`
- Check bucket `task-images` exists in Supabase
- Enable public access on bucket

### Login not working
- Default password: `agenda123`
- Check localStorage: browser DevTools → Application → localStorage

---

## Performance Optimization (Future)

- [ ] Image optimization (Next.js Image)
- [ ] Code splitting
- [ ] Caching strategy
- [ ] Database indexing
- [ ] CDN for images

---

**Deployed:** [vercel-url-here]
**Status:** Production Ready ✅
