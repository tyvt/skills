# Paginação da sub-tabela de liberação excluída do Mixin não estava integrada
No projeto 苏州市房地产监测V3, a sub-tabela de liberação de restrição foi excluída do Mixin, usando paginação front-end na visualização; corrigido com paginação de servidor.

## 问题根因
- `limitFormMixin.js` excluiu a liberação de restrição em `useHouseLimitPageForSubTable`
- Isso fez `limitCancel.vue` usar paginação front-end no modo de visualização

## 解决方案
- A visualização passou a usar paginação de servidor uniforme
- A liberação chama `POST /building/houseLimit/pageLimitRemoval` e normaliza as linhas

## 验证与归属
- 验证证据: src=cursor session=c4ca2aed-d9fc-4952-9a00-b6fc2368c3dc
- 涉及文件: building/houseLimit/houseLimitConstants.js, limitFormMixin.js, limitCancel.vue, limitAdd.vue, components/LimitRecordDetailDialog.vue
- 所属项目: 苏州市房地产监测V3; sessão: c4ca2aed-d9fc-4952-9a00-b6fc2368c3dc

<!-- MEMORY_FIELDS
{
  "category": "Defeito técnico",
  "name": "limit_cancel_subtable_paging",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->