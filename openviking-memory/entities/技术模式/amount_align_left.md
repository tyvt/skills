# type amount com align left
Globalmente, type: 'amount' com align: 'right' deve ser alterado para align: 'left'.

## Regra
- Substituir align: 'right' por align: 'left' em todos os type: 'amount'
- Cobrir módulos de receita, propriedade etc.

## Verificação
- Checagem secundária por regex type: 'amount' ... align: 'right' retornou 0 ocorrências
- 验证证据: src=bugfix/001.md
- Arquivo envolvido: localPropertyWin/detail.vue
- Sessão: 9d21af84-c650-421a-bfb6-02ee07eee6e0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_align_left",
  "source_extraction_id": "abc711535aaf4dbeace7d2af079c5c75",
  "version": 1,
  "memory_type": "entities"
}
-->