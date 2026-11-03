# 员工端工单页主题未注入致主色冲突
泰兴小程序员工端工单列表页未注入主题，Tab 硬编码 `#0168F0` 而按钮走 `var(--primary-color)` 继承业主端 `#0A3D62`，产生主色冲突。
## 问题根因
- `issue/index.vue` 等页面未注入员工端主题，Tab 硬编码颜色与 CSS 变量不一致。
- 按钮使用 `var(--primary-color)` 继承业主端主色，导致界面主色冲突。
## 解决方案
- 在 `staff/styles/theme.scss` 定义 `$staff-primary`，页面引入 `@include staff-page-theme` 将硬编码改为 CSS 变量。
## 验证与归属
- 验证证据：src=泰兴小程序/003.md
- 涉及文件：src/uni.scss、src/staff/pages_facility/issue/index.vue、src/App.vue、src/staff/components/PageButton/PageButton.vue、src/staff/styles/theme.scss、src/staff/styles/filter.scss、src/staff/styles/tab.scss、src/staff/components/ZsButton/ZsButton.vue
- 来源会话ID：2ca2f1e5-7a7d-4825-ba87-50c96508692b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "staff_theme_conflict",
  "source_extraction_id": "c7a57cf5e1504976a95d5381a79c5cc8",
  "version": 1,
  "memory_type": "entities"
}
-->