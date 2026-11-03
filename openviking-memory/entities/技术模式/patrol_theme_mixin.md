# 巡保记录模块缺主题mixin致色不统一
巡保记录模块原先缺少统一主题色变量，通过定义 staff-page-theme mixin 统一主色并注入记录页面根容器解决。

## 问题根因
- 巡保记录模块原先缺少统一主题色变量，各记录页面主色不一致。
- 未在页面根容器注入主题 mixin，导致样式分散。

## 解决方案
- 在 `src/staff/styles/theme.scss` 定义 `staff-page-theme` mixin 统一 `#1677ff`。
- 在 5 个记录页面根容器 `@include staff-page-theme` 注入主题变量。

## 验证与归属
- 验证证据：src=泰兴小程序/008.md
- 涉及文件：src/staff/pages_facility/record/index.vue、src/styles/index.css、src/staff/pages_facility/components/FilterPopup.vue、src/staff/components/PageButton/PageButton.vue、src/styles/filter.scss、src/staff/components/ZsButton/ZsButton.vue、src/pages/staff/workbench/index.vue、src/staff/styles/index.css
- 来源会话ID：fbfc005c-6b27-416e-b681-be3d510d845e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "patrol_theme_mixin",
  "source_extraction_id": "4c3a967cfa754abaaf0971d44b2c61e6",
  "version": 1,
  "memory_type": "entities"
}
-->