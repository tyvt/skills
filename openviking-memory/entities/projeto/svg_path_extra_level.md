# Caminho SVG com Nível Extra e Arquivo Vazio
Erro de referência SVG com caminho extra e arquivo 0 bytes em páginas de decisão.
## Causa Raiz
- `ResultStatistics.vue` e `StepConfirm.vue` usam `../.././static` (um nível a mais).
- `flag-szf.svg` tem 0 bytes.
## Solução
- Corrigir para `../../static/images/svg/flag-szf.svg`.
- Adicionar ícone de bandeira com cor tema `#1354BE`.
## Arquivos
- `ResultStatistics.vue`, `StepConfirm.vue`, `sort.scss`, `StepChoose.vue`, `package.json`.
## Verificação
- Sessão cursor 860e18b1-7843-41e3-a393-6d3279b805da; base: none.

<!-- MEMORY_FIELDS
{
  "category": "Projeto",
  "name": "svg_path_extra_level",
  "source_extraction_id": "e241c05fac3842f3aa947be4d03aabe9",
  "version": 1,
  "memory_type": "entities"
}
-->