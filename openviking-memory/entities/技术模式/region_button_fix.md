# 区域银行授权删除按钮缺失修复（苏住房G）
苏住房G 项目修复系统管理区域银行授权区级节点操作列缺少删除（及编辑）按钮的问题。

## 问题原因
- 区级 `district` 的 `buttons` 原只配了「查看」和「变更」，已写好的 `handleDeleteVersion`、`handleUpdate` 方法未挂到 `buttons`，页面不显示按钮

## 修复内容
- 区级操作列补回编辑、删除按钮：显示条件为有待提交版本（`pendingVersionId`）或草稿状态（`bizState === '0'`）；变更按钮条件为已备案（`bizState === '2'`）且无待提交版本
- 修正 `handleDeleteVersion` 确认框参数错误：原用 `content`，`confirm` 方法实际认 `message`，导致提示文案不对

## 验证与归属
- 所属项目：苏住房G；来源会话：38650b90-e3ca-4bec-979e-fbc872878820；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：`system/regionBankAuth/index.vue`、`listMixins.js`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_button_fix",
  "source_extraction_id": "6c711be48c694126ab487e463c9d3689",
  "version": 1,
  "memory_type": "entities"
}
-->