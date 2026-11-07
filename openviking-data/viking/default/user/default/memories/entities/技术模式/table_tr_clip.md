# 弹窗内zs-table未设table-tr致分页遭裁切
zs-table未设table-tr默认按约10行渲染，超弹窗高度致分页被overflow:hidden裁切，ScopeSelectDialog等组件受影响。

## 问题根因
- zs-table未设table-tr时默认渲染约10行，超出弹窗高度
- 弹窗overflow:hidden使分页区域被裁切不可见

## 解决方案
- 用scope-select-table-wrap包裹并绑:table-tr="listTableTr"
- 通过ResizeObserver动态计算行高
- 表格区flex:1; min-height:0，搜索与分页flex-shrink:0确保可见

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证：src=园区公共收益/022.md
- 涉及文件：maintenance/depositNotice/company/components/ScopeSelectDialog.vue、PaymentRangeTable.vue、AccountDetailDialog.vue、dataProperty/recordProcess/components/SelectRecordProcedureDialog.vue、components/zs-table/zs-table、components/zs-dialog/zs-dialog.vue、maintenance/accountOpen/owner/components/ScopeSelectDialog.vue
- 所属项目：园区公共收益；来源会话：773efa7a-31cf-4846-a29c-73b73be85156；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_tr_clip",
  "source_extraction_id": "a6b960fcc3174e9ebd9dd580bc8cae17",
  "version": 1,
  "memory_type": "entities"
}
-->