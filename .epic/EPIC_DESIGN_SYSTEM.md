# Épico: Sistema de Microfrontends com Module Federation e Design System

Este épico gerencia a quebra e execução das tarefas para implementar o ecossistema de microfrontends (MFEs) que consome o design system.

## Lista de Issues e Ordem de Execução

As tarefas são organizadas por ordem de dependência tecnológica: `mfe-react` (React Puro/Webpack) -> `mfe-pages-router` (Next Pages Router) -> `mfe-app-router` (Next App Router) -> `mfe-shell` (Next App Router Host).

### Bloco 1: MFE React (Porta 3003)
- [ ] **[001] Setup & Tooling - MFE React** (`.epic/issues/001_mfe_react_setup.md`) - Estimativa: P
- [ ] **[002] Page Component - MFE React** (`.epic/issues/002_mfe_react_page.md`) - Estimativa: M
- [ ] **[003] Module Federation & CORS - MFE React** (`.epic/issues/003_mfe_react_federation.md`) - Estimativa: P

### Bloco 2: MFE Pages Router (Porta 3002)
- [ ] **[004] Setup & Tooling - MFE Pages Router** (`.epic/issues/004_mfe_pages_setup.md`) - Estimativa: P
- [ ] **[005] Page Component & SSR - MFE Pages Router** (`.epic/issues/005_mfe_pages_page.md`) - Estimativa: M
- [ ] **[006] Module Federation & CORS - MFE Pages Router** (`.epic/issues/006_mfe_pages_federation.md`) - Estimativa: P

### Bloco 3: MFE App Router (Porta 3001)
- [ ] **[007] Setup & Tooling - MFE App Router** (`.epic/issues/007_mfe_app_setup.md`) - Estimativa: P
- [ ] **[008] Page Component & Client Interactivity - MFE App Router** (`.epic/issues/008_mfe_app_page.md`) - Estimativa: M
- [ ] **[009] Module Federation & CORS - MFE App Router** (`.epic/issues/009_mfe_app_federation.md`) - Estimativa: P

### Bloco 4: MFE Shell (Porta 3000)
- [ ] **[010] Setup & Layout - MFE Shell** (`.epic/issues/010_mfe_shell_setup_layout.md`) - Estimativa: M
- [ ] **[011] Remote Integration & Routing - MFE Shell** (`.epic/issues/011_mfe_shell_remotes.md`) - Estimativa: M
- [ ] **[012] E2E Validation - MFE Shell** (`.epic/issues/012_mfe_shell_e2e.md`) - Estimativa: P
