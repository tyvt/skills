# 开户申请详情打印按钮修复（苏住房G）
苏住房G 项目修复开户申请详情页在「待提交」状态错误显示打印按钮的问题。

## 问题原因
- `pubRegulatoryAccount/detail.vue` 原先写死 `:showPrint="true"`
- 公共组件 `OperationBtnGroup` 打印条件为 `bizState == '2' || showPrint`，导致「待提交（0）」也出现打印，与「提交后再打印」规则冲突

## 修复内容
- 改为仅在「审核中」通过 `showPrint` 打开打印：`:showPrint="form.bizState == 1"`
- 已备案（bizState=2）仍由组件内 `bizState == '2'` 控制可打印

## 验证与归属
- 涉及文件：`pubRegulatoryAccount/detail.vue`、`pubRegulatoryAccount/index.vue`
- 所属项目：苏住房G；来源会话：aa77bf08-b75c-4a44-9c71-0b0c16264336
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "account_print_fix",
  "source_extraction_id": "7de707754b5c430297ab66535487c776",
  "version": 1,
  "memory_type": "entities"
}
-->