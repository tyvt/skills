# API não exporta downloadJson causando falha de import
buildingTable/index.vue e project/index.vue importavam downloadJson de @/api, mas src/api/index.js não o exportava.

## 问题根因
- src/api/index.js exportava apenas download e downloadGet, sem downloadJson.

## 解决方案
- Adicionado downloadJson (POST JSON + download blob) em src/api/index.js, consistente com exportHouse.

## Arquivos envolvidos
- src/api/index.js
- building/buildingTable/index.vue
- building/project/index.vue

## 验证与归属
- 验证证据: sessão cursor c97a341a-e901-4694-932b-d2c0da48f539
- Base de código: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "api_downloadjson_missing",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 1,
  "memory_type": "entities"
}
-->