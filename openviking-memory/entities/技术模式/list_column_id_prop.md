# 列表操作人列误绑 ID 字段：横向比对同模块兄弟页改 prop
信用管理-检查记录列表「操作人」列渲染成 19 位雪花 ID 形态数字，实为列 prop 绑了存用户 ID 的 evaluator 字段。
## 问题根因
- 列 prop 误用 evaluator（存用户 ID），同模块「综合查询」页同语义用 recordUser（姓名）
- 非脱敏失效也非雪花 ID 精度丢失（后者末位变 0），而是 ID 被当文本展示
- 定位法：列表列出现雪花 ID 形态纯数字串，先判定为 ID 被展示而非精度丢失，再横向比对同模块正确字段
## 解决方案
- 只动列 prop 从 evaluator 改回 recordUser，不动接口、不加 evaluator||recordUser 兜底
- 字段语义明确后必须收敛到唯一正确字段，联调阶段才用多候选回退
- 与「新列整列为 -」「雪花 ID 精度丢失」不同：本条字段选错但渲染正常，仅看内容形态可发现
## 验证与归属
- 验证证据：会话 d199a1b4，用户截图指出信用管理-检查记录不应显示流水号，改 credit/record/index.vue 列 prop
- 涉及文件：zhi2-web-admin/src/views/credit/record/index.vue、zhi2-web-admin/src/views/publicQuery/assessment/index.vue
- 所属项目：苏住房G；来源会话ID：d199a1b4-ccfd-4bfe-a151-d44cceb9f4c9；代码基线：d109b83

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "list_column_id_prop",
  "source_extraction_id": "6309376b0dde46f082e58b77a70f3936",
  "version": 1,
  "memory_type": "entities"
}
-->