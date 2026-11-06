# 机构注销列表页接入area mixin
苏州市房地产监测V3 的机构注销列表页已改用公共 `@/mixins/area.js` 处理行政区划展示，并与详情页命名和回显逻辑对齐。

## 修改内容
- 引入 `area` mixin（与 `benefit/alert`、`buildinginfo` 等列表一致），提供 `findRegionLabel`、`ensureAreaTreeLoaded` 加载区划数据
- `regionOptions` 重命名为 `economicRegionOptions`，避免与 `area` mixin 的 computed `regionOptions` 冲突，并与 `companyCancel/detail.vue` 一致
- `formatRegion` 回显顺序：先查 `ECONOMIC_INSTITUTIONS_REGION` 字典，再用 `this.formatters.fullRegionFormatter`，最后用 mixin 的 `findRegionLabel` 兜底

## 使用规则
- 筛选下拉仍用 `economicRegionOptions`（字典数据）
- 表格和「选择机构」弹窗仍走 `formatRegion` 回显

## 验证与归属
- 涉及文件：`@/mixins/area.js`、`companyCancel/detail.vue`、`companyCancel/index.vue`
- 所属项目：苏州市房地产监测V3
- 来源会话ID：43523a7a-7791-4eb2-8963-fb30588ceb6e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_area_mixin",
  "source_extraction_id": "756cd836611b4b25b7366c1b7ae83809",
  "version": 1,
  "memory_type": "entities"
}
-->