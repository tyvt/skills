# 报事工单详情文本截断Bug
报事工单详情因DetailTemplate默认单行省略致长文显示不全，已通过textarea类型修复。

## 问题根因
- src/views/property/workOrder/order/detail.vue 报事内容走 DetailTemplate 默认文本展示
- 添加 ellipsis-single 截断长文

## 修复方案
- 为 contentInfo 与 orderContentInfo 字段增 type:'textarea' 支持换行滚动完整展示

## 验证与归属
- 验证证据：src=惠山二期G/012.md
- 涉及文件：src/views/property/workOrder/order/detail.vue、src/components/detail-template/detail-template.vue
- 所属项目：惠山二期G；来源会话：01a166de-6e97-764e-99b7-41bf677e9bf5；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "workorder_text_bug",
  "source_extraction_id": "231c4221ac6f44ddb6585f0f9f0386c6",
  "version": 1,
  "memory_type": "entities"
}
-->