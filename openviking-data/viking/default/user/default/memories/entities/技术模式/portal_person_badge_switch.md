# 二级页人员名称资质图标由开关统一隐藏
portalAssets.js 新增 SHOW_PORTAL_PERSON_BADGE 开关常量，统一控制二级页人员姓名旁资质 badge 图标的显隐。

## 改造内容
- portalAssets.js 新增 SHOW_PORTAL_PERSON_BADGE = false 开关常量
- BrokerPages.vue 与 RentalDetailDialog.vue 姓名旁 badge 图标受该开关控制隐藏
- 原 translateX(17px) 移入 .has-badge 类，避免隐藏 badge 后姓名位置偏移

## 验证与归属
- 涉及文件：portalAssets.js、BrokerPages.vue、RentalDetailDialog.vue
- 来源会话ID：session_3c17086fb599b9c34b78df31fd6fad0a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_person_badge_switch",
  "source_extraction_id": "6ae3238f0b554c53a5a67bbe5b3718b8",
  "version": 1,
  "memory_type": "entities"
}
-->