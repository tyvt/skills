# Diálogo embutido sem v-if causa espaço em branco ao fechar
Bug no Suzhou Monitoramento Imobiliário V3 onde zs-select-dialog embutido em template/detail.vue deixava espaço em branco ao fechar.

## 问题根因
- `zs-select-dialog` embutido em template/detail.vue não tinha `v-if`, permanecendo montado no final do container flex `detail-container` após fechamento.

## Correção
- Adicionar `v-if="showProjectDialog"` ao SelectDialog, montando ao abrir e destruindo ao fechar.

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/105.md
- 所属项目: Suzhou Monitoramento Imobiliário V3; sessão: 31e3d43d-5804-493b-b7d0-f41ce35c1bc8; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "Correção de bug",
  "name": "inline_dialog_vif",
  "source_extraction_id": "79cf24bafc744c04973bd842fa4e560f",
  "version": 1,
  "memory_type": "entities"
}
-->