# Correção de 404 por lógica de retorno que remove segmento de rota
A lógica de retorno padrão do `OperationBtnGroup` removia o último segmento do caminho (ex.: `/import/add` → `/import`), causando 404 quando o caminho intermediário não tinha rota.

## 解决方案
- `import.vue` desativou o retorno embutido e passou a usar `navigateBack()` priorizando `backUrl`
- `index.vue` passa `backUrl: this.$route.path` ao navegar

## Arquivos envolvidos
- zhi2-web-admin/src/views/property/spFeeBill/components/index.vue
- zhi2-web-admin/src/views/property/spFeeBill/components/import.vue
- zhi2-web-admin/src/mixins/detailMixins.js
- zhi2-web-admin/src/views/property/spFeeBill/service/import.vue
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- zhi2-web-admin/src/mixins/form.js
- zhi2-web-admin/src/utils/ruoyi.js
- zhi2-web-admin/src/router/index.js

## Verificação
- Sessão de origem: 7e35018a-3038-4ded-afb4-236a2607fad5 (extracted source=cursor)
- Linha de base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_return_fix",
  "source_extraction_id": "1a2b75746c8a4c628333ce0a17314818",
  "version": 1,
  "memory_type": "entities"
}
-->