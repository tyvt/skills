# ZsPopup Transparência Canto Azul
Remove pseudo-elemento e torna fundo transparente para eliminar canto azul superior.
## 问题根因
- `.popup-container::after` cria canto azul; `uni-popup` tem fundo azul padrão.
## 解决方案
- Remover `.popup-container::after` em `ZsPopup.vue`.
- Adicionar `overflow: hidden` para cortar vazamento de cantos arredondados.
- Mudar `uni-popup` para `background-color="transparent"`.
- Adicionar `:deep(.uni-popup__wrapper) { background: transparent !important; }`.
## Arquivos
- `ZsPopup.vue`, `addHouse.vue`, `ZsButton.vue`, `zs-button.scss`, `ZsPicker.vue`, `authorization.vue`, `package.json`, `2026-09-11.md`.
## Verificação
- Sessão cursor 9b073154-cc39-42ea-a983-a2a4c7876b10; base: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_popup_transparent",
  "source_extraction_id": "e241c05fac3842f3aa947be4d03aabe9",
  "version": 1,
  "memory_type": "entities"
}
-->