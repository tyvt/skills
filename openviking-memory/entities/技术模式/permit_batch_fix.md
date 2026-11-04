# detail.vue não envia campo batchNo ao salvar
No projeto 苏州市房地产监测V3, `src/views/presale/permit/components/detail.vue` montava parâmetros em `getForm()` sem `batchNo`, que só era calculado em `handleProjectChange` para exibição.

## 问题根因
- `getForm()` de `detail.vue` não incluía `batchNo` ao montar parâmetros de salvamento
- Número do lote era calculado apenas em `handleProjectChange` para exibição

## 解决方案
- `getForm()` passou a retornar `batchNo: this.form.batchNo`
- Garante que requisições de salvamento em modo inclusão e edição carregam o campo de lote

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3/273.md
- 涉及文件: src/views/presale/permit/components/detail.vue
- 所属项目: 苏州市房地产监测V3; Sessão: 01a16316-12bd-70c5-a400-765e5489bc0b; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_batch_fix",
  "source_extraction_id": "8b596fb5c71140e8af7f969beaff9a2d",
  "version": 1,
  "memory_type": "entities"
}
-->