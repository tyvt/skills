# 月报统计详情页布局修复
苏住房G 月报统计详情页因全局样式 `.detail-container` 设 `flex-direction: column-reverse`，标题栏被排到视觉底部，已通过将外层容器改为 `list-container` 修复。

## 问题原因
- 全局样式 `.detail-container` 设置了 `flex-direction: column-reverse`，将 DOM 中第一个元素（标题栏）排到视觉最底部
- 该类容器为表单详情页设计，操作按钮通常写在模板最后以固定在底部

## 修复方案
- 月报统计详情外层容器从 `detail-container` 改为 `list-container`（与信用申报统计等页面一致）
- 标题和按钮组正常显示在页面顶部

## 验证与归属
- 刷新页面后确认布局恢复正常
- 涉及文件：`src/views/publicQuery/monthlyReportStat/detail.vue`、`src/utils/monthlyReport.js`
- 所属项目：苏住房G（zhi2-web-admin）；来源会话：c63cd57e-5fe2-4369-a1ab-b24c51627de2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "monthly_report_fix",
  "source_extraction_id": "4fe6b1917a3649f084f7bb0c722beae5",
  "version": 1,
  "memory_type": "entities"
}
-->