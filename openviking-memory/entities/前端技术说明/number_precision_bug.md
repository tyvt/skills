# Perda de precisão de Snowflake Long em store.flood.ts (colapso de Number())
No store.flood.ts da extremidade C de prevenção de enchentes de habitação Su, usar Number() para converter IDs Snowflake Long de 19 dígitos (eventId/templateItemId) perde os últimos dígitos, causando erros 400 no backend e sintoma falso de "itens duplicados".

## 问题根因
- submitInspectionRemote/submitRescueRemote usaram Number() em Snowflake Long de 19 dígitos nas linhas 176, 177, 180, 183.
- Excede o inteiro seguro JS 2^53, distorcendo o último dígito, fazendo o backend reportar 400 "aviso não existe".
- Dois templateItemIds distintos colapsaram no mesmo valor, aparecendo como itens duplicados em e2e.

## Correção
- Lado store (corrigido pelo líder, fora do escopo de escrita do assistente): eventId/complexId/templateItemId usam String(), id de envio usa String(saved), removendo todos Number().
- Lado página (corrigido pelo assistente): buildRemoteValues() do payload de envio de inspeção agora usa itens de template como única fonte e deduplica por templateItemId; eventId/complexId também passados como String como proteção extra.

## Verificação
- Líder testou por proxy reverso evento 1186: salvar e enviar retornaram code=200 com eco correto de detalhe.
- typecheck EXIT=0, build:h5 EXIT=0, test 20/20 todos verdes; task-1 marcada como concluída.
- Arquivos relacionados: store.flood.ts (submitInspectionRemote/submitRescueRemote); página de inspeção da extremidade C de prevenção de enchentes de habitação Su.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "number_precision_bug",
  "source_extraction_ids": [
    "35c86686df24402eb79d2df0dde905b0",
    "a7d4b155515447d4b59be6579654e5d2"
  ],
  "version": 1,
  "memory_type": "entities"
}
-->