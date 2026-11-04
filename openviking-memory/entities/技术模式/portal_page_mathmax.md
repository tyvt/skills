# Portal Page Math Max
Geração de números de página usava Math.max incorretamente, criando página extra.

## 描述
- `displayedPages` foi escrito como `Math.max(2, this.pages)`, causando duas páginas no v-for quando total era 1.
- Corrigido para `return this.pages`, exibindo apenas página 1 em caso de página única.
- Afeta paginação de `PortalTable`.

## Arquivos
- `PortalTable.vue`

## Verificação
- Sessão de origem: `176808fe-ac0e-40e4-872f-fa68fc7638ab`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_page_mathmax",
  "source_extraction_id": "89580cadf96140df80249b734eb2a264",
  "version": 1,
  "memory_type": "entities"
}
-->