# 泰兴小程序员工端工单（报事/报修）主题色修复
泰兴小程序员工端工单页因硬编码色值与未注入主题导致双主色，已统一为 `#1677ff`。

## 问题根因
- 同一页面出现两种主色：Tab 写死 `#0168F0`，底部按钮走 `var(--primary-color)` 但列表页未注入员工端主题，继承业主端 `#0A3D62`

## 修复方案
- 沿用 `@include staff-page-theme`（`#1677ff`），将硬编码色值改为 CSS 变量
- `staff/styles/theme.scss` 增加 `$staff-primary` SCSS 变量
- `staff/styles/index.css` 补充注释说明不可全局覆盖 `page`
- `issue/index.vue` 引入 `staff-page-theme`，Tab/ID/待受理状态色改 `var(--primary-color)`
- `issue/detail.vue` 同步修改

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：`staff/styles/theme.scss`、`staff/styles/index.css`、`staff/pages_facility/issue/index.vue`、`staff/pages_facility/issue/detail.vue`
- 所属项目：泰兴小程序；来源会话ID：2ca2f1e5-7a7d-4825-ba87-50c96508692b

<!-- MEMORY_FIELDS
{
  "category": "项目事实",
  "name": "taixing_ticket_fix",
  "source_extraction_id": "1d73c2d6945a4b4f88a81ca174efdb92",
  "version": 2,
  "memory_type": "entities"
}
-->