# 操作列固定宽度绕过自适应致按钮截断
ownerAcceptanceTable.vue 为 zs-operate-column 传固定列宽，非查询态 3 按钮需约 174px 被固定宽度裁切。

## 问题根因
- ownerAcceptanceTable.vue 为 zs-operate-column 传固定列宽 isQuery ? 80 : 120
- 非查询态 3 按钮需约 174px，固定宽度绕过组件自适应致「删除」按钮截断

## 解决方案
- 同步修改 otherAcceptanceTable.vue，删除 :width="operateColumnWidth" 绑定及 operateColumnWidth computed
- 改由 zs-operate-column 组件按按钮自动估算宽度

## 验证与归属
- 验证：src=园区公共收益/029.md
- 涉及文件：maintenance/completion/components/ownerAcceptanceTable.vue、maintenance/completion/detail.vue、components/zs-operate-column/zs-operate-column.vue、mixins/subTableMixins.js、maintenance/completion/components/otherAcceptanceTable.vue、mixins/table.js、maintenance/completion/components/constructionInfoTable.vue
- 所属项目：园区公共收益；来源会话：4d45f0a4-0b7c-4a2c-a4e5-cff61b2ec75a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operate_column_width_truncate",
  "source_extraction_id": "73db46eea5524c5d9a7735b32709d2a9",
  "version": 1,
  "memory_type": "entities"
}
-->