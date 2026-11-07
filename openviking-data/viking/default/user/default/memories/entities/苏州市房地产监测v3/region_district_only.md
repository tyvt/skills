# 行政区划格式化改为仅区级
苏州市房地产监测V3 已将表单/详情与列表的行政区划统一为仅显示区级（如「吴江区」），不再显示三级路径。

## 核心调整
- `formatters/index.js`：`fullRegionFormatter` 改为走 `formatAdministrativeRegion`（区级解析）
- 保留 `fullRegionPathFormatter` 仅用于仍需三级路径时
- `formatListRegionCode` 支持历史数据：若为「省/市/区」拼接字符串取最后一段作为区名

## 表单与组件
- `DeveloperBasicInfoForm`：无自定义 `regionFormatter` 时按编码解析为区级
- `developerBasicInfoContent.js`：只读「企业信息」行政区划回显逻辑一致
- `customerProject/detail.vue`：`regionName` 只存级联最后一级（区名），不再用 `/` 拼接三级
- 操作员/企业授权列表列 formatter 与列表规范对齐；入网注销等使用 `DeveloperBasicInfoForm` + `developerRegionFormatter` → `fullRegion`

## 验证与归属
- 涉及文件：`formatters/index.js`、`developerBasicInfoContent.js`、`customerProject/detail.vue` 及多处 mixins/listMixins.js
- 所属项目：苏州市房地产监测V3；来源会话：9cf41a6c-807b-46e2-b193-053a000a8ce2；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3",
  "name": "region_district_only",
  "source_extraction_id": "512a39ba2e844a0aac60c3d59941b745",
  "version": 1,
  "memory_type": "entities"
}
-->