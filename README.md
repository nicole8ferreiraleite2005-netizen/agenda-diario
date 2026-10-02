# 📅 Cronograma & Diário

Um web app pessoal de cronograma com lembretes automáticos, diário inteligente e mural de retrospectiva com IA.

## 🚀 Começando

### Pré-requisitos
- Node.js 18+ e npm
- Conta Supabase
- Conta Resend
- Conta Anthropic

### Instalação

1. **Clone ou copie o projeto**
```bash
cd agenda-diario
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas chaves:
- `NEXT_PUBLIC_SUPABASE_URL`: URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Chave pública do Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Chave secreta do Supabase
- `RESEND_API_KEY`: API Key do Resend
- `RESEND_EMAIL_FROM`: Domínio de e-mail do Resend (ex: onboarding@resend.dev)
- `ANTHROPIC_API_KEY`: API Key do Anthropic (Claude)

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

**Login padrão:**
- Senha: `agenda123`

## 📊 Estrutura do Projeto

```
agenda-diario/
├── src/
│   └── app/
│       ├── layout.tsx       # Layout raiz
│       ├── page.tsx         # Página inicial com login
│       └── globals.css      # Estilos globais
├── public/                  # Arquivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .env.local              # Variáveis de ambiente
```

## 🎯 Roadmap

- [x] Setup inicial com Next.js, TypeScript, Tailwind
- [x] Autenticação simples
- [ ] **Etapa 2**: Calendário e CRUD de tarefas
- [ ] **Etapa 3**: Lembretes por e-mail com cron
- [ ] **Etapa 4**: Conclusão de tarefas com anexos
- [ ] **Etapa 5**: Mural e retrospectiva com IA
- [ ] **Etapa 6**: Polimento e deploy

## 💾 Build para Produção

```bash
npm run build
npm start
```

## 📝 Licença

Projeto pessoal. Todos os direitos reservados.

---

**Desenvolvido com ❤️ por Nicole**
