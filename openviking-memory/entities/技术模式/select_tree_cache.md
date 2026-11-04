# 树+表选择对话框中的树节点缓存
在 园区物管2.0 项目中，在左侧树、右侧明细表的对话框场景（SelectDialog.open / zs-select-dialog-func）中，主数据的填充应使用左侧树中选择的节点。

## 问题描述
- 右侧的分页行通常没有树层级字段或不完整；仅读取 row 会导致空或错误的填充
- 组件在打开时具有默认的树节点点击，以便即使没有手动点击也有初始选择

## 解决方案
- 在 open 之前声明 selectedTreeRow，onTreeClick 实时记录所选节点
- 在 then 中，使用 selectedTreeRow 分配 businessItemId/Code/Name，不要假设右侧 row 带来了所有 businessItem*

## 验证与归属
- 验证：会话 1aa18ac2，pubPaymentNotice/detail.vue 中 showBusinessItemDialog 改为缓存 onTreeClick + selectedTreeRow 填充 businessItem*
- 涉及文件: zhi2-web-admin/src/views/benefit/pubPaymentNotice/detail.vue, zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue
- 所属项目: 园区物管2.0; baseline: 7814a0c2a; 会话: 1aa18ac2-4320-4a6b-abb4-c64bc4cfcd68

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "select_tree_cache",
  "source_extraction_id": "6c8898c47fdb4ee29df38d30be085b29",
  "version": 2,
  "memory_type": "entities"
}
-->