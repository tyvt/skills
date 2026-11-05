# 我的决策页导航双头修复
苏住房C 项目 `pages_owner/decision/index.vue` 因 pages.json 未设自定义导航导致系统栏与 ZsNav 重复渲染，已修复。

## 问题原因
- `decision/index` 路由在 `pages.json` 使用默认系统导航栏，未设置 `navigationStyle: "custom"`
- 同页面已使用自定义导航 `ZsNav`，导致系统顶栏与 ZsNav 各渲染一次，出现双头标题

## 修复要点
- 在 `zhi2-mobile-shimin/src/pages.json` 的 `decision/index` 中增加 `"navigationStyle": "custom"`
- 重新编译后仅保留一条「我的决策」头部；若仍双头可清缓存或去掉 `<ZsNav>` 统一

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：18d9a799-b438-480c-b29c-cf616ca0f008
- 涉及文件：pages_owner/decision/index.vue、pages.json、zhi2-mobile-shimin/src/pages.js
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "decision_nav_fix",
  "source_extraction_id": "e85e753071284223b9a0af1850f7992a",
  "version": 1,
  "memory_type": "entities"
}
-->