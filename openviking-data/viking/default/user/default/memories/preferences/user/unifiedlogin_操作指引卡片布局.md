---
audit_status: valid
last_checked: 2026-11-27T16:46:40+08:00
verdict_note: 门户 zhi2-web-admin 存在 views/home/UnifiedLogin.vue，操作指引卡片文案与布局改动主体属实
---
- 门户首页 UnifiedLogin 操作指引卡片与设计一致时应为纵向两行：第一行业务分类名（商品房/存量房/租赁），第二行「操作指引」+箭头；去掉中间 `|` 分隔符，略增卡片高度容纳两行（涉及 zhi2-web-admin/src/views/home/UnifiedLogin.vue）
- 验收用 Playwright 截图对比，目标约 95% 还原；用户曾反馈「操作指引和 UI 偏差过大」并要求截图比对

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->