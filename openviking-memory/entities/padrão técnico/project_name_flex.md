# Layout flex do nome de projeto de supervisão
No projeto 苏州市房地产监测V3, `detail.vue` de supervisão jgxm usa flex para alinhar nome principal e número de prédio, e estado de visualização concatena parênteses de largura total.

## Descrição
- Ajuste de apresentação do nome do projeto de supervisão (jgxm)
- Projeto: 苏州市房地产监测V3

## Implementação
- Em edição: container `regulator-project-name-fields` com flex; nome principal `flex:1`, segmento de número de prédio `margin-left:auto` à direita
- Em visualização: `regulatorProjectNameDisplay` concatena `${name}（${short}）` com parênteses de largura total

## Arquivos Relacionados
- `src/views/supervision/agreement/jgxm/detail.vue`
- `src/views/supervision/unblock/InformationPush/detail.vue`
- `src/utils/detailLayout.js`
- `src/views/supervision/agreement/jgxm/components/ProjectNameDialog.vue`

## Verificação e Origem
- Evidência: src=苏州市房地产监测V3-leftover/032.md
- Sessão de origem: 8ed69fd8-6062-4732-bc26-b18e22054b54; linha de base: none

<!-- MEMORY_FIELDS
{
  "category": "padrão técnico",
  "name": "project_name_flex",
  "source_extraction_id": "9e8fdb1f8e9d4c00b0343d17cab91324",
  "version": 1,
  "memory_type": "entities"
}
-->