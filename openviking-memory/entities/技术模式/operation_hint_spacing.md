# Espaçamento desigual por padding-top inline
Padrão técnico para texto de dica com padding-top inline sem margem inferior causando desalinhamento.
## 问题根因
- Texto de descrição usa apenas padding-top:10px inline sem margem inferior, espaçamento vertical desigual.
## 解决方案
- Usar estilo global operation-hint com display:flex, align-items:center, padding:0 12px 12px, line-height:22px para centralizar.
## Arquivos e verificação
- 涉及文件: pubRevenueContract/index.vue, assetsLeaseContractFiling/index.vue, styles/index.scss.
- Sessão de origem: 95de17f2-76c3-4cab-884c-27a0549a0793; linha de base: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_hint_spacing",
  "source_extraction_id": "fbb3c51bf7d04a09abe11b116bf5d283",
  "version": 1,
  "memory_type": "entities"
}
-->