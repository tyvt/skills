# Setas da barra de etapas e desalinhamento em tela estreita
A barra de etapas (`.flow-step-cell`) em `index-new.vue` do portal usa seta CSS fixa de 12px com `padding-right: dw(14)`, desalinhando em telas estreitas e causando overflow horizontal; o `v-for` usa `:key='si'` que não é chave de negócio estável.

## Problema
- Seta CSS fixa 12px + padding-right dw(14) desalinhados em telas estreitas; linha inteira transborda horizontalmente
- Template `:key='si'` não é chave de negócio estável
- `npm run lint` varre `src/**/*.{vue,js}` (~3506 itens de estilo) e não isola mudanças de `index-new.vue`

## Solução
- Unificar unidades de seta e padding (usar dw() de forma consistente)
- `v-for` deve usar chave de negócio estável em vez de `si`

## Verificação e origem
- Evidência: portal/037.md
- Arquivos: zhi2-web-admin/src/views/home/index-new.vue; tests/e2e/portal-home-visual.spec.ts; package.json
- Sessão: d6e2d37c-78bf-4548-8cba-1179801832f4

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "index_step_arrow",
  "source_extraction_id": "dd37fc1ce95e4bc7ac6e21d7160d2ee6",
  "version": 1,
  "memory_type": "entities"
}
-->