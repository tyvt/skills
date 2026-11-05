# 物业费申报详情页移除「保存」按钮（苏住房G）
苏住房G 项目 feeDeclare2/detail.vue 调整了「保存」按钮的显示条件，仅编辑模式可见。

## 修改说明
- 将 `operation-btn-group` 的 `showSave` 从 `formMode != 'view' && (formMode == 'edit' || active == 0)` 改为 `formMode == 'edit'`
- 一键申报（`formMode=add`）不显示「保存」，仅「返回」「下一步」
- 查看（`formMode=view`）不显示「保存」
- 编辑（`formMode=edit`）仍显示「保存」；新增仍通过第一步「下一步」调用 `submitForm()` 落库，逻辑未改

## 验证建议
- 本地验证：列表 → 一键申报 → 确认无「保存」；再进编辑确认「保存」仍可用

## 涉及文件与归属
- 涉及文件：`zhi2-web-admin/src/views/property/feeDeclare2/detail.vue` 等
- 所属项目：苏住房G；来源会话：a1f996bc-685b-423d-a130-f23d676a6962；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_declare_save",
  "source_extraction_id": "74b6128c507f42e8a98d5534bd5fc33d",
  "version": 1,
  "memory_type": "entities"
}
-->