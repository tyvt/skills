# 详情页幽灵 flex gap 扫描模式
苏州市房地产监测V3 项目扫描发现 .detail-container 内 overlay 组件作为直接子节点导致多余间距的问题。

## 扫描结果
- 使用 class="detail-container" 的 detail.vue 共 397 个
- 存在幽灵 flex gap 问题的文件共 25 个

## 判定标准
- 在 .detail-container（display: flex; gap: 24px）内
- <zs-tencent-map> 或 <SelectDialog> 作为直接子节点
- 出现在表单块（detail-from-container / zs-form 外层）结束之后、下一个主可见区块（zs-tabs、顶层 Headline 等）或 operation-btn-group 之前

## 受影响文件示例
- customerProject/detail.vue 插入 zs-tencent-map + SelectDialog，tabs 前多余间距最明显
- 正确参考：buildinginfo/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3
- 来源会话ID：27b13db9-d5eb-4224-b277-0551d3f307f5
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_ghost_flex_gap",
  "source_extraction_id": "d2241605997b4738a763da461ea5ccb9",
  "version": 1,
  "memory_type": "entities"
}
-->