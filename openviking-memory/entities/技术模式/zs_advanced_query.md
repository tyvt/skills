# zs_advanced_query
苏房公共查询高级查询操作符下拉占位符与自动选中第一项规则需按启用/禁用与操作符数量分流。
## 问题现象
- 公共查询类页面高级查询条件，字段选「物业企业信用等级」后，操作符下拉无「请选择」占位，直接显示第一个操作符，用户误以为系统已选。
## 根因
- zs-advanced-query 在字段变更时无条件把 operatorList[0] 回填进操作符，既有值不显示 placeholder，是既有「省一步」策略。
## 解决方案
- 公共组件按「可操作 + 操作符可选数量」分流：仅固定操作符字段（operatorList.length === 1）自动选中；多操作符字段保留空值且 placeholder 设「请选择」；placeholder 仅在启用下拉显示，字段未选/禁用时传空字符串避免灰色提示残留。
- 改动落公共组件会影响所有高级查询页（如物业管理区域查询），回归原自动带默认操作符体验；业务侧字段顺序/默认值不动，尤勿在用旧默认值做「未选」判定的地方把空值当已选。
## 验证与归属
- 验证：用户要求公共查询-物业管理区域查询操作符下拉默认占位「请选择」、禁用时不显示；结论占位按启用/禁用区分，多操作符不再自动选中，仅固定操作符字段自动选中。
- 涉及文件：zhi2-web-admin/src/components/zs-advanced-query/zs-advanced-query.vue、src/views/publicQuery/complex/index.vue
- 所属项目：苏住房G；来源会话：429acee0-eca5-4450-8610-60939deb48d6；代码基线：5ccda28

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_advanced_query",
  "source_extraction_id": "fa60d003d05a4982a4ab7a431b2de4be",
  "version": 1,
  "memory_type": "entities"
}
-->