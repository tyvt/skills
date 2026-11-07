# 资金拨付详情社区见证说明
苏住房G 项目资金拨付（pubAllotNotice）详情页在「用款申请名称」标签上方展示社区见证说明。

## 实现内容
- DetailTemplate 组件新增 labelAbove 属性，用于在字段标签上方显示补充文字
- pubAllotNotice/detail.vue 在 form 中增加 approvalDeptName 字段（由详情接口 getPubAllotNotice 返回）
- useMoneyInfo 的「用款申请名称」项上，当 approvalDeptName 有值时设置 labelAbove 为「{approvalDeptName}社区已见证通过」

## 接口与展示
- 后端详情接口 /benefit/pubAllotNotice/{id} 需返回 approvalDeptName（关联用款申请中实际审核的社区）
- approvalDeptName 为空时不显示该说明，查看模式下生效

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：pubAllotNotice/detail.vue、DetailTemplate 组件
- 来源会话ID：6a520d7b-daeb-45ff-b2c6-7701acbb59d1

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "allot_witness_note",
  "source_extraction_id": "430d6ab35af442f69d0d52b3be24b130",
  "version": 1,
  "memory_type": "entities"
}
-->