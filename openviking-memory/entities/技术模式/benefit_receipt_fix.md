# benefit_receipt_fix
产品2.0 公共收益回单模块 (`pubBankReceiptApply` 等) 完成多项界面优化与问题修复。

## 选择物业管理区域弹窗
- `pubBankReceiptApply/detail.vue` 中 `rowKey` 误设为 `complexId`（接口无此字段）致选中行全表高亮，改为 `projectId`。
- `zs-table.vue` 的 `rowClassName` 增加空值过滤，避免无效 key 误匹配。

## 详情页与列表布局
- 公共收益回单详情页编辑/新增表单改为三列布局（`lg: 8`），增加 `label-position="right"` 标签右对齐，查看态 `DetailTemplate` 同步三列。
- 列表「批量下载凭证」移至标题栏右侧（`Headline #right`），操作列按钮文案改为「查看详情」。

## 回单核销详情弹窗
- `VerificationReceiptDetailDialog.vue` 参考新增收支项目明细弹窗，新增/编辑用 mini 弹窗（616px）单列纵向排列。

## 涉及文件与来源
- 文件：`pubBankReceiptApply/detail.vue`、`zs-table.vue`、`VerificationReceiptDetailDialog.vue`、`zs-select-dialog.vue` 等
- 来源会话：5af5c221-8134-4622-ae26-0886a69a35ed；项目：产品2.0

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_receipt_fix",
  "source_extraction_id": "cdd213eb2a634e3fb3eece7b8099cf7a",
  "version": 1,
  "memory_type": "entities"
}
-->
