# 工单按钮橙色实心被plain描边样式覆盖
物业手持B端工单详情页催办、回复按钮因设 plain 与 borderColor 致橙色实心样式被描边覆盖。

## 问题根因
- 根因：`src/pages_facility/issue/detail.vue` 中催办、回复按钮设 `plain: true` 与 `borderColor` 致描边覆盖橙色实心样式

## 解决方案
- 移除 `plain` 与 `borderColor` 改为橙色实心按钮，相关组件同步调整

## 验证与归属
- 验证证据：src=物业手持B端/002.md
- 涉及文件：src/pages/workbench/index.vue、src/pages_facility/issue/index.vue、src/components/PageButton/PageButton.vue、src/components/ZsButton/ZsButton.vue、src/pages_facility/issue/components/MoreDialog.vue、src/pages_facility/issue/detail.vue、src/uni.scss、src/pages_facility/record/add.vue
- 来源会话ID：c763d5aa-a951-4be2-a239-69bc3c433230
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "issue_plain_override",
  "source_extraction_id": "b4c8026653be44108193df34322483d4",
  "version": 1,
  "memory_type": "entities"
}
-->