# 注销页其他原因输入框溢出
苏住房C注销页 .other-reason-section 因同时设 width:100% 与 margin-left:24px，父容器 padding:20px 致输入框向右溢出偏右。
## 问题现象
- 注销页「其他原因」输入框向右溢出、整体偏右，与标题及提交按钮不对齐
- 根因：.other-reason-section 同时设 width:100% 与 margin-left:24px，父容器 padding:20px 放大偏移
## 解决方案
- 移除 margin-left:24px，使输入框与标题及提交按钮同宽对齐
- 该样式源于公共组件 ZsTextarea，影响注销、反馈、签约等多处表单
## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：苏住房C/036.md
- 涉及文件：cancellationReason.vue、ZsTextarea.vue、add_feedback.vue、signInfo.vue、ZsRadio.vue、form2.scss、uni.scss、app.js
- 来源会话ID：eb56a9b9-d956-416b-b204-677b8008eb20；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "cancellation_reason_overflow",
  "source_extraction_id": "d6a463af3a394dfc9c190fb365e5731a",
  "version": 1,
  "memory_type": "entities"
}
-->