# 物业企业项目统计类型筛选修复
苏住房G 公共查询-物业企业项目统计模块中，按统计类型筛选不生效的问题已修复。

## 问题根因
- `tableRows` 计算属性始终返回全部 4 类统计行，未根据 `queryParams.statType` 做前端筛选

## 修复方案
- 在 `companyProjectStats/index.vue` 为每组统计数据增加 `statType` 字段（对应 `"1"`~`"4"`），在 `tableRows` 中按 `queryParams.statType` 过滤
- 未选择时展示全部，选择后只展示对应分组及其子行
- 从 `getRequestParams()` 中移除 `statType`，筛选完全由前端处理
- `handleQuery` 不再重复请求接口，表格通过计算属性自动更新

## 验证与归属
- 验证：选择统计类型点击查询后表格只显示对应分类，清空或重置恢复全部
- 涉及文件：`zhi2-web-admin/src/views/publicQuery/companyProjectStats/index.vue`
- 所属项目：苏住房G；来源会话：7189b5dd-e29a-4612-b037-22a5fb3357a7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "stats_filter_fix",
  "source_extraction_id": "ae55cc6b3935446799466a4196796bb8",
  "version": 1,
  "memory_type": "entities"
}
-->