# 银行授权弹窗未选银行搜索拦截修复
苏住房G 项目 zs-select-dialog-func.vue 修复太仓区无授权银行时右侧网点列表误查全部的问题。

## 问题原因
- 太仓区未授权银行时，SelectDialog 左侧银行列表为空
- 右侧点「搜索」仍调用 selectTJgBankBranchList 且未带 workBankId，查出全部网点
- 开户申请(benefit/pubRegulatoryAccount)点「管理银行」走此公共弹窗，导致可误选网点保存

## 修复内容
- 未选左侧银行时，右侧列表不请求接口，表格显示「请先选择左侧银行」
- 点搜索时提示「请先选择银行」，不出现网点列表
- 业务页 showBankDialog() 使用的即此弹窗，无需改业务页代码

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zs-select-dialog-func.vue、maintenance/accountOpen/components/OpenDetailDialog.vue
- 来源会话ID：e54e19e2-5d01-4169-ace4-1cfb25836888

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_dialog_fix",
  "source_extraction_id": "cc5f4cc126b94211921fea7c38780aa8",
  "version": 1,
  "memory_type": "entities"
}
-->