# Opção StepChoose sem border-box causa overflow de largura
No projeto Su Housing C, opções de StepChoose sem box-sizing border-box causavam overflow de largura e fundo de destaque colado à borda.

## Causa raiz
- optional/StepChoose.vue não definia box-sizing: border-box causando overflow de largura
- overflow: hidden e alinhamento padrão impediam layout desejado

## Correção
- Definir box-sizing: border-box e padding: 24rpx 28rpx
- Remover overflow: hidden e ajustar alinhamento à esquerda para layout da figura 2

## Arquivos envolvidos
- src/pages_vote/decision/form.vue
- src/pages_vote/decision/optional/StepChoose.vue
- src/pages_vote/decision/common/StepChoose.vue
- src/pages_vote/decision/components/RadioGroup.vue
- src/pages_vote/decision/sort/StepChoose.vue
- src/pages_vote/decision/styles/card.scss
- src/components/ZsCheckbox/ZsCheckbox.vue

## Verificação
- Evidência: extracted source=cursor session=7596f0ef-5187-468b-8b37-d30dd7fc905d
- Projeto: Su Housing C (zhi2-mobile-shimin); base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Defeito do projeto Su Housing C",
  "name": "stepchoose_border_box",
  "source_extraction_id": "98ca1eb1092046e4bdfecb4a8ca58d2b",
  "version": 1,
  "memory_type": "entities"
}
-->