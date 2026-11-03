# zs-advanced-query操作符列禁用与默认值成对
苏住房G公共查询complex的zs-advanced-query中，单操作符字段不能禁用中间框，需在选字段时自动补默认操作符解锁值控件。
## 问题根因
- 上一版为让选择类字段只能等值匹配，把仅1个可选操作符的字段整体disabled且不填operator。
- 值控件按operator已选才放开，导致死锁：中间禁用→operator空→值控件恒禁用。
## 解决方案
- 选左侧字段后中间操作符下拉一律可交互，绝不因单操作符而灰掉。
- 选字段时自动写该字段第一个可用操作符进condition（下拉类即"等于"），值控件立即可用。
- operator_type字典异步返回前不写入，字典到达后补一次默认值避免被空字典覆盖。
## 验证与归属
- 验证：会话1427f027用户诉求"不要禁用啊，你要么给默认等于"；结论中间操作符不再禁用+自动填默认，字典未加载完等返回补默。
- 涉及文件：zs-advanced-query.vue、complexFieldConfig.js、publicQuery/complex/index.vue
- 所属项目：苏住房G；来源会话：1427f027-16a3-4469-870f-96a1841c3b1f；代码基线：e590ffa

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "zs_advanced_query_operator",
  "source_extraction_id": "53dcdef5796c422395b4454bfc7226df",
  "version": 1,
  "memory_type": "entities"
}
-->