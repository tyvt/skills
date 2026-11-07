# 淮安物管动态必填漏拦需自定义校验
弹窗表单动态 required 字段（如经营用房类别）在特定条件下必填，但 Element UI 动态 required 不稳定漏拦，需自定义 validator + 提交前二次校验。

## 问题根因
- Element UI 对通过表达式切换的 required 规则存在不稳定场景，表单项有时不会在空值时拦截提交。
- 与已知「条件必填用 rules.required 表达式」（#1437）不同，本条是动态 required 仍漏拦、需加固校验层。

## 解决方案
- 对关键条件字段改用自定义 validator，在回调里根据当前 form 状态判空并 callback(new Error('…'))。
- 在 submitForm 内于 validate 通过后增加提交前二次检查（同一套判空逻辑），防止 UI 校验穿透。
- 枚举/字典值为数字 0 时，判空要同时接受 0 与字符串 '0'（如 houseCategory），避免误报未选。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管
- 验收：新增时不选「经营用房类别」点确定，应在表单项下出现前端红色提示，而非仅弹后端错误。
- 验证：会话 f1ee611c（2026-06-25，基线 1664d0f）pubHouseDialog.vue 动态 required 未拦住空值提交；结论为增加自定义 validator、submitForm 二次检查，houseCategory 兼容 0 与 '0'。
- 涉及文件：zhi2-web-admin/src/views/benefit/pubHouse/components/pubHouseDialog.vue；所属项目：淮安物管；来源会话：f1ee611c-8cd6-4f31-969d-934eec1bceb2；代码基线：1664d0f。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dynamic_required_validator_bug",
  "source_extraction_id": "ef9840a3c94e4e1dbb34e9f98d363bef",
  "version": 1,
  "memory_type": "entities"
}
-->