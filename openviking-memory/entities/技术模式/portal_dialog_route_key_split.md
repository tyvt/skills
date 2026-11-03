# 公网弹窗独立路由 Key 避免串台
商品房与存量房等结构相同的业务线弹窗，必须拆独立路由 key 并分别配置标题与主题，避免共用导致标题串台。
## 问题根因
- 商品房「可售房源信息公示」与存量房「出售信息公示」共用同一 Portal 路由 key（portal:inventory）会导致弹窗标题固定为其中一侧文案
- 用户从存量房菜单进入也会看到商品房标题，入口与文案错位
## 解决方案
- 业务线即使页面结构相同也必须拆独立 key（如存量房用 portal:stock-inventory）
- 在 PortalDialogHost/路由注册处分别配置标题与主题，不只用菜单文案区分
## 涉及文件
- zhi2-web-admin/src/views/home/publicPortal/PortalDialogHost.vue
- zhi2-web-admin/src/views/home/publicPortal/pages/InformationPages.vue
- zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.ts
- zhi2-web-admin/tests/e2e/public-portal-interactions.spec.ts
- 所属项目：门户；来源会话：e9f92d71-8255-4a86-a77b-f58a8d4170ac；代码基线：e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_dialog_route_key_split",
  "source_extraction_id": "8e20f6fee1674c00937ae27996fd4506",
  "version": 1,
  "memory_type": "entities"
}
-->