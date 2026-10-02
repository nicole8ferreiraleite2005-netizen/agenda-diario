# 📅 Agenda Diário v2.0

**Modern task management + diary app with warm design & smooth interactions**

🔗 **Live**: https://agenda-diario-seven.vercel.app

---

## ✨ Features

### 📱 Responsive Design
- **Mobile-first**: Optimized for phones, tablets, desktop
- **2-column layout**: Sidebar (desktop) + carousel main content
- **Warm palette**: Orange, Rose, Bege throughout

### 🎯 Core Sections

#### 📝 Tarefas (Tasks)
- Create, edit, delete tasks with dates
- Priority levels: 🔴 Alta / 🟡 Média / 🟢 Baixa
- Date navigation: ← Anterior / Hoje / Próximo →
- Task counter per day
- Empty state with helpful tips

#### 🖼️ Mural (Gallery)
- Showcase completed tasks with photos
- Responsive grid (1-3 columns)
- Lazy-loaded images
- Completion date display
- Stats footer

#### 📅 Calendário (Calendar)
- **4 view modes**: Day / Week / Month / Year
- Year selector (2025-2027)
- Month navigation
- Today highlight
- Interactive date selection

### 🧭 Navigation
- **Visual indicators**: 3 dots showing active section
- **Mouse drag**: Drag left/right to navigate
- **Keyboard**: Arrow Left/Right keys
- **Touch**: Swipe on mobile
- **Keyboard hint**: "← Arrastar ou usar setas do teclado →"

---

## 🎨 Design System

### Color Palette
```
Orange:   #FF9500 (primary), #FF6B35 (dark)
Rose:     #FF0040 (accent), #FF6B9D (light)
Bege:     #FFF8F0 (background)
```

### Animations
- **fadeInUp**: Tasks (0.4s cubic-ease)
- **zoomIn**: Gallery cards (0.4s cubic-ease)
- **Stagger**: 0.1s delay per item

### Responsive Breakpoints
- **sm**: 640px (mobile optimizations)
- **md**: 768px (tablet, no sidebar)
- **lg**: 1024px (desktop, sidebar visible)

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks (useState, useRef, useEffect)
- **Deployment**: Vercel (auto-deploy on push)

---

## 🏃 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# http://localhost:3000

# Login with: agenda123
```

### Build for Production
```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
src/
├── app/
│   └── page.tsx              # Main app + login page
├── components/
│   ├── Carousel.tsx          # Navigation system
│   ├── TasksSection.tsx      # Tasks management
│   ├── MuralSection.tsx      # Photo gallery
│   ├── CalendarSection.tsx   # Calendar views
│   ├── TaskForm.tsx          # Task creation form
│   └── UploadImageModal.tsx  # Photo upload
├── hooks/
│   ├── useCarousel.ts        # Carousel logic
│   ├── useTasks.ts           # Task CRUD
│   └── useSelectedDate.ts    # Date selection
└── lib/
    └── supabase.ts           # Mock data types
```

---

## 🎮 Usage

### Desktop
- Click section indicators (📝, 🖼️, 📅)
- Drag left/right to scroll
- Use arrow keys to navigate

### Mobile
- Tap section indicators
- Swipe left/right to navigate
- Use arrow keys (if keyboard available)

### Creating a Task
1. Click 📝 (Tarefas section)
2. Fill form: Title, Date, Priority, etc.
3. Click "Salvar Tarefa"
4. Task appears in daily list

### Completing a Task
1. Click checkbox next to task
2. Upload photo (optional)
3. Task moves to 🖼️ Mural

---

## 🔐 Auth

**Simple password protection** (for demo):
```
User: any
Password: agenda123
```

Stored in localStorage (session-based).

---

## 📊 Performance

- ✅ Lazy loading on images
- ✅ Will-change for animations (GPU acceleration)
- ✅ Optimized Tailwind build
- ✅ Next.js static prerendering where possible

---

## 🐛 Known Limitations

- Week view (calendar) shows placeholder text
- No real database (mock data in localStorage)
- No image persistence (resets on page reload)
- Single user (password-based only)

---

## 🗺️ Roadmap

- [ ] Drag-to-reorder tasks
- [ ] Advanced filters
- [ ] Task search
- [ ] Week view implementation
- [ ] Dark mode
- [ ] Export (PDF/CSV)
- [ ] Real Supabase integration
- [ ] Push notifications

---

## 📝 License

Personal project - feel free to use as inspiration!

---

**Made with ❤️ by Nicole** | Deployed on Vercel
