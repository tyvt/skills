# DetailTemplate labelAbove 标签上方说明文案
资金拨付详情等在字段标签上方按条件追加说明文案，公共 DetailTemplate 新增 labelAbove 属性。

## 需求与做法
- 需求：资金拨付详情在「用款申请名称」后补「XXX社区已见证通过」，XXX 取自关联用款申请实际审核社区名，仅在有值时展示。
- 做法：不新造布局块，给公共 DetailTemplate 增加 labelAbove 属性（渲染在字段 label 上方小字说明），页面侧在 contentInfo 项写 labelAbove。
- 要点：字段先加进 form 并确认详情接口返回（getPubAllotNotice 的 approvalDeptName），前端不做本地兜底名。
- 空值必须给空串而非 undefined/null，否则渲染空白行占位；说明文案属展示层补充，不拼进 field label 或另起 Headline 区块。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 6a520d7b 用户要求用款申请名称后增加社区已见证通过，字段有值才展示、加在标签上面。
- 涉及文件：zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue
- 所属项目：苏住房G；来源会话ID：6a520d7b-daeb-45ff-b2c6-7701acbb59d1；代码基线：44d6576

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_label_above",
  "source_extraction_id": "e592ee3a3b1f492981b1f3ffdc20f2ce",
  "version": 1,
  "memory_type": "entities"
}
-->