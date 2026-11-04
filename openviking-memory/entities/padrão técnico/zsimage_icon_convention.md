# Convenção de Ícone ZsImage no Projeto
Uso obrigatório de `ZsImage` para ícones, senão build falha.
## Causa Raiz
- `authentication.vue` usava `../../../static/images/szf/icon-checked.svg` (inexistente) sem `ZsImage`.
- Viola convenção do projeto.
## Solução
- Trocar para componente `ZsImage` com caminho `/images/szf/...`.
- Em `publishHouse/index.vue` corrigir `warn.png` de `../static` para `../../static`.
## Arquivos
- `authentication.vue`, `addTypeChoose.vue`, `vite.config.ts`, `ZsImage.vue`, `pages.json`, `TitleCard.vue`, `publishHouse/index.vue`.
## Verificação
- Sessão cursor 4f2dff10-9967-4330-9845-304bfa354448; base: none.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "zsimage_icon_convention",
  "source_extraction_id": "e241c05fac3842f3aa947be4d03aabe9",
  "version": 1,
  "memory_type": "entities"
}
-->