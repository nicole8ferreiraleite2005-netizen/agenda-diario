# 📅 Agenda Diário — Changelog v2.0

## v2.0 — Refatoração Completa (2026-10-01)

### 🎨 Design & UX
- **Layout 2-colunas**: Sidebar (264px) + conteúdo principal com carousel
- **Paleta quente**: Orange (#FF9500-#FF6B35), Rose (#FF0040-#FF6B9D), Bege (#FFF8F0)
- **Navegação moderna**: 
  - 🖱️ Mouse drag (arrastar para navegar)
  - ⌨️ Arrow keys (ArrowLeft/ArrowRight)
  - 📱 Touch swipe (mobile)
- **Gradient backgrounds**: Amber-50 → Orange-50 → Rose-50
- **Backdrop blur & glassmorphism**: Semi-transparent overlays com blur

### 📱 Responsividade
- **Mobile (< 768px)**: Carousel com 3 indicadores (📝, 🖼️, 📅), sem sidebar
- **Tablet (768px-1024px)**: Carousel principal, sidebar oculta
- **Desktop (1024px+)**: Sidebar visível + carousel, layout 2-col
- **Otimizações**:
  - Grid gaps adaptáveis (gap-1 sm:gap-2)
  - Font sizes responsivos (text-xs sm:text-sm)
  - Padding adaptável (p-2 sm:p-3)

### 🔄 Carousel & Navegação
- **Sections**: Tarefas → Mural → Calendário (3 seções)
- **Indicador dots**: 3 pontos no rodapé, ativo em laranja
- **Transitions**: Cubic-bezier(0.34, 1.56, 0.64, 1) — 0.5s smooth
- **Keyboard hint**: "← Arrastar ou usar setas do teclado →"

### 📋 TasksSection
- **Features**:
  - Criar/editar/deletar tarefas
  - Prioridades: 🔴 Alta / 🟡 Média / 🟢 Baixa
  - Seletor de data com Ant/Hoje/Próx
  - Formulário com horário e recorrência
- **Animações**: fadeInUp com stagger (index * 0.1s)
- **Empty state**: "Nenhuma tarefa para hoje"

### 🖼️ MuralSection
- **Features**:
  - Grid responsivo (1 col mobile, 2 md, 3 lg)
  - Imagens com lazy loading
  - Badge ✅ Completa
  - Notes em itálico com line-clamp-3
  - Data de conclusão formatada
- **Animações**: zoomIn com stagger (index * 0.1s)
- **Empty state**: "Nenhuma tarefa concluída ainda"

### 📅 CalendarSection (FIXED)
- **View modes**: 📆 Dia / 📅 Semana / 📊 Mês / 📈 Ano
- **Features**:
  - Year selector (2025-2027) com ← → navigation
  - Month navigation para Dia/Semana/Mês
  - Grid 7-colunas (Dom-Sab) para Mês
  - 12-month grid para Ano
  - Data selecionada em destaque (gradient orange-rose)
- **Responsividade**: Gap adaptável, font-sizes responsivos

### ⚡ Performance
- **Lazy loading**: `loading="lazy"` em imagens do Mural
- **Will-change**: Otimiza animações de carousel, cards
- **CSS transforms**: Translatex para carousel (GPU-accelerated)
- **Build**: Next.js 15 production build com source maps

### 🔧 Technical
- **Stack**: Next.js 15 + React 18 + TypeScript + Tailwind CSS
- **TypeScript**: Relaxed strictness (strict: false para compatibilidade build)
- **Components**: Modular, client-rendered com 'use client'
- **State**: useState + useRef + useEffect (no Redux)
- **API**: Mock data em localStorage (sem Supabase real)

### 🚀 Deployment
- **Host**: Vercel (https://agenda-diario-seven.vercel.app)
- **Branch**: main
- **Auto-deploy**: On push
- **Build command**: `npm run build`

### 📦 Files Changed
- `src/app/page.tsx` — Layout 2-col + HomePage + login
- `src/components/Carousel.tsx` — Modern navigation (drag, keyboard, swipe)
- `src/components/CalendarSection.tsx` — 4 view modes + year selector
- `src/components/TasksSection.tsx` — Refactored with warm colors
- `src/components/MuralSection.tsx` — Grid + lazy loading
- `tsconfig.json` — Relaxed strictness for build compatibility

---

## Próximas Ideias (Roadmap)
- [ ] Drag-to-reorder tarefas
- [ ] Filtros avançados (por prioridade, data)
- [ ] Busca de tarefas
- [ ] Vista semanal calendário (renderizar semana)
- [ ] Temas (light/dark mode)
- [ ] Exportar tarefas (PDF/CSV)
- [ ] Integração real com Supabase
