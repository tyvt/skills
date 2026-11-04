# padding-top inline 导致的不均匀间距
关于使用 padding-top inline 且无下边距导致未对齐的提示文本的技术规范。
## 问题根因
- 描述文本仅使用 padding-top:10px inline 且无下边距，垂直间距不均匀。
## 解决方案
- 使用全局样式 operation-hint，设置 display:flex, align-items:center, padding:0 12px 12px, line-height:22px 以居中。
## 文件与验证
- 涉及文件: pubRevenueContract/index.vue, assetsLeaseContractFiling/index.vue, styles/index.scss.
- 源会话: 95de17f2-76c3-4cab-884c-27a0549a0793; 基线: none.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operation_hint_spacing",
  "source_extraction_id": "fbb3c51bf7d04a09abe11b116bf5d283",
  "version": 1,
  "memory_type": "entities"
}
-->