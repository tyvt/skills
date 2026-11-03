# 弹窗表格固定高度与分页占位
苏住房G项目中，巡检程序、设施/范围选择等弹窗表格须固定为 N 条数据高度，分页器隐藏时也要预留占位。
## 问题现象
- 筛选后行数变少分页器消失，弹窗高度忽高忽低
- 若某列写死 width，会被 zs-table-column 判为固定宽度不再自适应，长编号被省略号截断（如 SelectRecordProcedureDialog 巡检程序编号列 width=160）
## 根因
- 分页器用 v-show 控制，隐藏时不占流，表底高度归零，弹窗高度随内容收缩
- zs-table-column 在 explicitWidth != null 时原样透传固定宽度，不参与自适应
## 解决方案
- 分页区始终占位（容器给定与单行分页器等高 min-height，或隐藏内容不隐藏盒子），表格可视高度按「N行×行高」定死，不足留白
- 删掉弹窗内写死的列 width，让其按内容算 min-width
## 验证与归属
- 验证证据：用户诉求固定10条高度、分页器隐藏高度塌陷、列展示不全疑全局失效；结论显式宽度导致截断
- 涉及文件：SelectRecordProcedureDialog.vue、FacilitySelectDialog.vue、ScopeSelectDialog.vue、zs-table.vue
- 所属项目：苏住房G；来源会话：db287272-e3da-43d4-8c77-915cb66320da；代码基线：d9c2e9f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_fixed_height",
  "source_extraction_id": "85080ea7fd7b49f2a6f0d4ca4a7361e9",
  "version": 1,
  "memory_type": "entities"
}
-->