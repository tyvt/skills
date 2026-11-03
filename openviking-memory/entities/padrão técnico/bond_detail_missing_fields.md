# Campos ausentes em bond/detail causam aviso Vue e falha de interface
No projeto 苏州市房地产监测V3, o `data()` de `bond/detail.vue` não definia `primaryKey`, `moduleName`, `businessName`, causando aviso Vue e incapacidade de conectar à interface.

## Causa raiz
- `data()` de `bond/detail.vue` não definia `primaryKey`, `moduleName`, `businessName`
- Isso fazia `operation-btn-group` vincular atributos indefinidos, gerando aviso Vue e falha ao conectar à interface

## Correção principal
- Adicionado em `data()` `primaryKey: 'bondId'`, `moduleName: 'prefund'`, `businessName: 'paymentBond'` para definição reativa

## Verificação e atribuição
- Evidência: src=苏州市房地产监测V3/219.md
- Arquivos: supervision/unblock/bond/detail.vue, supervision/unblock/bond/index.vue, supervision/unblock/peasantAccount/detail.vue, mixins/detailMixins.js, supervision/unblock/guarantee/detail.vue, supervision/unblock/plan/detail.vue, mixins/form.js, mixins/formComponents.js
- Projeto: 苏州市房地产监测V3; Sessão: 5f16b44a-79c3-4ac0-ae5b-ae8d696e71f0; base de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "bond_detail_missing_fields",
  "source_extraction_id": "5b55fde1cd1b4f419a674259657b5c37",
  "version": 1,
  "memory_type": "entities"
}
-->