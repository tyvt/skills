# 单元管理列表项目与楼幢跳转
苏州市房地产监测V3 中单元管理列表（unitinfo/index.vue）的项目名称与楼幢号改为跳转链接，分别跳转到项目详情与楼幢详情页。

## 改动内容
- 项目名称列：原 link 错跳单元详情，改为 link → 项目详情 `projectManagement/project/customerProjectinfo/detail/{projectId}`
- 楼幢号列：由纯文本改为 link → 楼幢详情 `projectManagement/buildinginfo/detail/{buildingId}`
- 新增 `import { getRouterPathByFilePath } from '@/utils/ruoyi'`，路径动态解析不硬编码路由，与 buildinginfo/detail.vue、unitinfo/detail.vue 已有跳转一致
- 新增 `handleViewProject` / `handleViewBuilding`，缺 projectId/buildingId 时用 `msgWarning` 提示而非静默失败
- 路由统一带 `query: { formMode: 'view' }`

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/projectManagement/unitinfo/index.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：146ee20b-f6d8-4780-be83-1077344f1c17；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unitinfo_jump_link",
  "source_extraction_id": "3891d95391874d31a54dc15319f2aa38",
  "version": 1,
  "memory_type": "entities"
}
-->