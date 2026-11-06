# 共有资金资金拨付详情页重复提交按钮修复（苏住房G）
苏住房G 项目修复 pubAllotNotice/detail.vue 详情页因额外自定义提交按钮导致的重复提交与报错问题。

## 问题原因
- operation-btn-group 已通过通用组件 ZsSubmit 提供标准流程提交按钮（带 ✓ 图标）
- 页面插槽额外加了自定义「提交」按钮调用 audit() → auditPubAllotNotice（专用接口 /benefit/pubAllotNotice/allotNoticeSubmit/），该 API 未导入且不走通用工作流，点击易报「单据不存在」

## 修改说明
- 删除多余的自定义「提交」按钮
- 删除无效的 audit() 方法
- 仅保留 operation-btn-group 内置通用提交按钮，与用款申请等其他业务页一致

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue、zhi2-web-admin/src/views/maintenance/wxjjBO/detail.vue
- 来源会话ID：2a7cb099-1915-4bd0-aa63-59c78d341af4

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "pub_allot_submit",
  "source_extraction_id": "4f84ed465fbf45709ebc9281d8ed22a1",
  "version": 1,
  "memory_type": "entities"
}
-->