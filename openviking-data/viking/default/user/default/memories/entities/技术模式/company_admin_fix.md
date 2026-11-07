# 租赁机构管理员变更列表对齐修复
苏州市房地产监测V3 项目中，按租赁机构侧通用列表结构修复了管理员变更列表的标题与样式缺失问题。

## 原因
- `companyAdmin/index.vue` 已有 `zs-search-form` + `list-card` + `zs-table`，但缺少标准 `ListOperationButtonContainer`
- 导致无左侧「xxx列表」标题，表格区域样式与同模块页面不一致

## 修改要点
- 表格上方增加 `ListOperationButtonContainer`，标题 `管理员变更列表`（`listName` 由「管理员信息列表」改为与菜单一致）
- 企业端（B 端）标题栏右侧保留「新增」按钮（权限由 `zs-button` 的 `:permission` 控制）
- 表格列对齐：序号 `width="80"`、姓名列 `min-width`、操作列 `show-all` + `width="180"`

## 涉及文件与验证
- `companyAdmin/index.vue`
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：3224c947-2f79-4071-9cd1-d9569d70224c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_admin_fix",
  "source_extraction_id": "49b89a2862454eb7a8ec7d3ff1097f82",
  "version": 1,
  "memory_type": "entities"
}
-->