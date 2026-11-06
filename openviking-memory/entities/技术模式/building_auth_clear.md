# 楼幢授权跨宗地选择限制（clearSelectionOnTreeChange）
园区公共收益项目已实现楼幢授权仅保留宗地维度、切换宗地清空已选的逻辑。

## 实现说明
- 在 SelectDialog 新增 clearSelectionOnTreeChange 配置
- 切换宗地时清空右侧表格勾选状态及内部 selection 数据
- 点击「确定」校验：已选楼幢 landPlotId 与当前宗地不一致则提示「不允许跨宗地选择楼幢，请重新选择」并清空勾选
- 以下三处均传入 clearSelectionOnTreeChange: true：complex/components/rangeTable.vue、complexChange/components/rangeTable.vue、complex/detail.vue

## 效果
- 同一宗地下可多选楼幢；切换到其他宗地时之前选择被清除，无法跨宗地一并提交

## 验证与归属
- 涉及文件：complex/components/rangeTable.vue、complexChange/components/rangeTable.vue、complex/detail.vue、zs-select-dialog-func.vue
- 所属项目：园区公共收益；来源会话：fed5c973-84de-4f18-adfd-4d38f2f4dcd8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_auth_clear",
  "source_extraction_id": "41ebe72cbac94dce89aa5307c597c661",
  "version": 1,
  "memory_type": "entities"
}
-->