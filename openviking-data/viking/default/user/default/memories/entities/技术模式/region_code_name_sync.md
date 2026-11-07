# 淮安物管列表区划筛选同步编码与名称
列表筛选项改为 regionCode 后，因部分表按名称存区划，需同时传 regionCode 与 regionName 才能保证筛选准确。

## 问题根因
- 按接口文档统一改列表筛选项为 regionCode 后，后端部分表按名称存区划，仅传编码会导致筛选落空或查不到历史数据。
- 列表筛选链路中 zs-region-select 默认只把编码写入 queryParams.regionCode，单字段不够覆盖混用 code/name 的表。

## 解决方案
- 给 zs-region-select 增加 label 属性（或等价机制），选择时把区划名称一并回传。
- SearchFormItem 支持 labelModel 配置，将名称自动写入 queryParams（如 labelModel: 'regionName'）。
- 每个列表页在 queryParams 中声明 regionName，筛选项与请求体同时带 regionCode + regionName，由后端按表结构选用。
- 批量改文档涉及多页时用同一套组件能力收口，避免各页手写 @change 同步名称。

## 验证与归属
- 验证：会话 ca3135a9（2026-06-30，基线 1b9f773）用户确认筛选用 regionCode 编号，并要求文档涉及接口统一修改；追加 regionName 也得传。
- 结论：zs-region-select 增加 label、SearchFormItem 支持 labelModel，22 个列表页补 queryParams.regionName 与 labelModel: 'regionName'。
- 涉及文件：zhi2-web-admin/src/components/zs-region-select/zs-region-select.vue、zs-search-form/SearchFormItem.vue、mixins/area.js；所属项目：淮安物管；来源会话：ca3135a9-da8c-4d3a-b8df-92879d2762b6；代码基线：1b9f773。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_code_name_sync",
  "source_extraction_id": "ef9840a3c94e4e1dbb34e9f98d363bef",
  "version": 1,
  "memory_type": "entities"
}
-->