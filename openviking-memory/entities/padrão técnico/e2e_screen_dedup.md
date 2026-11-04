# Vídeos E2E redundantes no registro de empresa
No zhi2-web-admin (produto 2.0) fluxo completo, caso UI, navegação de retorno e CRUD de sócios repetiam Step1→3, gerando 12 vídeos redundantes.
## Causa raiz
- Cada caso (fluxo completo, UI, retorno, CRUD de sócios) refazia Step1→3 independentemente.
## Solução
- Unir company-register.spec.js em 2 sessões contínuas.
- Mover validação de campos para company-register-fields.spec.js sem gravar vídeo.
- Gerar test-results/company-register-full.webm (~58s), mantendo cobertura de asserções.
## Verificação e origem
- Evidência: cursor session=1a0da812-3129-4757-ad86-ae58155f438e
- Arquivos: package.json, playwright.config.js, real-api-flow.spec.js, register-helpers.js, real-api.spec.js, flow.spec.js, ui.spec.js, input-maxlength.spec.js
- Projeto: 2-0; código base: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "e2e_screen_dedup",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->