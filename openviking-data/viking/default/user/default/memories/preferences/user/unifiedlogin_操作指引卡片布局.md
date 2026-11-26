---
audit_status: valid
last_checked: 2026-11-26T13:35:24+08:00
verdict_note: 门户 UnifiedLogin.vue-40操作指引、41 guide-arrow箭头、233-235商品房/存量房/住房租赁业务分类均确认，卡片描述与代码一致。
---
- 门户首页 UnifiedLogin 操作指引卡片与设计一致时应为纵向两行：第一行业务分类名（商品房/存量房/租赁），第二行「操作指引」+箭头；去掉中间 `|` 分隔符，略增卡片高度容纳两行（涉及 zhi2-web-admin/src/views/home/UnifiedLogin.vue）
- 验收用 Playwright 截图对比，目标约 95% 还原；用户曾反馈「操作指引和 UI 偏差过大」并要求截图比对

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->