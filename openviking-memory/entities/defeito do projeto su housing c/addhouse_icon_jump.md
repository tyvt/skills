# Ícone de ajuda em addHouse falha ao pular pacotes e placeholder inconsistente
No projeto Su Housing C, ícone '?' em addHouse.vue com navegação entre subpacotes falhava e campo de certificado tinha placeholder inconsistente.

## Causa raiz
- Ícone '?' em addHouse.vue usava pulo entre subpacotes propenso a falha
- Input de número de certificado não usava classe de placeholder uniforme

## Correção
- Usar popup interno uni-popup com openInstructions() e adicionar @tap.stop
- Aplicar placeholder-class='uni-easyinput__placeholder-class' no input de certificado

## Arquivos envolvidos
- src/pages_owner/house/owner/addHouse.vue
- src/pages_transaction/publishHouse/verification.vue
- src/components/ZsPicker/ZsPicker.vue
- src/uni.scss
- src/pages.json
- src/components/ZsImage/ZsImage.vue
- src/pages_owner/house/owner/register.vue
- src/pages_owner/house/verify.vue

## Verificação
- Evidência: extracted source=cursor session=7bc1d9ba-8faa-4839-9f70-f4939f0e1403
- Projeto: Su Housing C (zhi2-mobile-shimin); base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Defeito do projeto Su Housing C",
  "name": "addhouse_icon_jump",
  "source_extraction_id": "98ca1eb1092046e4bdfecb4a8ca58d2b",
  "version": 1,
  "memory_type": "entities"
}
-->