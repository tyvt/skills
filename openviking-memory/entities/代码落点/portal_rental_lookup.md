# 住房租赁合同备案查询代码落点
住房租赁合同备案查询仅在 zhi2-web-admin 的 publicPortal（Vue2）实现，排查该功能勿去 React 或其他子工程找页面。

## 代码落点
- 页面：RentalPages.vue（kind===rental-contract 时 contractResult + portal-rental-result-grid）
- 弹窗路由：PortalDialogHost.vue（portal=rental-contract）
- 数据：mock/rental.js（rentalContractFixture、matchRentalContract）
- 样式：portal.scss；主题：portalTheme.js
- 菜单：UnifiedLogin portal:rental-contract
- E2E：public-portal-interactions.spec.ts 断言 .portal-rental-contract-result

## 验证与归属
- 验证证据：会话 sess_subagent_agent_f8d81def 代码检索结论（Primary page public portal under zhi2-web-admin）
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/RentalPages.vue；PortalDialogHost.vue；mock/rental.js；portal.scss
- 所属项目：门户；来源会话ID：sess_subagent_agent_f8d81def-e267-4e9f-bff8-538fa92004d3；代码基线：门户 zhi2-web-admin @ dfee5a6（2026-10-21）

<!-- MEMORY_FIELDS
{
  "category": "代码落点",
  "name": "portal_rental_lookup",
  "source_extraction_id": "53b97c16cee14d85a13ad8202c60d342",
  "version": 1,
  "memory_type": "entities"
}
-->