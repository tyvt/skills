# Coluna de índice em branco por binding errado
A coluna de número de sequência na lista de certificados ficava em branco porque bindou `prop="billNo"` que não existe na interface.

## Causa raiz
- `personnelCertificate/index.vue` tinha coluna de índice com `prop="billNo"`
- A interface não retorna esse campo, deixando a coluna em branco

## Solução
- Usar `type="index"` com largura 80 e passar `:index="tableIndex"`
- Adicionar `tableIndex` que calcula `(pageNum - 1) * pageSize + index + 1` para numeração contínua entre páginas

## Verificação e afiliação
- Evidência: src=苏州市房地产监测V3-leftover/120.md
- Arquivos: `personnelCertificate/index.vue`, `companyApplyAudit/index.vue`, `listMixins.js`, `companyCancel/index.vue`
- Projeto: 苏州市房地产监测V3
- Sessão de origem: c7022489-2172-47ce-8e1e-dcbd234762d8
- Baseline de código: none

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "certificate_index_billno",
  "source_extraction_id": "d785eb449c3747999b3990855d973c1c",
  "version": 1,
  "memory_type": "entities"
}
-->