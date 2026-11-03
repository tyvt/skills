# 苏住房G表格行勾选门禁连坐忽略预警
在苏住房G项目(zhi2-web-admin)经营用房租赁合同列表，mixins/table.js默认isSelectable仅放行草稿行，导致已备案预警行无法勾选执行「忽略预警」。
## 根因
- table.js的isSelectable(row){return row.bizState=='0'||!row.bizState}为批量删除设计，只放行草稿
- 已备案行bizState非'0'，row-selectable=false，勾选集合拿不到，忽略预警操作提示请选择合同
- 同一门禁承载删除与忽略预警两种语义，后者被前者状态限制连坐
## 解决方案
- 页面覆盖isSelectable而非改公共mixin：放行草稿行+带预警标记行(whetherWarning==1)，其余不可选
- 提交时只取预警行ID，避免误勾草稿当预警提交
- 批量删除按钮加禁用条件(选中含已备案行时保持禁用)，防借用放宽通道误删
## 验证与归属
- 验证：会话19d60287，已备案合同不能选忽略预警；修复为assetsLeaseContractFiling/index.vue覆盖isSelectable、getIgnore只提交预警行ID、批量删除按钮保持禁用
- 涉及文件：src/mixins/table.js、src/views/benefit/assetsLeaseContractFiling/index.vue；所属项目：苏住房G；来源会话：19d60287-cf61-42b7-8cdf-70ebe430e846；代码基线：82999dc

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "suzhufang_isselectable",
  "source_extraction_id": "6826e403948f4fa8a548e51c974c8ca3",
  "version": 1,
  "memory_type": "entities"
}
-->