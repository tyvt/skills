# 详情页 Headline/Collapse 区块间距修复
苏州市房地产监测V3 修复 `.detail-from-container.el-row { gap: 0 }` 特异性高于容器 `gap: var(--detail-block-gap)` 导致 Headline 分块间距被覆盖的问题。

## 排查结论
- 全库检索 `gap: 0 !important` 后仅一处影响 Headline 分块间距，即已修复的 `.detail-from-container.el-row { gap: 0 }` 特异性高于 `.detail-from-container { gap: var(--detail-block-gap) }`
- 未发现 `.detail-container.el-row`、`.collapse-container.el-row` 等同类写法

## 间距机制（修复后）
- `<el-row class="detail-from-container">` + 多个直接 `Headline`：容器 flex gap（`--detail-block-gap` 12px）
- `detail-from-container` + 唯一 `zs-form` + 多个 `Headline`：`.detail-from-container > .el-form` 的 row-gap（zs-form 根节点是 el-form）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：detail-form.scss、Headline/index.vue、styles/index.scss
- 所属项目：苏州市房地产监测V3；来源会话ID：5180d428-0584-4329-9241-d8565c0dbc3e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headline_collapse_spacing_fix",
  "source_extraction_id": "aecd5ccb4e0e42769b1470cec6b4862f",
  "version": 1,
  "memory_type": "entities"
}
-->