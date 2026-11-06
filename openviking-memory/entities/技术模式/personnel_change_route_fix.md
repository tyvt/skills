# 从业人员变更路由 component 路径修正
根据 listRouters 数据对照 views 下可作为路由入口的文件，修正 PersonalRecordChange 的路由配置以避免 permission 报错或加载错页。
## 必须修改项
- 菜单 ID `2112452973678424065` 的 `component` 由 `staffManagement/components/detail` 改为 `company/staffManagement/personnelChange/detail`
- `path` 建议由 `personalRecordChange` 统一为 `personnelChange` 或 `personnelRecordChange`，与 `detail.vue` 内 `personnelRecordChange`、`getRouterPathByFilePath('…/personnelChange/detail')` 一致
- 原因：`components/detail` 在路由表中被排除，会触发 `[permission]` 报错
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：permission.js、staffManagement/components/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：a49a48db-a76b-4bee-a6df-61c890175310；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_change_route_fix",
  "source_extraction_id": "165456c449fa4d7da22f43201a818ef9",
  "version": 1,
  "memory_type": "entities"
}
-->