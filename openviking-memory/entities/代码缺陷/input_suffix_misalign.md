
# Altura do sufixo de input com unidade desalinhada
Em zhi2-web-admin o estilo do sufixo de inputs com unidade não estava alinhado em altura com a caixa de input; ajuste via cherry-pick em dois branches.

## 问题根因
- Estilo de sufixo de inputs com unidade tinha altura não alinhada com a caixa de input

## 解决方案
- Submódulo zhi2-web-admin ajustou estilo de sufixo em detail.vue e arquivos relacionados
- Commit feito via cherry-pick para os branches develop/v2.6.2 e develop/v2.6.2-yulin
- Repositório pai sincronizou referência de submódulo para evitar conflito de merge geral

## Arquivos e proveniência
- 涉及文件: src/styles/element-ui.scss, src/components/AmountInput/index.vue, src/components/zs-input/zs-input.vue, public/assets/css/element-ui.css, src/styles/index.scss, src/views/home/components/SearchInput.vue, src/views/property/localPropertyBid/detail.vue, vite.config.js
- 所属项目: 产品2.0; sessão: 1542c9a5-d487-4b61-a6aa-8a7eb0b7f7c8; base: none; 验证证据: 产品2.0/032.md


<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "input_suffix_misalign",
  "source_extraction_id": "4d80bcc2a01b4c9daeb3c9c060bc1073",
  "version": 1,
  "memory_type": "entities"
}
-->