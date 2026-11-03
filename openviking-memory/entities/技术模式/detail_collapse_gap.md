
# 表单折叠块垂直间距问题
带 Collapse 块的表单缺少垂直间距，与只读布局不一致。

## 根因
- 表单组件中的 `.detail-from-container` 包含多个 Headline（`.collapse-container`）但缺少垂直间距。

## 解决方案
- 在 `zhi2-web-admin/src/styles/index.scss` 中为 `.developer-basic-info-form` 和 `.agency-basic-info-form` 添加 `display: flex; flex-direction: column; row-gap: var(--detail-block-gap)`。

## 涉及文件
- `detail.vue`、`detail-form.scss`、`DeveloperBasicInfoForm.vue`、`Headline/index.vue`、`DeveloperBasicInfoDetail.vue`（位于 苏州市房地产监测V3 项目）

## 验证
- 证据：src=苏州市房地产监测V3-leftover/020.md；会话 479fbf59-8cc1-4660-b5b4-7e972253abe9；代码基线 none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_collapse_gap",
  "source_extraction_id": "90c73514e50f41c38ba0d322cbec7cd4",
  "version": 2,
  "memory_type": "entities"
}
-->