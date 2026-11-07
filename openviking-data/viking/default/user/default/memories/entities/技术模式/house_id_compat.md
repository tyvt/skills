# houseId 应兼容 userStore 与路由参数
`App.vue` 仅将 URL 中的 `houseId` 写入 `userStore.houseId`，而非 `houseStore.currentHouse`，导致出现选择房屋的提示。已确定解析顺序。

## 问题
- `App.vue`（52-56行）仅将 URL 中的 `houseId` 写入 `userStore.houseId`
- 打开带参数的维护页面时 `currentHouse` 为空，触发提示

## 解决方案
- 解析顺序：`currentHouse.houseId` → `currentHouse.id` → `userStore.houseId` → 路由参数 `houseId`
- `onLoad(options)` 使用 `options.houseId` 作为回退

## 验证
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