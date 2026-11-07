# V3 预售资金菜单与前端修复
苏州市房地产监测V3 预售资金模块菜单权限插入及前端字段反查修复。

## 菜单与权限
- 2026-11-02 DBX 向 `COMMON_FRAMEWORK.SYS_MENU` 插菜单与按钮权限 23 条：监管账户(...620 列表/...666 详情)、监管协议(...664 列表/...667 详情)，按钮含 query/add/edit/remove/detail/submit/approval/cancelSubmit/cancelApproval（协议组加 print）

## 前端修复
- 监管账户详情/列表用 `orgName`/`mainAccountName` 但后端仅返 `orgId`/`mainAccountId` 致空白，已改 ID 反查补名称（detail.vue `fillOrgName`/`fillMainAccountName`），列表显 ID；Lint+构建通过已部署

## 收尾
- 联调收尾：测试数据清理、zsbase 密码与 Nacos 配置已还原

## 归属
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房V3技术",
  "name": "v3_prefund_fix",
  "source_extraction_id": "b92f718b8a55409ca3d47ef5e5f4ce65",
  "version": 1,
  "memory_type": "entities"
}
-->