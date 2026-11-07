# 网点弹窗改zs-size mini并去除表项式行高
在 zhi2-web-admin 网点弹窗中，弹窗宽度由 width="60%" 改为 zs-size="mini"（616px），移除行高覆盖使用默认间距。

## 修复要点
- YhwdDialog.vue 弹窗宽度由 width="60%" 改为 zs-size="mini"（616px）
- 移除外层 el-row，让 zs-form 直接包裹 el-col :span="24"
- 增加 label-position="left" 与 label-width="120px"
- 删除对 el-form-item__content 的 line-height:36px 覆盖以使用默认间距

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/138.md
- 涉及文件：system/sysBankBranch/detail.vue、supervision/bank/cbyh/components/YhwdTable.vue、YhwdDialog.vue、superviseBank/components/YhwdDialog.vue、wtjgxy/components/CompetentDialog.vue、zs-dialog/zs-dialog.vue、stock/contract/components/ExtractDialog.vue、evaluation/creditDeclarationComponents/detail.vue
- 来源会话：3a875ff9-bacf-404f-a3fe-9efda64d3fa7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_dialog_mini",
  "source_extraction_id": "622bc94388724ad38c296348aac87c4e",
  "version": 2,
  "memory_type": "entities"
}
-->