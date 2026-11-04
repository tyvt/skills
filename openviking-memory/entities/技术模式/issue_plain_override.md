# 工单按钮橙色实心被plain描边样式覆盖
物业手持B端工单详情页催办、回复按钮因设 plain 与 borderColor 致橙色实心样式被描边覆盖。

## 问题根因
- 根因：`src/pages_facility/issue/detail.vue` 中催办、回复/反馈进度按钮设 `plain: true` 与 `borderColor` 致描边覆盖橙色实心样式

## 解决方案
- `detail.vue`：催办、回复/反馈进度改为橙色实心按钮，移除 `plain: true` 与 `borderColor`，避免被描边样式覆盖
- `ZsButton.vue`：`plain` 按钮保留 `::after` 描边且颜色继承 `border-color`；非 `plain` 按钮继续清除 `::after` 边框；补充 `type="default"`+`plain` 默认蓝色描边（`#0168F0`）
- `PageButton.vue`：自定义配色按钮增加 `btn-custom` class；全局 plain 样式仅作用于无自定义配色的按钮，避免覆盖橙色按钮

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages/workbench/index.vue、src/pages_facility/issue/index.vue、src/components/PageButton/PageButton.vue、src/components/ZsButton/ZsButton.vue、src/pages_facility/issue/components/MoreDialog.vue、src/pages_facility/issue/detail.vue、src/uni.scss、src/pages_facility/record/add.vue
- 来源会话ID：c763d5aa-a951-4be2-a239-69bc3c433230
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "issue_plain_override",
  "source_extraction_id": "492c8b0603a94a41bead32e1a63d8236",
  "version": 2,
  "memory_type": "entities"
}
-->