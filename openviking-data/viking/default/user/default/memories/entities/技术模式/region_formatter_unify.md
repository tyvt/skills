# 行政区划格式化工具统一排查
苏州市房地产监测V3 项目中，行政区划展示应以 `@/formatters/index.js` 公共能力为准，避免各页面重复拼接。

## 公共能力
- `fullRegionFormatter`：单个区划编码 → `省/市/区`
- `provinceFormatter`：编码 → 区级名称（或上级路径）
- `dictFormatter`（`main.js`）：`region` / `administrativeArea` 字典未命中时回退 `fullRegionFormatter`

## 问题与改动
- 分支机构原在列表和详情各写一套 `registrationProvince/City/Area` 拼接，与公共能力重复，已统一
- `companyApplyAudit`、`companyCancel` 等仍保留本地 `formatRegion`，场景不同本次未动
- `formatters/index.js` 抽出 `resolveFullRegionName` / `resolveProvinceLevelRegionName` 供原有 formatter 复用

## 涉及文件与归属
- 涉及文件：`@/formatters/index.js`、`dictFormatter`（`main.js`）、`AgencyBranchList.vue`
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_formatter_unify",
  "source_extraction_id": "e1e0f290fc1e43a8b372bd273c07a27c",
  "version": 1,
  "memory_type": "entities"
}
-->