# Remoção do campo tipo de documento das páginas de detalhe de pessoal
No projeto 苏州市房地产监测V3, removidos os itens «证件类型» dos formulários de edição em `AgencyPersonnelDetail.vue` e `LeasePersonnelDetail.vue`.

## 问题根因
- Os formulários de edição exibiam o campo «证件类型» indevido
- `basicInfoView` mostrava o campo; regra obrigatória `idType` e carregamento do dicionário `document_type` presentes

## 解决方案
- Remover o item do formulário em `AgencyPersonnelDetail.vue` e `LeasePersonnelDetail.vue`
- `basicInfoView` oculta o campo
- Excluir regra obrigatória `idType` e carregamento do dicionário `document_type`
- Manter valor padrão `idType: '01'` no formulário e preservar esse valor no payload de salvamento; lógica de backend permanece compatível

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/066.md
- 涉及文件: AgencyPersonnelDetail.vue, LeasePersonnelDetail.vue, e2e/institution/agency-personnel-real-api-flow.spec.js
- 所属项目: 苏州市房地产监测V3; Sessão: 5d103f6d-b346-4d26-8144-3e36ee398668; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "remove_id_type",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 1,
  "memory_type": "entities"
}
-->