# Ignorar artefatos E2E do portal no gitignore
Artefatos temporários gerados por testes E2E do portal devem ser ignorados pelo Git.

## Descrição
- Capturas de tela e resultados de teste são produtos temporários
- O `.gitignore` deve ignorar `tests/e2e/screenshots/` e `test-results/`
- Arquivos já rastreados devem ser removidos

## Arquivos envolvidos
- `zhi2-web-admin/tests/e2e/unified-login-visual.spec.ts`
- `zhi2-web-admin/playwright.config.ts`
- `zhi2-web-admin/src/views/home/UnifiedLogin.vue`

## Verificação e origem
- Evidência: `src=门户/024.md`
- Projeto: portal (门户)
- Sessão: `58e74ae7-d504-49ac-8c05-02b1c6cadd94`
- Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "portal_e2e_gitignore",
  "source_extraction_id": "ec77fd4578154a9cba32bd5e7b4903cc",
  "version": 1,
  "memory_type": "entities"
}
-->