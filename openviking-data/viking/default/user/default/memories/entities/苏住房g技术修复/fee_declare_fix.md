# 物业费申报提交按钮逻辑修复（苏住房G）
苏住房G 项目物业费申报（feeDeclare2）新增/编辑/查看模式下提交与保存按钮显示逻辑修复。

## 改动文件
- `feeDeclare2/detail.vue`：去掉 `forceShowSubmit`，增加 `:showSubmit="formMode != 'edit'"`，编辑模式不显示「提交」
- `OperationBtnGroup`：恢复原有提交按钮逻辑（仅查看模式且 `bizState == 0` 时显示）

## 按钮规则
- 新增 / 编辑：显示「保存」
- 查看（草稿）：显示「提交」
- 编辑：不显示「提交」

## 验证与归属
- 所属项目：苏住房G；来源会话：9ce5c9a2-4e7d-41cf-bb2c-201ef6f68770；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：feeDeclare2/detail.vue、feeDeclare2/index.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "fee_declare_fix",
  "source_extraction_id": "ec57e1fd4b5e42818b6deaa5a40b679a",
  "version": 1,
  "memory_type": "entities"
}
-->