# 设施详情页按设计图调整字段与布局
泰兴小程序 detail.vue 已按设计图调整字段展示、整体样式与底部周期区布局。

## 样式与布局
- 页面背景灰底 + 白色圆角卡片；列表项左侧灰色标签、右侧黑色内容，均沿用 CardCell 组件样式。
- 导航栏标题「设施设备详情」已在 pages.json 中配置，无需改动。
- 上方 10 项左右对齐列表行（含维保联系电话）；联系电话行去掉底部分割线，维保联系电话用 PhoneCall 组件（金色图标 + 号码右对齐、可点击拨号）。
- 底部周期区用 cell-inline 双列居中，标签小号灰色居中、数值常规黑色居中，列间竖线分隔，用 border-top 与列表区分。

## 字段与内容
- 维保单位：去掉星级评分，仅展示文字。
- 顶部 10 项为左右键值列表；底部 4 项以「上一次维保日期 / 维保周期」「年检日期 / 巡检周期」网格展示（2×2 网格）。
- 空值统一显示 `--`；维保日期、年检日期格式化为 `YYYY年M月`（如 `2025年12月`）。
- 接口映射：lastMaintainDate 对应 lastMaintenanceDate 或 previousMaintenanceDate；yearDetectDate 优先 dateOfAnnualInspection / annualInspectionDate，否则回退 dateOfNextAnnualInspection。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages_facility/detail.vue、src/pages_facility/maintain-detail.vue、src/api/maintenance.js、src/styles/cell.scss、src/components/PhoneCall/PhoneCall.vue、src/components/CardCell/CardCell.vue、src/pages.json
- 来源会话ID：1c61ac87-3547-4b01-922a-36d48daad02f、5531a4dc-3cc8-4183-a246-1f80afd6cbf4
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "detail_layout_adjust",
  "source_extraction_id": "3d362587f08e485c87f954d90cef0281",
  "version": 2,
  "memory_type": "entities"
}
-->