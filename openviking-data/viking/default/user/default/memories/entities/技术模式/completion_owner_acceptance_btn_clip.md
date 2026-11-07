# 竣工验收详情业主代表验收意见按钮截断修复
园区公共收益项目竣工验收详情页业主代表验收意见操作列删除按钮被截断的根因与修复。

## 根因
- ownerAcceptanceTable.vue 给 zs-operate-column 传固定列宽 isQuery?80:120
- 非查询态行内有查看/编辑/删除 3 个 mini 按钮，需约 174px，120px 装不下
- zs-operate-column 本身支持自适应宽度（不传 width 时按按钮文字自动估算），固定宽度绕过该能力

## 修复要点
- 修改 ownerAcceptanceTable.vue 与 otherAcceptanceTable.vue（同源同款同步修改）
- 删除 :width="operateColumnWidth" 绑定及对应 computed，让操作列宽度按按钮自动计算

## 涉及文件
- zhi2-web-admin/src/views/maintenance/completion/components/ownerAcceptanceTable.vue
- zhi2-web-admin/src/views/maintenance/completion/components/otherAcceptanceTable.vue
- 未动 constructionInfoTable.vue

## 验证与归属
- 验证证据：extracted source=workbuddy project=园区公共收益
- 所属项目：园区公共收益；来源会话ID：4d45f0a4-0b7c-4a2c-a4e5-cff61b2ec75a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "completion_owner_acceptance_btn_clip",
  "source_extraction_id": "95cd5696de3f4e369b28c91aad42dc97",
  "version": 1,
  "memory_type": "entities"
}
-->