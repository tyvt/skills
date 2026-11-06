# 房屋限制详情UI对齐
苏州市房地产监测V3 中房屋限制管理→项目详情页（houseLimit/detail.vue）按项目规范对齐处理了截图标注的三处 UI 问题。

## 改动要点
- 「楼盘表/列表」切换：将 `el-radio-button` 改为全局统一的 `zs-tabs`（`type="line"`），楼幢选择放在 tabs 的 `#header` 插槽
- 「房屋限制情况搜索区」：去掉 `zs-search-form` 的 `borderless`，恢复与列表页一致的带边框查询区
- 「表格不带框」：两处子表（房屋限制列表、限制/解除记录）用 `list-card` 包裹表格与分页，表格设置 `:show-summary="false"`

## 验证与归属
- E2E：`e2e/fixtures/house-limit-helpers.js` 中 `switchLimitTab` 改为点击 `house-limit-tab-grid` / `house-limit-tab-list`
- 涉及文件：`zhi2-web-admin/src/views/building/houseLimit/detail.vue`
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor；来源会话：919cdd27-b108-4853-9396-977f4e571d0f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "房屋限制详情UI对齐",
  "source_extraction_id": "dd97271eac034e01917ec3f43043245c",
  "version": 1,
  "memory_type": "entities"
}
-->