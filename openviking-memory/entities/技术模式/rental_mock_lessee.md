# 租赁mock仅验出租方致承租方查失败
`src/views/home/publicPortal/mock/rental.js` 中 `matchRentalContract` 仅与 fixture 出租方全量相等匹配，未比对承租方字段，致承租方凭正确备案编号仍查不到。需扩展匹配逻辑同时支持承租方凭证查询。

## 问题说明
- `matchRentalContract` 仅与 fixture 出租方全量相等匹配
- 未比对承租方字段，承租方凭正确备案编号仍查不到

## 修复方向
- 扩展匹配逻辑同时支持承租方凭证查询

## 涉及文件
- 核心逻辑：`src/views/home/publicPortal/mock/rental.js`、`PortalDialogHost.vue`、`UnifiedLogin.vue`
- 组件与页面：`PropertyDetailDialog.vue`、`PortalTable.vue`、`InformationPages.vue`、`BrokerPages.vue`
- 测试与配置：`tests/e2e/public-portal-interactions.spec.ts`、`mock/brokers.js`

## 验证与归属
- 来源会话：a64b0300-ecc7-4dc4-8634-47c21fd95aed

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rental_mock_lessee",
  "source_extraction_id": "9cd718c77153473c93085560094e132a",
  "version": 1,
  "memory_type": "entities"
}
-->