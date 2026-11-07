# 弹窗批量提示与表单并排换行修复
园区公共收益项目中，zs-dialog 横排 flex 下 batch-tip 与 form-box 并排挤压导致文案折行的修复模式。

## 问题背景
- 待办「批量审批」等弹窗：batch-tip 与表单区同为 zs-dialog 内容区直接子节点
- dialog 内容常为横向 flex，提示条与 form-box 并排挤压，「批量处理 N 条数据」会折行

## 解决方案
- 将 batch-tip 移入 form-box 内部置顶
- 对提示加 white-space: nowrap；条数可用独立 span 高亮

## 涉及文件
- zhi2-web-admin/src/views/flowable/components/BatchApprovalDialog.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- BatchApprovalDialog：batch-tip 移入 form-box；batch-tip 增加 nowrap
- 所属项目：园区公共收益；来源会话 7bba50ec-878d-4ecc-aa51-2d784ce86b6d；代码基线 0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_batch_tip_wrap",
  "source_extraction_id": "729462dc60724a439e21f41e80afdde9",
  "version": 1,
  "memory_type": "entities"
}
-->