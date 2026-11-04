# 企业管理员菜单路由E2E探针
苏州市房地产监测V3 项目 zhi2-web-admin 新增 2 个 e2e 文件，对开发企业/代理机构管理员菜单路由做可达性探针，未改动既有测试。

## 新增文件
- e2e/fixtures/company-admin-menu-config.js：管理员菜单清单，导出 4 个 filePath 常量 + getAllCompanyAdminMenus()，沿用 institution-menu-config.js 范式
- e2e/company/company-admin-routes-probe.spec.js：登录后收集 companyAdmin 路由，逐个 gotoPageByFilePath 跳转（列表无 query、详情带 formMode=view），产出 zsbase-company-admin-routes.json

## 验证结果
- ESLint 两个文件零告警
- node 直接 import fixture 验证导出正确（列表 developer/index、agency/index；详情 developer/detail、agency/detail）
- playwright.config 的 testDir 配置正确

## 验证与归属
- 涉及文件：company-admin-menu-config.js、institution-menu-config.js、company-admin-routes-probe.spec.js、zsbase-company-admin-routes.js
- 所属项目：苏州市房地产监测V3；来源会话：fbb5081c-82da-4693-ab42-7a515b32cd7f

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "company_admin_e2e",
  "source_extraction_id": "97e9acda86194a2a9a55d80bc7b40fe0",
  "version": 1,
  "memory_type": "entities"
}
-->