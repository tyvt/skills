# 楼幢详情项目链接错路径致误报无授权
`buildinginfo/detail.vue` 中「所属项目」跳转路径误写致误报无授权，已修正路径并同步调用。

## 问题根因
- `buildinginfo/detail.vue` 中「所属项目」跳转路径误写为 `projectManagement/project/customerProjectinfo/detail`（不存在）
- 导致 `getRouterPathByFilePath` 在 `ruoyi.js:437` 误报"没有授权"

## 修复方案
- 修正跳转路径为 `projectManagement/customerProject/detail`
- 同步 4 处调用点

## 涉及文件
- src/views/projectManagement/buildinginfo/detail.vue
- src/views/projectManagement/buildinginfo/changeDetail.vue
- src/views/projectManagement/unitinfo/detail.vue
- src/views/projectManagement/unitinfo/index.vue
- ruoyi.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/096.md
- 来源会话：01a166b8-ed31-764e-99b7-41b06e649698
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_link_fix",
  "source_extraction_id": "b42df2619b2946769fe76a6a8ccd120a",
  "version": 1,
  "memory_type": "entities"
}
-->