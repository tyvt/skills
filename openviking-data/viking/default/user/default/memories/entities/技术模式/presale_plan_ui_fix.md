# 预售方案维护页 UI 对齐修复
苏州市房地产监测V3 中修复预售方案维护页 UI，叙事行不再拉散、输入框固定宽度。

## 根因
- 叙事行使用 `text-align: justify` 导致文字被拉散
- 数字输入框默认占满整行

## 调整内容
- 去掉 `text-align: justify`，叙事行改为 `flex` + `flex-wrap`，文字与输入框自然换行排列
- 文案用 `<span class="narrative-text">` 包裹，按短语断行
- 输入框固定宽度（数字框 88px / 面积 108px，地名 280px），不再撑满全行

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 刷新页面后「项目基本概况」恢复为紧凑填空样式；若仍偏宽可再收紧数字框宽度
- 涉及文件：`PermitPlanPanel.vue`、`PresalePlanFillForm.vue`
- 所属项目：苏州市房地产监测V3；来源会话：3b1ff38c-e27a-4867-a215-6627c1d4380c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_plan_ui_fix",
  "source_extraction_id": "0c9fcbb812df4bc98444adb2fa3c05fb",
  "version": 1,
  "memory_type": "entities"
}
-->