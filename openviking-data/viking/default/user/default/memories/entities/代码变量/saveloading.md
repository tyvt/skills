---
audit_status: valid
last_checked: 2026-11-27T10:46:19+08:00
verdict_note: 在苏住房G仓源码命中核心符号(6/6)operationbtngroup,property,regionbankauth,regionbankauthchange，涉及文件存在，描述与现状一致，判有效。
---
# saveLoading
苏住房G 前端（zhi2-web-admin）中用于按钮保存状态的布尔变量，默认 false。

## 定义与用途
- 在 src/components/OperationBtnGroup/index.vue 中定义 saveLoading:false，内置「保存」按钮使用
- 在 src/views/system/regionBankAuth/detail.vue 定义并手动管理
- 在 src/views/system/regionBankAuthChange/detail.vue 定义并手动管理
- 在 src/views/property/workOrder/order/detail.vue 定义并重写 submit
- 全项目共 7 个文件 11 处引用（来源会话 f2c4d1f7-640e-4ba2-9775-aab1b1b3d524）

## 验证与归属
- 所属项目：苏住房G
- 验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "代码变量",
  "name": "saveLoading",
  "source_extraction_id": "8f365bc283fd409392b11ad789db912c",
  "version": 1,
  "memory_type": "entities"
}
-->