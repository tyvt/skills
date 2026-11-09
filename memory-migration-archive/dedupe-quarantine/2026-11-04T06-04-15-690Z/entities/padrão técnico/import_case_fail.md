# Import com case divergente quebra build no Linux
`buildinginfo/detail.vue` importa `./components/unitTable.vue` com case divergente do arquivo real `UnitTable.vue`, falhando o build no Linux.

## Causa raiz
- Windows não distingue case de arquivo, mas Linux (GitLab Runner/Rollup) distingue; o import em `buildinginfo/detail.vue` não coincide em case com `UnitTable.vue`.

## Solução
- Modificar linha 169 de `buildinginfo/detail.vue` para importar `'./components/UnitTable.vue'` e passar no CI.

## Arquivos envolvidos
- buildinginfo/detail.vue, ./components/unitTable.vue, UnitTable.vue

## Validação e origem
- Evidência: src=产品2.0/073.md; Sessão: 77670b3d-757c-4c9b-81a1-088b6d675376; Projeto: 产品2.0 (zhi2-web-admin)

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "import_case_fail",
  "source_extraction_id": "b8a6385471564bb19b6b65b0e5a5a7ee",
  "version": 1,
  "memory_type": "entities"
}
-->