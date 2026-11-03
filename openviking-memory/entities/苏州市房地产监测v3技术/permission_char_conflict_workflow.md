# 菜单权限字符与代码校验字符口径冲突处理规则
苏州市房地产监测V3 四证类多证照模块权限字符冲突时，先查 SYS_MENU 实际数据再定谁改谁，OperationBtnGroup 只走 permission-module-name/permission-business-name。

## 问题背景
- 四证（planLic/consLic/conLandLic/stateLandLic）及变更单按钮权限不显示
- 前端校验用 `certificate:*`，数据库 SYS_MENU 配的是 `presale:*`，仅 stateLandLic 配对
- 变更单前端业务名（landLicChange）与后端（conEngPlanLicChange 等）不一致

## 处理规则
- 先查 SYS_MENU 实际 perms 字符串，确认前再决定改代码还是改库
- 权限前缀只从 `permission-module-name`/`permission-business-name` 取，业务名原样传后端，接口零改动
- 变更单业务名必须以后端实际接口命名为准，前端拼错会导致 404
- 多证照模块正证+变更单共 11 个文件权限字符成组对齐，避免半对齐
- 对齐后用普通角色账号重新登录核对按钮显隐

## 验证与归属
- 验证证据：会话 session-56f7fbda-e26c-465e-b7a1-7aad8886f6f0（基线 235e6ee）
- 涉及文件：projectManagement/certificate/*/changeDetail.vue、BaseLandLicForm.vue 等 11 个文件
- 所属项目：苏州市房地产监测V3；来源会话：session-56f7fbda-e26c-465e-b7a1-7aad8886f6f0；代码基线：235e6ee

<!-- MEMORY_FIELDS
{
  "category": "苏州市房地产监测V3技术",
  "name": "permission_char_conflict_workflow",
  "source_extraction_id": "8eb23ada33d04411a8df7adbe568f048",
  "version": 1,
  "memory_type": "entities"
}
-->