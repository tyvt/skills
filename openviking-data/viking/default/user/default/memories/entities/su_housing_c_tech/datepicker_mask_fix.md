# 日期区间弹窗遮罩遮挡修复
苏住房C 移动端明细页日期区间自定义选择因自定义遮罩层遮挡导致点击无反应，已修复。

## 问题根因
- H5 下自定义遮罩层 `period-overlay` 设置 `z-index: 996`，将日期选择器弹层挡在下方，点击看似无反应

## 解决方案
- 去掉自定义 `period-overlay` 遮罩
- 日期区间弹窗改用 `uni-popup`（与「类型」选择一致，`tenant/index.vue` 已验证可配合）
- 自定义日期改用项目封装 `ZsDatePicker`（`type="range"`），点击即弹出日期区间选择器

## 操作与验证
- 操作路径：明细 → 日期区间 → 选「自定义」→ 点击「开始日期 - 结束日期」区域
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`tenant/index.vue`、`menuRouteMap.js`、`menuNav.js` 等
- 来源会话ID：c2002207-e827-4fb1-95af-8409ac89d1b0
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "datepicker_mask_fix",
  "source_extraction_id": "5098ffda0d4344d19a85da69bcffd9f0",
  "version": 1,
  "memory_type": "entities"
}
-->