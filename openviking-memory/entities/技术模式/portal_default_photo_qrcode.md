# 公开门户二级页缺省人像与二维码
公开门户各二级页需要统一缺省人像与二维码占位图时，应抽公共模块供列表卡与详情弹窗共用。
## 模块设计
- 抽公共模块（如 portalPersonPhoto.js）供列表卡与 DetailDialog 共用，避免每页各写一套 URL 或尺寸
- 接入后注意摘要区/头像区垂直间距，过大时收紧 margin/gap 但不破坏四列网格的标签-值对齐
## 数据同步
- Mock 数据（如 brokers.js）随占位图策略一起更新
- E2E fixture（public-portal-designs.ts）随占位图策略一起更新，防止联调与截图测试仍指向旧资源
## 涉及文件
- zhi2-web-admin/src/views/home/publicPortal/portalPersonPhoto.js
- zhi2-web-admin/src/views/home/publicPortal/mock/brokers.js
- zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- zhi2-web-admin/src/views/home/publicPortal/components/RentalDetailDialog.vue
- zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.ts
- 所属项目：门户；来源会话：f3136e73-1172-459f-872c-cc4efe5d4b2f；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_default_photo_qrcode",
  "source_extraction_id": "8e20f6fee1674c00937ae27996fd4506",
  "version": 1,
  "memory_type": "entities"
}
-->