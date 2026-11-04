# Geração de batchNo de pré-venda a partir de maxBatchNo
No `zhi2-web-admin/src/views/presale/permit/components/detail.vue`, `handleProjectChange` gera `form.batchNo` a partir do `maxBatchNo` do projeto.

## Contexto
- Em `handleProjectChange`, lê `maxBatchNo` de `projectOptions[].raw`
- Calcula `String(Number(raw.maxBatchNo) + 1)` e atribui a `form.batchNo`

## 解决方案
- Quando vazio, define `undefined` para exibir placeholder e evitar `NaN`
- A whitelist do payload de submissão não inclui `batchNo`

## 验证与归属
- Arquivo: zhi2-web-admin/src/views/presale/permit/components/detail.vue
- Sessão: session_738a2a4d2ad93a91c77adf4b7c511d52

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_batch_gen",
  "source_extraction_id": "76f2d71ba1c4492cb8ab951b1612621d",
  "version": 1,
  "memory_type": "entities"
}
-->