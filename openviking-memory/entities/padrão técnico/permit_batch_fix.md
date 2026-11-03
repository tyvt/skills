# detail.vue não envia campo batchNo ao salvar
No projeto 苏州市房地产监测V3, `src/views/presale/permit/components/detail.vue` montava parâmetros em `getForm()` sem `batchNo`, que só era calculado em `handleProjectChange` para exibição.

## Causa raiz
- `getForm()` de `detail.vue` não incluía `batchNo` ao montar parâmetros de salvamento
- Número do lote era calculado apenas em `handleProjectChange` para exibição

## Solução
- `getForm()` passou a retornar `batchNo: this.form.batchNo`
- Garante que requisições de salvamento em modo inclusão e edição carregam o campo de lote

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3/273.md
- Arquivos: src/views/presale/permit/components/detail.vue
- Projeto: 苏州市房地产监测V3; Sessão: 01a16316-12bd-70c5-a400-765e5489bc0b; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "permit_batch_fix",
  "source_extraction_id": "8b596fb5c71140e8af7f969beaff9a2d",
  "version": 1,
  "memory_type": "entities"
}
-->