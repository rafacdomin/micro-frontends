# 012 — E2E Validation - MFE Shell

## Objetivo
Configurar e rodar testes de integração E2E para certificar que a integração do Host com todos os remotes funciona corretamente e lidar com falhas de rede de forma elegante.

## Critérios de Aceite
- [ ] Configurar testes de integração E2E ou de integração usando Vitest + JSDOM ou Playwright.
- [ ] Validar que cada rota do Shell carrega seu respectivo Remote.
- [ ] Testar cenários onde um ou todos os MFEs estão fora do ar (verificar se a mensagem de erro adequada é exibida).
- [ ] Adicionar um script no package.json da raiz para rodar o build e testes de todas as aplicações de uma vez (ex: usando comandos paralelos como `npm-run-all` ou `concurrently`).

## Cenários de Teste
### Happy Path
- Rodar a suite de testes E2E e validar que todas as páginas carregam sem erros no console.
- Os testes validam a presença dos títulos de cada página (Perfil do Usuário, Dashboard, Catálogo de Produtos).

## Arquivos a Criar/Modificar
- `mfe-shell/e2e/integration.test.ts` — Testes E2E
- `package.json` (raiz) — Scripts de orquestração do projeto global (build de todos, start de todos, tests de todos)

## Dependências Externas
- `vitest`, `jsdom`, ou `playwright`

## Dependências de Issues
- `011_mfe_shell_remotes.md`

## Estimativa P / M / G
P
