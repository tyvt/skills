
# 企业信用评级规则详情页修复
园区物管2.0 的企业信用评级规则详情页修复了复选框缺失、查看样式与弹窗优化问题。

## 等级信息列表复选框
- table.vue 中复选框列原仅在 bizState == '0' 时显示，父页面未传入 bizState 导致列始终隐藏。
- 调整为未传入 bizState 时也显示复选框，并正确绑定 isSelectable。

## 详情页查看样式
- detail.vue 查看模式基本信息改用 DetailTemplate 蓝色矩形表单展示。
- 编辑/新增模式保持原表单；「基本信息」置上方、「等级信息」置下方。

## 新增等级信息弹窗
- dialog.vue 查看模式用 DetailTemplate 蓝色矩形表单。
- 弹窗标题按模式显示「新增/编辑/查看等级信息」，宽度设为 mini。
- 分值区间两输入框等宽对齐；查看展示为 `> X <= Y` 格式。

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/evaluation/ratingRule/table.vue、detail.vue、dialog.vue、src/mixins/subTableMixins.js。
- 所属项目：园区物管2.0；来源会话 15e3f1e2-9505-4347-bf12-82cca18b71ec；代码基线 none。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rating_rule_detail",
  "source_extraction_id": "f6d026a215774330a843fb24cdf97798",
  "version": 1,
  "memory_type": "entities"
}
-->