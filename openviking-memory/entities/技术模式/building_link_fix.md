# 楼幢详情项目链接错路径致误报无授权
苏州市房地产监测V3 中楼幢/buildinginfo 详情页「所属项目」跳转路径误写，导致 ruoyi.js 误报"没有授权"异常，已修正路径。

## 问题根因
- 楼幢维护/buildinginfo 详情页「所属项目」跳转路径误写为 `projectManagement/project/customerProjectinfo/detail`（不存在）
- `getRouterPathByFilePath` 在 `src/utils/ruoyi.js:437` 误报"没有授权"（实际与权限无关）

## 修复方案
- 修正跳转路径为 `projectManagement/customerProject/detail`（对应 `src/views/projectManagement/customerProject/detail.vue`）
- 同步 4 处调用点，含 `src/views/projectManagement/buildinginfo/detail.vue:811`

## 涉及文件
- src/views/projectManagement/buildinginfo/detail.vue
- src/views/projectManagement/buildinginfo/changeDetail.vue
- src/views/projectManagement/unitinfo/detail.vue
- src/views/projectManagement/unitinfo/index.vue
- src/utils/ruoyi.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/096.md；src=苏州市房地产监测V3/151.md
- 所属项目：苏州市房地产监测V3；来源会话：01a166b8-ed31-764e-99b7-41b06e649698；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_link_fix",
  "source_extraction_id": "f1c4654c51974fa2a2a5c10e8aeed237",
  "version": 2,
  "memory_type": "entities"
}
-->