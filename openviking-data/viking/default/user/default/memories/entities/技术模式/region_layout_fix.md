# RegionTreeLayout 挂载告警修复（苏住房G）
苏住房G 项目 zhi2-web-admin 修复 RegionTreeLayout.vue 因 Vue 2 属性代理限制导致的 `[Vue warn]: Error in mount` 告警。

## 问题根因
- Vue 2 不会把 `data` 中以 `_` 或 `$` 开头的属性代理到组件实例
- `RegionTreeLayout.vue` 定义 `_containerHeightTimers`，`mounted` 调用 `this._containerHeightTimers.forEach(...)` 时为 `undefined` 触发报错

## 修复方式
- `_listContainerEl` → `listContainerEl`
- `_syncContainerHeightHandler` → `syncContainerHeightHandler`
- `_containerHeightTimers` → `containerHeightTimers`
- 同步更新 `mounted`、`beforeDestroy` 及相关方法中的引用

## 涉及文件与归属
- 涉及文件：src/views/property/complex/components/RegionTreeLayout.vue、src/views/property/complex/index.vue
- 所属项目：苏住房G（zhi2-web-admin）
- 来源会话ID：9585b1b4-8f7c-4b98-81e1-bf7e7b44659c

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_layout_fix",
  "source_extraction_id": "a384d5a4404b42f0bbdba932aae859ab",
  "version": 1,
  "memory_type": "entities"
}
-->
