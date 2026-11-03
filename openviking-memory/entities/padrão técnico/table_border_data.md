# Template :border="border" requer border definido em data
No projeto 园区物管2.0, usar :border="border" em el-table sem border em data() dispara aviso de runtime Vue.

## Sintoma
- Aviso: Property or method "border" is not defined
- ScopeSelectDialog omitiu definição e disparou aviso, comum ao copiar fragmentos de tabela

## Solução
- Convencionar data com border: true em OpenDetailTable, OwnerAddDialog
- Não escrever border estático e :border juntos; se faltar, adicionar border: true e remover estático

## Verificação
- Sessão 024ea5fe: ScopeSelectDialog.vue linha 18 :border="border" sem data.border, adicionado border: true e removido estático
- Arquivo: zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- Projeto: 园区物管2.0; baseline: 177bc3ce4; sessão: 024ea5fe-fd81-439f-8f02-a139f7fd07d3

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "table_border_data",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 2,
  "memory_type": "entities"
}
-->