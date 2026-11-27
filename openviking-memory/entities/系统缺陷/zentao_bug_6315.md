---
audit_status: invalid
last_checked: 2026-11-27T12:45:00+08:00
verdict_note: 该条为禅道 DB 状态记录（bug 6315/zt_action 88640/提交 5db26c36），本轮未取得禅道库或提交的实机证据，无法证明有效。
---
# 禅道 Bug 6315
新禅道系统中登记的预售许可证模板文本框截断缺陷。
## Description
- 预售许可证模板「预售单位」「预售资金账户开户行」两文本框尺寸固定，长值被截断或压住底图标签
## 状态与处理
- 状态 status=resolved，解决方案 resolution=fixed
- 处理人 resolvedBy=tiany，处理时间 resolvedDate=2026-11-06 17:56:40
- 新增 zt_action 记录 id=88640（action=resolved，备注含根因/修复/验证/提交号）
## Relations
- 关联模板 presale-permit-template.docx
- 修复提交 5db26c36 已合入 dev 分支

<!-- MEMORY_FIELDS
{
  "category": "系统缺陷",
  "name": "zentao_bug_6315",
  "source_extraction_id": "cf26555d96ca43f2a272f26cfe3a0f2c",
  "version": 1,
  "memory_type": "entities"
}
-->