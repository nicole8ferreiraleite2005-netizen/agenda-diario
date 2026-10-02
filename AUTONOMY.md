# 🤖 Instruções de Desenvolvimento Autônomo

## 🎯 Objetivo Principal
Desenvolvimento contínuo e autônomo do aplicativo de gerenciamento de tarefas. Claude deve prosseguir com as próximas etapas de forma independente, tomando decisões técnicas, resolvendo bloqueadores e entregando funcionalidades completas sem parar para pedir aprovação a cada passo.

---

## ✅ Status Atual (10/01/2026)

### Arquitetura Implementada
- ✅ **Next.js 15** com App Router
- ✅ **React 18** com hooks
- ✅ **TypeScript** tipagem completa
- ✅ **Tailwind CSS** estilos

### Componentes Construídos
- ✅ **Carousel.tsx** - 3 seções navegáveis (Tarefas, Mural, Calendário) com swipe/touch
- ✅ **TasksSection.tsx** - CRUD tarefas, lista diária, mini-calendário
- ✅ **MuralSection.tsx** - Grid tarefas concluídas com imagens
- ✅ **CalendarSection.tsx** - Visualizador mês/semana/dia (apenas mês implementado)
- ✅ **UploadImageModal.tsx** - Modal para upload de prova com Portal
- ✅ **Portal.tsx** - React Portal para escapar overflow-hidden
- ✅ **TaskForm.tsx** - Formulário criar/editar tarefas
- ✅ **page.tsx** - Home com autenticação localStorage

### APIs Construídas
- ✅ **/api/upload** - Upload de imagem (mock URL, pronto para Supabase)
- ✅ **/api/tasks** - GET/POST/PATCH/DELETE com store em memória
- ⚠️ Persistência: In-memory durante sessão, **NÃO persiste após refresh**

### Fluxos Testados
- ✅ Checkbox tarefa → Modal abre (Portal funciona!)
- ✅ File input → Arquivo injetado
- ✅ Upload button → POST /api/upload (201 Created)
- ✅ onUpload callback → PATCH /api/tasks
- ✅ Carousel navega entre 3 seções
- ✅ Sem erros de compilação

### Arquivos Principais
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              ← Login + HomePage com Carousel
│   └── api/
│       ├── upload/route.ts   ← Mock upload
│       └── tasks/route.ts    ← In-memory store
├── components/
│   ├── Carousel.tsx          ← 300% width, CSS transform
│   ├── TasksSection.tsx      ← CRUD + mini-cal
│   ├── MuralSection.tsx      ← Grid imagens
│   ├── CalendarSection.tsx   ← Mês/semana/dia view
│   ├── UploadImageModal.tsx  ← Portal modal
│   ├── Portal.tsx            ← React.createPortal wrapper
│   ├── TaskForm.tsx          ← Criar/editar
│   └── (outros componentes)
├── hooks/
│   ├── useTasks.ts           ← Fetch/CRUD tasks
│   ├── useSelectedDate.ts
│   ├── useCarousel.ts
│   └── ...
└── lib/
    └── supabase.ts           ← Types, setup

```

---

## 📋 Próximas Etapas (ORDEM EXECUTÁVEL)

### 1️⃣ **PERSISTÊNCIA LOCAL (localStorage)** ⭐ CRÍTICO
**Status:** Bloqueador
**Tempo Est:** 45 min

- [ ] Migrar `/api/tasks` de in-memory para localStorage
  - Salvar array de tarefas em `localStorage.setItem('tasks', JSON.stringify(...))`
  - Carregar no GET com `localStorage.getItem('tasks')`
  - Testar CRUD (create, read, update, delete)
  
- [ ] Validar persistência
  - Criar tarefa → Refresh → Tarefa persiste ✓
  - Marcar concluída → Refresh → Status persiste ✓
  - Upload imagem → Refresh → Imagem URL persiste ✓

**Critério Aprovação:** Dados sobrevivem F5

---

### 2️⃣ **SUPABASE REAL (Produção)** 
**Status:** Bloqueador
**Tempo Est:** 30 min
**Pré-req:** Completar 1️⃣

- [ ] Configurar `.env.local` com credenciais Supabase reais:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://...
  SUPABASE_SERVICE_ROLE_KEY=eyJ...
  ```

- [ ] Migrar `/api/tasks` de localStorage para Supabase
  - Remover store em-memória
  - Usar `createClient(url, serviceRoleKey)` real
  - RLS: Usar service-role para bypass (server-side)
  
- [ ] Verificar/corrigir RLS policies na tabela `tasks`
  - RLS pode estar bloqueando leitura
  - Solução: `ALTER POLICY ... USING (auth.role() = 'service_role')`
  
- [ ] Validar fluxo completo end-to-end
  - Criar tarefa → Persiste em Supabase
  - Upload imagem → URL salva
  - Tarefa aparece em Mural após refresh

**Critério Aprovação:** Dados em Supabase produção, fluxo completo funciona

---

### 3️⃣ **STYLING & UX (Fase 4)** 
**Status:** Pronto para iniciar
**Tempo Est:** 2-3 horas
**Pré-req:** Completar 2️⃣

#### A) Responsividade Mobile
- [ ] Testar em viewport 375px (mobile preset)
- [ ] Ajustar padding/margins para mobile
- [ ] Verificar overflow/scroll em modais
- [ ] Touch-friendly button sizes (min 44x44px)

#### B) Animações & Transições
- [ ] Carousel: Slide animation (0.3s ease-in-out) ✓ Já existe
- [ ] Modal: Fade-in overlay (0.2s)
- [ ] Checkbox: Scale animation on complete
- [ ] Buttons: Hover states melhorados

#### C) Cores & Temas
- [ ] Paleta consistente (azul primário #3B82F6)
- [ ] Estados visuais (pending/completed/overdue)
- [ ] Dark mode (opcional)

#### D) Typography
- [ ] Font weights consistentes
- [ ] Tamanho fonte legível (min 16px mobile)
- [ ] Line-height adequado (1.5-1.6)

#### E) Grid Mural
- [ ] Responsivo (3 cols desktop, 2 tablet, 1 mobile)
- [ ] Aspect ratio consistente (quadrada)
- [ ] Hover com zoom/overlay

**Critério Aprovação:** UI polida em mobile/tablet/desktop

---

### 4️⃣ **TESTING & QA** 
**Status:** Pronto para iniciar
**Tempo Est:** 1-2 horas
**Pré-req:** Completar 3️⃣

#### A) Fluxos Críticos
- [ ] Login → Criar tarefa → Marcar concluída → Mural
- [ ] Upload sem arquivo → Erro handling
- [ ] Editar tarefa → Atualiza lista
- [ ] Deletar tarefa → Remove de Mural
- [ ] Navegar carousel → Não quebra scroll

#### B) Validações
- [ ] Título obrigatório (não salva vazio)
- [ ] Data obrigatória (não permite passado)
- [ ] Campos opcionais funcionam (descrição, horário)
- [ ] Prioridade default = medium

#### C) Edge Cases
- [ ] Criar múltiplas tarefas mesmo dia
- [ ] Completar todas tarefas do dia (Mural fica cheio)
- [ ] Tarefa com espaços em branco no título
- [ ] Imagem grande (>5MB) no upload
- [ ] Refresh durante operação em andamento

#### D) Performance
- [ ] Lista com 100+ tarefas carrega sem lag
- [ ] Swipe smooth mesmo com modal aberto
- [ ] Upload não trava UI

**Critério Aprovação:** Sem bugs, UX fluida, performance aceitável

---

## 🤖 Modo de Operação Autônomo

### Decisões Técnicas
✅ **AUTORIZADAS (sem consulta):**
- Refatorar código para qualidade/performance
- Mudar estrutura de pastas se melhorar legibilidade
- Atualizar dependências (npm update)
- Criar novos componentes/hooks conforme necessário
- Escolher entre localStorage/IndexedDB/Supabase
- Ajustar estilos CSS/Tailwind
- Adicionar validações/tratamento de erro

### Comunicação
- **Não**: Mensagens de log para cada mudança
- **Sim**: Relatório resumido a cada etapa completa
- **Bloqueador**: Comunicar imediatamente se trava

### Formato Relatório (ao final de cada etapa)
```
## ✅ ETAPA N COMPLETA

**O que foi feito:**
- Item 1
- Item 2

**Tempo investido:** XX min

**Próximo:** Etapa N+1

**Status bloqueador:** (Nenhum | Descrição)
```

---

## ⚠️ Bloqueadores Conhecidos & Soluções

### 1. RLS (Row Level Security) Supabase
**Sintoma:** PATCH /api/tasks retorna 403
**Causa:** Policy não permite service-role
**Solução:** 
```sql
ALTER POLICY "Enable updates for authenticated users" 
ON tasks 
USING (auth.role() = 'service_role' OR auth.uid() = user_id);
```

### 2. Dados não persistem após refresh
**Sintoma:** Tarefa marcada como concluída desaparece após F5
**Causa:** In-memory store é perdido
**Solução:** Implementar localStorage ou Supabase (Etapa 1 & 2)

### 3. Modal clipping no Carousel
**Sintoma:** Modal cortado por overflow-hidden
**Causa:** Portal renderiza fora do Carousel
**Status:** ✅ RESOLVIDO (Portal.tsx implementado)

### 4. Arquivo Supabase vazio
**Sintoma:** `NEXT_PUBLIC_SUPABASE_URL=""` bloqueia requisições
**Solução:** Configurar `.env.local` antes de usar Supabase real

### 5. Upload sem arquivo
**Sintoma:** Button fica habilitado sem arquivo selecionado
**Status:** ✅ RESOLVIDO (button disabled={!imageFile})

---

## 📊 Checklist Conclusão

### Etapa 1: Persistência localStorage
- [ ] `/api/tasks` migrado para localStorage
- [ ] GET retorna dados salvos
- [ ] POST adiciona a store
- [ ] PATCH atualiza e salva
- [ ] DELETE remove e salva
- [ ] Dados sobrevivem refresh (F5)
- [ ] Console sem erros

### Etapa 2: Supabase Produção
- [ ] `.env.local` configurado com credenciais reais
- [ ] `/api/tasks` migrado de localStorage para Supabase
- [ ] RLS policies verificadas/corrigidas
- [ ] Fluxo completo testado end-to-end
- [ ] Tarefa → Upload → Mural funciona
- [ ] Dados persistem em DB real

### Etapa 3: Styling
- [ ] Responsivo (mobile 375px, tablet 768px, desktop)
- [ ] Animações suaves (Carousel, Modal, Buttons)
- [ ] Cores consistentes e legíveis
- [ ] Typography adequada
- [ ] Grid Mural responsivo
- [ ] Sem erros de estilo no console

### Etapa 4: Testing
- [ ] 5 fluxos críticos testados
- [ ] 5 validações testadas
- [ ] 5 edge cases testados
- [ ] Performance aceitável
- [ ] Nenhum bug encontrado
- [ ] UX fluida em todos cenários

---

## 🏁 Critério Final de Conclusão

**Trabalho completo quando:**
1. ✅ Etapa 1 (localStorage) pronta
2. ✅ Etapa 2 (Supabase) pronta
3. ✅ Etapa 3 (Styling) pronta
4. ✅ Etapa 4 (Testing) pronta
5. ✅ Sem bloqueadores abertos
6. ✅ Relatório final enviado

**Relatório Final deve conter:**
- Resumo do que foi feito
- Screenshots/evidência de funcionamento
- Tempo total investido
- Próximos passos (se houver)
- Deploy instructions (se aplicável)

---

## 📞 Escalação

**Contactar usuário IMEDIATAMENTE se:**
- Erro que não consegue resolver
- Precisa credencial/senha não fornecida
- Atinge limite de token/tempo
- Task scope creep (solicitação adicional)
- RLS bloqueando irrecuperavelmente

**Não contactar para:**
- Progresso normal
- Decisões técnicas (você tem autonomia)
- Dúvidas sobre código (você pode explorar)
- Testes que falham (você pode ajustar/debugar)

---

## 📚 Referências

**Documentação:**
- Next.js 15: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- React: https://react.dev

**Arquivos Chave:**
- `.env.local` (criar com credenciais Supabase)
- `src/app/api/tasks/route.ts` (lógica API)
- `src/components/UploadImageModal.tsx` (fluxo upload)
- `src/hooks/useTasks.ts` (gerenciamento estado)

---

**Versão:** 1.0
**Atualizado:** 2026-10-01
**Autorizado por:** User
