# 分包静态资源跨包加载失败
苏住房C(zhi2-mobile-shimin)小程序中电子业主卡页面因跨分包加载静态资源导致图标加载失败，需将资源复制到本分包并修复样式穿透。

## 问题根因
- 电子业主卡页面位于 pages_owner_extra 分包，但导航图标等从 pages_owner 分包加载
- 违反小程序分包限制（分包间静态资源不可互相访问），导致图标加载失败

## 修复做法
- 将图标复制到 pages_owner_extra/static/ 目录
- 更新 ownerCard/index.vue 的 subpackage 配置与 resolveStaticUrl 方法
- 用 :deep() 修复 scoped 样式穿透问题

## 验证与归属
- 验证：会话 9b333521 用户反馈电子业主卡图标加载失败，agent 复制资源并修复样式穿透
- 涉及文件：src/pages.json、src/pages_owner/ownerCard/index.vue、src/pages_owner_extra/ownerCard/index.vue、src/pages_tab/components/menu/MenuSection.vue、src/store/menu.js、src/components/ZsImage/ZsImage.vue、src/utils/index.js、src/pages_tab/components/menu/MenuImage.vue
- 验证证据：src=苏住房C/042.md；来源会话ID：9b333521-93bd-4e07-8e91-b6a53dcd962f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_static_cross_access",
  "source_extraction_id": "2c47098b9b9847d2b91828f0ccce3081",
  "version": 1,
  "memory_type": "entities"
}
-->