# 租赁机构注册入口补全
苏州市房地产监测V3 登录页「机构注册」弹窗新增「租赁机构注册」入口，跳转 `/leaseInstitutionRegister` 流程。
## 问题根因
- 路由 `/leaseInstitutionRegister` 之前已做，但登录页「机构注册」弹窗没接入口，界面仅见「经纪机构注册」
## 修改内容
- `OrgTypeDialog.vue` 增加「租赁机构注册」按钮（`data-testid="org-type-lease"`）
- `login.vue` 选择后跳转 `/#/leaseInstitutionRegister` 刷新登录页，点机构注册后出现租赁机构注册，进入「企业账号注册（租赁机构）」流程
- 接口带 `organType=lease`、`busCode=030300`
## 验证与归属
- 涉及文件：`OrgTypeDialog.vue`、`login.vue`、`路由信息.json`、`company/institutionRegister/index.vue`
- 所属项目：苏州市房地产监测V3；来源会话ID：e3de2eb4-66cc-4ce0-a162-f78f72c64d0f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端组件",
  "name": "org_type_lease",
  "source_extraction_id": "ecb2c916fe7a444b9f3afc876a11bd7c",
  "version": 1,
  "memory_type": "entities"
}
-->