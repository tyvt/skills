# 门店详情隐藏交易记录且不扩路由兜底
store-detail 按需求隐藏交易记录表格，字段与 mock、模板分支对齐无缺陷；正常路径仅从列表进入且 mock 携带 parentAgency，未扩展路由兜底。

## Description
- 现象：门店详情页（store-detail）依需求隐藏交易记录表格，字段与 mock、模板分支对齐，无缺陷。
- 约束：正常访问路径仅从列表进入，且 mock 携带 parentAgency 字段；未扩展路由兜底逻辑。

## 样式规范
- 窄屏下 `.broker-store-fields` 在 `@media (max-width: 1200px)` 为单列网格。
- 负责人电话依设计稿保持完整号码（不截断），与经纪人详情脱敏策略不同。

## 验证与归属
- 验证证据：src=门户/031.md；会话 fbcede5c 用户明确要求去掉交易记录，审查确认仅从列表进入的正常路径已满足
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/BrokerPages.vue、src/views/home/publicPortal/mock/brokers.js、src/views/home/publicPortal/portal.scss、tests/e2e/fixtures/public-portal-designs、tests/e2e/public-portal-interactions.spec.ts
- 所属项目：门户；来源会话ID：fbcede5c-3408-4b17-a700-fe4ca4fd9b05；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "store_detail_hidden_records",
  "source_extraction_id": "9dd748c3892e4ba78f693dac61c13ae3",
  "version": 2,
  "memory_type": "entities"
}
-->