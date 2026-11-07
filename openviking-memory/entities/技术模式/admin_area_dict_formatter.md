# 经纪机构管理员管理行政区域显示修复
苏州市房地产监测V3 的 companyAdmin/index.vue 行政区域列已修复为显示字典名称或区划全称。

## 原因
- 接口 `administrativeArea` 有时是 6 位行政区划代码，列却用 `type="dict"` 按字典值（如 6、9）匹配，对不上就原样显示代码（如 320582）

## 修改要点
- `companyAdmin/index.vue` 行政区域列改用全局 `dictFormatter`，选项命名为 `administrativeAreaOptions`（符合 `{prop}Options` 约定）
- `main.js` 的 `dictFormatter` 对 `administrativeArea` 与 `region` 一样，字典未命中时走 `fullRegionFormatter`（依赖路由已加载的 `common/getRegions`）
- 效果：字典值→字典名称（如「常熟市」）；区划代码→「省/市/区」全称（如 320583→江苏省/苏州市/昆山市）

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/views/company/companyAdmin/index.vue、src/main.js
- 所属项目：苏州市房地产监测V3；来源会话：fc99f7fd-5010-4501-913f-3bba06414106；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "admin_area_dict_formatter",
  "source_extraction_id": "16a1550171f04a6c8f38bcb58d4c2d6a",
  "version": 1,
  "memory_type": "entities"
}
-->
