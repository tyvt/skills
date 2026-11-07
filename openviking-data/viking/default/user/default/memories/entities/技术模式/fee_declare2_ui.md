# 物业费简易申报界面调整
产品2.0 物业费简易申报（property/feeDeclare2）按参考样式完成列表页、详情页与选择弹窗的界面调整及 bug 修复。

## 列表页与详情页
- `index.vue` 移除表格 `min-height: 500px`，去掉数据少时的大块空白
- `feeBindScopeTable.vue` 的「申报年度/申报小区」改为浅橙提示条（`#fff7e6` 背景、`#ffd591` 边框，不含橙色圆形 icon）
- 操作按钮右对齐并与提示条分开；「带入上次申报数据」文案改为「导入上次申报数据」

## 选择欠费户室弹窗
- `feeBindScopeDialog.vue` 参考「新增开户明细」重构：左侧楼幢树，右侧列表/楼盘表双 Tab
- 列表视图含序号、楼幢、单元、户室、房屋面积；楼盘表视图点选户室
- 修复单选模式下确定按钮 `row` 未定义的 bug

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`feeDeclare2/index.vue`、`detail.vue`、`components/feeBindScopeTable.vue`、`feeBindScopeDialog.vue`
- 所属项目：产品2.0；来源会话：b37d508c-a09b-4cbb-bac4-008c8f7645fb

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "fee_declare2_ui",
  "source_extraction_id": "fe9e7839c3e6497a831416b10b84332b",
  "version": 1,
  "memory_type": "entities"
}
-->