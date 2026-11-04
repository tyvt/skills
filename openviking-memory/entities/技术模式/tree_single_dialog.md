# 树+筛选+单选表组合弹窗样式约定
园区物管2.0 的「左侧筛选多选 + 右侧表格单选」组合弹窗，single-choice 圆形样式须限定 .el-table 内避免污染左侧多选。

## 问题现象
- 单选语义靠 custom-class 挂 single-choice 实现，全局样式 .single-choice .el-checkbox__inner { border-radius:50% } 作用于弹窗内所有 checkbox
- 左侧分类多选也被画成圆形，视觉语义错乱

## 解决方案
- 全局规则收窄作用域：改成 .single-choice .el-table .el-checkbox__inner { border-radius:50% }（与「隐藏表头全选」同类写法）
- 左侧 el-checkbox-group 恢复方形多选，右侧表格选择列保持圆形单选 + handleSelectionChange 只保留一行
- 新增同类弹窗直接复用此约定，弹窗上保留 single-choice class 即可，组件零改动

## 关键事实
- 修复只改 element-ui.scss 一处，弹窗组件零改动
- Verification: src=产品2.0/054.md
- 涉及文件：zhi2-web-admin/src/styles/element-ui.scss、zhi2-web-admin/src/views/dataProperty/recordProcess/components/SelectRecordProcedureDialog.vue、zhi2-web-admin/src/views/dataProperty/procedure/detail.vue、zhi2-web-admin/src/views/dataProperty/procedure/index.vue、zhi2-web-admin/src/components/zs-select-column/zs-select-column.vue、zhi2-web-admin/src/views/maintenance/accountOpen/owner/components/OwnerAddDialog.vue、zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog-func.vue、zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue
- 所属项目：产品2.0；来源会话：6b9584dd-8399-40b2-8b79-9baf367ed910；代码基线：64fa9e2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_single_dialog",
  "source_extraction_id": "e7c605a5c99a41d8ac71682f2e3b63a6",
  "version": 2,
  "memory_type": "entities"
}
-->