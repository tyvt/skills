# Dialog Form Items Config Driver
Padrão de refatoração de formulário de diálogo para renderização orientada por configuração.

## Implementação
- Em `zhi2-web-admin/src/views/property/complex/index.vue`, substituir formulário hardcoded por propriedade computada `dialogFormItems` que configura `label/prop/layout/type/attrs`.
- Usar `v-for` para renderizar itens e, conforme `type`, renderizar `zs-date-picker`, eliminando `contentInfo` não dirigido.

## Arquivos Envolvidos
- zhi2-web-admin/src/views/property/complex/index.vue
- zhi2-web-admin/src/views/evaluation/creditDeclarationComponents/detail.vue
- zhi2-web-admin/src/views/transaction/transferDiscount/index.vue

## Verificação
- Fonte: cursor session=b13808d4-8e61-472e-9b96-c5618a65f78f
- Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialogformitems_driver",
  "source_extraction_id": "e1e9f73408db4b68b85692c1f86358e5",
  "version": 1,
  "memory_type": "entities"
}
-->