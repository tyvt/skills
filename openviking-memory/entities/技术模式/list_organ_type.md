# 管理员列表 organType 路由推断修复
苏州市房地产监测V3 修复了因菜单指向旧内核页导致管理员列表 organType 默认错误的问题，改为按路由 filePath 推断。

## 问题根因
- 管理员列表通过 listOrganType 拼进分页请求 organType
- 双入口设计：developer/index 固定 01，agency/index 固定 agency
- 旧页 company/companyAdmin/index 无 CompanyOrganProvider 注入，resolveOrganType 默认成 agency，导致开发企业管理下请求 agency 并展示错误列

## 修改内容
- companyOrgan.js 增加 resolveOrganTypeFromFilePath
- resolveOrganType 根据路由 meta.filePath 推断：含 companyAdmin/agency → agency；含 companyAdmin/developer → 01；旧页 company/companyAdmin/index 及 detail 作兼容

## 涉及文件
- zhi2-web-admin/src/views/company/companyAdmin/index.vue
- zhi2-web-admin/src/mixins/companyOrganContext.js
- zhi2-web-admin/e2e/fixtures/company-admin-menu-config.js
- zhi2-web-admin/src/views/company/companyAdmin/companyOrgan.js

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话ID：ffdc5b21-cec5-4d42-a465-057d2d68d9d7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_organ_type",
  "source_extraction_id": "fc84a4f4f2314ce5913569c89a7f798e",
  "version": 1,
  "memory_type": "entities"
}
-->