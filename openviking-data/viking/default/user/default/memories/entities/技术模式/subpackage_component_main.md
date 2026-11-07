# 分包不可互引组件跨业务组件须置主包
微信分包间不能互相引用组件，苏住房C项目将跨业务组件从分包迁至主包 src/components/ 下。

## 问题根因
- 微信分包间不能互相引用组件
- pages_main/login 找不到 pages_tab/shared/AgreementCheck

## 解决方案
- 将跨业务组件从 pages_tab/shared/* 与 commonNew/* 迁至主包 src/components/ 下
- 分包仅留 Tab 专用组件供 componentPlaceholder 异步加载

## 涉及文件
- package.json
- vite.config.ts
- src/manifest.json
- src/utils/app.js
- 小程序报错问题汇总.md
- src/main.js
- src/page-query/company-query.vue
- src/main.ts

## 验证与归属
- 验证证据：extracted source=cursor session=51a70ae2-60f9-4cca-aae7-502b7737b3ad
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：51a70ae2-60f9-4cca-aae7-502b7737b3ad；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subpackage_component_main",
  "source_extraction_id": "bac8a29b0640417db020196152582699",
  "version": 1,
  "memory_type": "entities"
}
-->