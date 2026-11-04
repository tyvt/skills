# 门户 RentalPages 租赁类别列纯文本化
RentalPages.vue 的"租赁类别"列由无效按钮改为纯文本，消除无效悬停与点击态。

## 问题根因
- 原渲染为绑定空函数 noop() 的 <button>，产生无效悬停与点击态

## 样式规则
- 改为 <span>住房租赁企业</span> 纯文本
- 删除 noop() 空函数
- 文字色沿用 #222
- 不影响"企业档案"链接列

## 验证与归属
- 验证证据：extracted source=zcode session=session_f7967c90115c8b16911d7e9608044e34
- 涉及文件：RentalPages.vue
- 来源会话ID：session_f7967c90115c8b16911d7e9608044e34

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rental_column_text",
  "source_extraction_id": "33f4963f45204d3a81f502bef31db9dd",
  "version": 1,
  "memory_type": "entities"
}
-->