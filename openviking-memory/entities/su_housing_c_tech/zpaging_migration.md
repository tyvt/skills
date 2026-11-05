# src/pages 列表分页迁移至 z-paging
苏住房C(zhi2-mobile-shimin)将 `src/pages` 下 11 个 Vue 文件从 `useLoadMore`/`uni-load-more` 迁移到 `z-paging` + `usePaging`。

## 迁移内容
- 涉及 11 个文件：`publicNotice/publicNotice.vue`、`news/index.vue`、`collect/index.vue`、`message/message.vue`、`my/myFootmark.vue`、`my/myContract.vue`、`announcement/index.vue`、`home/policy.vue`、`index/...` 等
- 统一接入 `usePaging` + `<z-paging>`，使用 `#empty` 空态插槽
- `collect/index.vue` 搜索回调重命名为 `handleSearch`，`total > 0` 改为 `list.length > 0`
- `announcement/index.vue` 的 `reload()` 改为 `refresh()`
- 保留各页原有筛选、搜索与空态文案（如「暂无数据」）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`publicNotice/publicNotice.vue`、`news/index.vue`、`collect/index.vue`、`message/message.vue` 等 11 个
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：201f6b7f-a985-4455-955a-c315abe76d23；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zpaging_migration",
  "source_extraction_id": "3bad886309d54823969374dcd2916583",
  "version": 1,
  "memory_type": "entities"
}
-->