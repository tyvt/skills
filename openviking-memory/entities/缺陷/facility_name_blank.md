# Resolução de nome de categoria de instalação aninhado ou em array
Correção de lista em branco quando o nome da categoria vem em subobjeto ou array.

## 描述
- Interface retorna nome de categoria em subobjeto `facilityDefinition` ou array de strings.
- Bind original `prop: 'facilityDefinitionName'` no topo causava campo em branco.
- Em `scrappedRecord/index.vue` coluna ganha `formatter` que chama `resolveFacilityDefinitionName`.
- Função prioriza valores e concatena array com ` / `.

## Arquivos Envolvidos
- `scrappedRecord/index.vue`, `detail.vue`, `mixins/listMixins.js`, `mixins/table.js`, `mixins/ListTemplate.js`
- `recordProcess/components/index.vue`, `procedure/components/procedureProcessTable.vue`, `visitor/entry/index.vue`

## Verificação
- 来源: cursor session=f8b4bd31-2a17-4162-a6aa-7b14123bf0f6

<!-- MEMORY_FIELDS
{
  "category": "defeito",
  "name": "facility_name_blank",
  "source_extraction_id": "0470ca24980e46c381bede7a0ebe5a55",
  "version": 1,
  "memory_type": "entities"
}
-->