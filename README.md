<p align="center">
  <img src="src/assets/logo.svg" alt="Logo Eventstage" />
</p>

**Eventstage** é uma plataforma de eventos que teve como ponto de partida um projeto da NLW Journey da [Rocketseat](https://www.rocketseat.com.br/). A ideia original consistia em uma aplicação simples com apenas duas páginas, voltada para praticar conceitos de frontend.

No entanto, este projeto foi além da proposta inicial. A partir da base fornecida pela Rocketseat, o Eventstage foi **reestruturado e expandido** para se tornar uma plataforma mais completa e funcional. Foram adicionadas novas funcionalidades, melhorias na interface e uma proposta de experiência mais robusta para o usuário.

Com o Eventstage, é possível:

- Criar eventos personalizados  
- Participar de eventos criados por outros usuários  
- Convidar pessoas através de links únicos de convite  
- Subir no ranking do evento conforme mais pessoas se inscrevem usando seu link  

Essa evolução do projeto visa não apenas praticar o conteúdo aprendido, mas também demonstrar iniciativa em aplicar melhorias, criar novas ideias e simular uma aplicação real com potencial de uso.

> ⚠️ **Este repositório contém apenas o frontend da aplicação.**  
> O repositório do backend pode ser acessado [aqui](https://github.com/viniciusrvcruz/eventstage-frontend).

---

## 📦 Tecnologias e Principais Dependências

Este projeto foi desenvolvido com **Next.js** e utiliza diversas bibliotecas modernas para melhorar a experiência do usuário e a produtividade no desenvolvimento. Aqui estão algumas das mais importantes:

- **Next.js 15** – Framework React para renderização híbrida (SSR/SSG), roteamento e otimizações.
- **React 19** – Biblioteca principal para construção da interface.
- **Tailwind CSS 4** – Framework utilitário para estilização rápida e responsiva.
- **React Hook Form** – Gerenciamento de formulários de forma performática.
- **Zod** – Validação de schemas tipada para integração com formulários.
- **Radix UI** – Componentes acessíveis e estilizados (Dropdown, Select).
- **Next Intl** – Internacionalização e tradução no Next.js.
- **Lucide React** – Ícones modernos baseados em SVG.
- **React Toastify** – Notificações personalizáveis.
- **Biome** – Linter e formatter rápido, substituindo ESLint/Prettier.

---

## 🗂️ Estrutura do Projeto

O projeto segue uma estrutura modular e escalável, aproveitando a abordagem de rotas e pastas do **App Router** do Next.js 13+. Abaixo, uma visão geral dos principais diretórios:

```txt
src
├── app/                  # Pasta principal de rotas (App Router)
│   └── [locale]/         # Suporte à internacionalização por locale
│       ├── (private)/    # Rotas protegidas para usuários autenticados
│       │   ├── events/   # Páginas relacionadas a eventos (listar, criar, editar, detalhes)
│       │   └── support/  # Página de suporte
│       ├── (public)/     # Rotas públicas (login, registro, etc.)
│       ├── layout.tsx    # Layout raiz por locale
│       └── page.tsx      # Página inicial
├── assets/               # Arquivos estáticos (ícones, imagens)
├── components/           # Componentes reutilizáveis da interface
│   └── ui/               # Subconjunto de componentes de UI
├── constants/            # Constantes usadas no app
├── env.ts                # Tipagem das variáveis de ambiente
├── i18n/                 # Arquivos relacionados a internacionalização
├── lib/                  # Funções utilitárias e helpers de API
├── middleware.ts         # Middleware para rotas (ex: autenticação, locale)
├── services/             # Camada de serviços para acesso à API
├── types/                # Tipagens TypeScript para os dados da aplicação
└── utils/                # Funções auxiliares diversas

```
---

## 📦 Variáveis de ambiente (.env)

```env
NEXT_PUBLIC_API_URL=http://localhost:3333/api
NEXT_PUBLIC_WEB_ADDRESS=http://localhost:3000
```
---

## 📝 License

Licensed under the MIT License.
---
