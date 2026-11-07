# 管理员变更列表样式与标题修复
苏州市房地产监测V3 项目中，修复租赁机构侧「管理员变更」列表缺少标准标题栏与样式不一致的问题。

## 问题原因
- `companyAdmin/index.vue` 已有 `zs-search-form` + `list-card` + `zs-table`，但缺少标准 `ListOperationButtonContainer`
- 导致无左侧「xxx列表」标题，表格区域样式与同模块页面不一致

## 修改内容
- 在表格上方增加 `ListOperationButtonContainer`，标题改为 `管理员变更列表`（原「管理员信息列表」与菜单「管理员变更」对齐）
- 企业端（B 端）标题栏右侧保留「新增」按钮，权限由 `zs-button` 的 `:permission` 控制
- 表格列与操作列对齐同类页：序号 `width="80"`、姓名列 `min-width`、操作列 `show-all` + `width="180"`

## 验证与归属
- 刷新 `#/leaseOpen/companyAdmin` 后应看到与其它租赁机构列表一致的标题栏和卡片内布局
- 所属项目：苏州市房地产监测V3
- 涉及文件：`companyAdmin/index.vue`
- 来源会话ID：3224c947-2f79-4071-9cd1-d9569d70224c
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "company_admin_list_fix",
  "source_extraction_id": "64135c6de2f8446c95b85023673ec5dc",
  "version": 1,
  "memory_type": "entities"
}
-->