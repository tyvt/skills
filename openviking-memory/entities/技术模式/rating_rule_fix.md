# 企业信用评级规则详情页修复
园区物管2.0 的企业信用评级规则详情页修复了复选框缺失、查看样式与弹窗优化等问题。

## 等级信息列表复选框
- table.vue 复选框列原仅在 bizState=='0' 时显示，父页面未传 bizState 导致列始终隐藏。
- 调整为未传入 bizState 时也显示复选框，并正确绑定 isSelectable。

## 详情页查看样式
- detail.vue 查看模式改用 DetailTemplate 蓝色矩形表单展示基本信息。
- 编辑/新增模式保持原表单，「基本信息」置于上方、「等级信息」置于下方。

## 等级信息弹窗优化
- dialog.vue 查看模式使用 DetailTemplate 蓝色矩形表单。
- 弹窗标题按模式显示「新增/编辑/查看等级信息」，宽度设为 mini。
- 分值区间输入框等宽对齐，查看展示为 `> X <= Y` 格式。

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/evaluation/ratingRule/detail.vue、table.vue、dialog.vue、zhi2-web-admin/src/mixins/subTableMixins.js。
- 所属项目：园区物管2.0；来源会话：15e3f1e2-9505-4347-bf12-82cca18b71ec；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rating_rule_fix",
  "source_extraction_id": "fd7d64a64c0a44a3ac29ed5ce66a9061",
  "version": 1,
  "memory_type": "entities"
}
-->