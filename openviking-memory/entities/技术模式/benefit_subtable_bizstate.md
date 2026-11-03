# 园区收益租赁类子表仅按 bizState 控操作
资产租赁/经营资产合同等 benefit 子表，业务方明确要求不要用 formMode（查看/编辑）限制行内操作，仅以主单 bizState 为准。

## 操作规则
- bizState 为 `0` / `'0'`（待提交）：批量删除、勾选、拟租金额编辑、单行删除均可用。
- 非待提交：批量能力隐藏，单行删除置灰或隐藏。
- 与「详情 readOnly 必须同时判 formMode + bizState」的通用套路相反，落地前需确认产品口径。

## 实现要点
- 集中 `canOperate` 计算属性，避免混用 `disableButton` 与页面 `formMode`。
- 结论表仅按 bizState，不限制查看/编辑模式。

## 验证与归属
- 验证证据：用户诉求 2「查看状态也可以操作，只根据bizState判断」。
- 涉及文件：zhi2-web-admin/src/views/benefit/assetLeaseApply/components/houseTable.vue、zhi2-web-admin/src/views/benefit/assetsLeaseContractFiling/detail.vue
- 所属项目：园区公共收益；来源会话ID：f1d10e9a-1ce1-4000-b675-9ed44669437d；代码基线：4468dfa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_subtable_bizstate",
  "source_extraction_id": "a0dff37d982d44f1904b307947a717bd",
  "version": 1,
  "memory_type": "entities"
}
-->