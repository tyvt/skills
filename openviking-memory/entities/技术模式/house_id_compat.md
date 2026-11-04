# houseId deve compatibilizar userStore e parâmetros de rota
`App.vue` escreve apenas URL `houseId` em `userStore.houseId`, não em `houseStore.currentHouse`, causando aviso de selecionar casa. Ordem de resolução definida.

## Problema
- `App.vue` (linhas 52-56) grava `houseId` de URL apenas em `userStore.houseId`
- `currentHouse` fica vazio ao abrir página de manutenção com parâmetro, disparando aviso

## 解决方案
- Ordem de resolução: `currentHouse.houseId` → `currentHouse.id` → `userStore.houseId` → parâmetro de rota `houseId`
- `onLoad(options)` usa `options.houseId` como fallback

## Verificação
- 验证证据: src=i淮安公版/002.md
- 涉及文件: src/pages_owner/maintain/index.vue, src/store/house.js, src/api/index.js, src/pages_owner/house/detail.vue, src/pages_owner/house/index.vue, vite.config.ts, src/api/property.js, src/api/maintenance.js
- 所属项目: i淮安公版/zhi2-mobile-admin-h5-c-unlimited

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_id_compat",
  "source_extraction_id": "11ae8be425bf4675afd3f62a0549acbb",
  "version": 1,
  "memory_type": "entities"
}
-->