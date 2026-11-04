# 门户经纪人页微信二维码白名单校验
BrokerPages 模板中微信二维码为静态 `img`，`:src` 使用已校验的 `wechatQrSrc`（`isAllowedPortalImageUrl`），纯 CSS 改 QR 尺寸不改变该安全约束。

## 安全约束
- 微信二维码为静态 img，:src 使用已校验的 wechatQrSrc（经 isAllowedPortalImageUrl 白名单校验）
- 纯 CSS 修改 QR 尺寸不改变该安全约束

## 改造规范
- 改经纪人/门店详情或接真实接口时须保持 URL 白名单校验，避免任意远程图注入

## 验证与归属
- 验证证据：QR 审查确认模板仍是静态 img + 已校验的 wechatQrSrc（isAllowedPortalImageUrl），与本次样式无关
- 涉及文件：src/views/home/publicPortal/pages/BrokerPages.vue
- 所属项目：门户；来源会话ID：383cd659-58a0-4aa4-b56f-de37d32a16e7；代码基线：dfee5a6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_qr_whitelist",
  "source_extraction_id": "ae068e827ad74504ac580e2a7560d494",
  "version": 1,
  "memory_type": "entities"
}
-->