# 子表操作列固定宽裁切三按钮
竣工验收等子表里非查询态「查看/编辑/删除」三个 mini 按钮，若给 zs-operate-column 绑定 width 会绕过组件内置按可见按钮文字估宽（约 182px），fixed 右列只露删除按钮一边。

## 解决方案
- 删除 width 绑定与 operateColumnWidth 计算，与 #875 同一契约
- 组件按可见按钮文案自动估宽（约 182px）
- 查询态仅「查看」时自动收窄；仅两按钮且 120 够用的表可保留固定宽

## 涉及文件
- zhi2-web-admin/src/views/maintenance/completion/components/ownerAcceptanceTable.vue
- zhi2-web-admin/src/views/maintenance/completion/components/otherAcceptanceTable.vue
- zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue

## 验证与归属
- 所属项目：园区公共收益
- 来源会话：4d45f0a4-0b7c-4a2c-a4e5-cff61b2ec75a
- 代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_column_width",
  "source_extraction_id": "ae33c8b97175451f9aa74d76c19405ac",
  "version": 1,
  "memory_type": "entities"
}
-->