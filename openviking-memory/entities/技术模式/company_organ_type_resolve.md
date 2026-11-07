# 管理员列表 organType 路由推断修复
苏州市房地产监测V3 修复了管理员列表在「开发企业管理」下错误请求 organType: "agency" 的 bug。

## 问题原因
- 管理员列表通过 `listOrganType` 拼进分页请求（`organType`）
- 双入口设计：`company/companyAdmin/developer/index` → 固定 `01`；`company/companyAdmin/agency/index` → 固定 `agency`
- 若菜单仍指向旧内核页 `company/companyAdmin/index`，没有 `CompanyOrganProvider` 注入，原先 `resolveOrganType` 会默认成 `agency`，导致在「开发企业管理」下却请求 `organType: "agency"`、列表展示「管理员等级」等问题

## 修改内容
- 在 `companyOrgan.js` 中增加 `resolveOrganTypeFromFilePath`
- 在 `resolveOrganType` 里根据路由 `meta.filePath` 推断 organType
- 含 `companyAdmin/agency` → `agency`；含 `companyAdmin/developer` → `01`；旧页 `company/companyAdmin/index`（及对应 detail）按原逻辑处理

## 涉及文件
- zhi2-web-admin/src/views/company/companyAdmin/index.vue
- zhi2-web-admin/e2e/fixtures/company-admin-menu-config.js
- zhi2-web-admin/src/mixins/companyOrganContext.js
- companyOrgan.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话ID：ffdc5b21-cec5-4d42-a465-057d2d68d9d7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_organ_type_resolve",
  "source_extraction_id": "a5b7583166ee4a9cb2fe2e4073952d6a",
  "version": 1,
  "memory_type": "entities"
}
-->