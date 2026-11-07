# 要件上传标题行高度不一致修复
在 苏州市房地产监测V3 项目的公共组件 AppendixRequirementCard.vue 中完成修复，所有使用 requirement-grid 的页面一并生效。

## 改动说明
- 标题行固定 40px：与 AnnexUpload 折叠头一致（#f5f8ff、padding: 0 12px）
- 标题最多两行：-webkit-line-clamp: 2，避免长名称把条撑高；增加 :title 便于悬停看全称
- 右侧操作区占位：operable && cardOperable 时始终渲染 requirement-header-actions（min-width: 72px），仅在未达上传上限时显示「文件上传」

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证页面: 企业入网变更备案页，同一行两列要件标题条应顶底齐平
- 涉及文件: AppendixRequirementCard.vue, companyRecord/detail.vue, DeveloperBasicInfoForm.vue
- 所属项目: 苏州市房地产监测V3
- 来源会话ID: 18659b1e-74a9-4c54-8baf-badd2b1f687e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "requirement_card_fix",
  "source_extraction_id": "ef50d166515a4affbd40d092df51beed",
  "version": 1,
  "memory_type": "entities"
}
-->