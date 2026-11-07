# zs-table-column列宽清理
园区物管2.0 要求 zs-table-column 不再写死 width/min-width，列宽由组件内部按表头+内容自动计算，全局清理时需注意的漏网写法。
## 易漏写法
- 模板直接写 width="200" / min-width，涉及 20+ 文件几十处。
- 通过 v-bind="column" 把 columns 配置对象（含 width/minWidth 字段）动态传入，模板无 width 字面量，grep 标签属性会漏掉。
## 清理做法
- 除扫模板字面量外，还要扫各页面 columns 配置对象里的 width/minWidth 键。
- 唯一保留例外是 slot-width：zs-table-column 为自定义插槽列设计的专用属性，与 width/min-width 语义不同（插槽内容测不了宽），不能删除。
- 序号/多选等固定类型列宽度由组件内部分支管理，页面不用管。
## 关联信息
- 模板 zs-table-column 22 文件 84 处 + v-bind="column" 列配置 12 文件 15 处均移除；明确保留 slot-width（如 houseTable.vue 拟租金额列）。
- 涉及文件：assessmentPlan/index.vue、survey/template/index.vue；手动修复 BankTransDetailDialog.vue、feeCustomTypeDialog.vue。
- 所属项目：园区物管2.0（zhi2-web-admin），会话 70d81b99，基线 c52866fc8。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs-table-column列宽清理",
  "source_extraction_id": "bec7583ec70342bf95c7e159176d20b3",
  "version": 1,
  "memory_type": "entities"
}
-->