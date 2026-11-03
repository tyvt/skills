# 楼幢弹窗禁止跨宗地多选
园区公共收益项目楼幢授权类弹窗要求单次仅选一个宗地下的楼幢，通过 `clearSelectionOnTreeChange` 与提交校验实现。

## 配置与行为
- 在 `zs-select-dialog-func` / SelectDialog 增加配置 `clearSelectionOnTreeChange: true`。
- 点击左侧切换宗地时清空右侧表格勾选与内部 `selection`。

## 提交校验
- 点确定时校验已选行 `landPlotId` 必须与当前左侧宗地一致。
- 不一致提示「不允许跨宗地选择楼幢，请重新选择」并清空勾选。

## 涉及入口与字段
- 入口示例：`property/complex/components/rangeTable.vue`、`complexChange/components/rangeTable.vue`、`complex/detail.vue`。
- 接口行数据需带 `landPlotId`/`landPlotName` 等宗地字段供校验与汇总文案。
- 所属项目：园区公共收益；来源会话：fed5c973-84de-4f18-adfd-4d38f2f4dcd8；代码基线：86a4227。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "selectdialog_landplot",
  "source_extraction_id": "26c4c443e80649a0bdd7a9c3a71c55c0",
  "version": 1,
  "memory_type": "entities"
}
-->