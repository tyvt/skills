# 企业管理员路由e2e探针验证
苏州市房地产监测V3 新增企业经纪机构管理员 e2e 探针验证路由可达性。

## 新增夹具与用例
- 新增 `e2e/fixtures/company-admin-menu-config.js` 导出 4 个 filePath 常量与 `getAllCompanyAdminMenus()`，沿用 `institution-menu-config.js` 范式
- 新增 `e2e/company/company-admin-routes-probe.spec.js` 收集 `companyAdmin` 路由并产出 `zsbase-company-admin-routes.json`

## 质量校验
- ESLint 零告警且 node 导入导出校验通过

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/034.md
- 涉及文件：企业管理员管理-前端对接文档.md、前端技术信息.md、路由信息.json、package.json、toB/adminOperator/index.vue、detail.vue、listMixins.js、ListTemplate.js
- 所属项目：苏州市房地产监测V3；来源会话：fbb5081c-82da-4693-ab42-7a515b32cd7f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_e2e_probe",
  "source_extraction_id": "85ea740928034a10883a86b895152c50",
  "version": 1,
  "memory_type": "entities"
}
-->