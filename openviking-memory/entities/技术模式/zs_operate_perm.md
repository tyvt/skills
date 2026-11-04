
# Coluna zs-operate requer permissão booleana
A coluna `zs-operate-column` usa `permission` como interruptor booleano e `permissionType` como sufixo de permissão.

## Problema
- Usar array em vez de booleano faz `permissionType` ficar indefinido e falha a verificação de permissão.

## Correção
- Em `institutionRegister/index.vue`, `buttons()` define `permission: true` e `permissionType: 'query'` para corrigir.

## Arquivos relacionados
- `components/zs-operate-column/zs-operate-column.vue`
- `components/OperationBtnGroup/index.vue`
- `store/modules/permission.js`
- `utils/permission.js`


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_operate_perm",
  "source_extraction_id": "adc3e1ae8ecc450c8f127414246b355e",
  "version": 1,
  "memory_type": "entities"
}
-->