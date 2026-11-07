# 行政区划显示仅区级统一
行政区划展示统一仅区级不展示省市路径，已通过调整 formatter 实现。

## 问题根因
- 原展示可能包含省市路径，需求统一仅显示区级

## 解决方案
- formatters/index.js 的 fullRegionFormatter 改走 formatAdministrativeRegion 解析区级
- formatListRegionCode 兼容「省/市/区」拼接字符串取末段区名
- 保留 fullRegionPathFormatter 供三级路径
- DeveloperBasicInfoForm 默认按编码解析区级，customerProject/detail.vue 的 regionName 仅存级联末级区名

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/035.md
- 涉及文件：company/companyAdmin/index.vue、mixins/listMixins.js、mixins/table.js、mixins/tableComponents.js、main.js、formatters/index.js、utils/listTableRowAugment.js、presale/leaseContract/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：9cf41a6c-807b-46e2-b193-053a000a8ce2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_display_district",
  "source_extraction_id": "5bcae300dd0246af886a92e41c877c5b",
  "version": 1,
  "memory_type": "entities"
}
-->