---
audit_status: valid
last_checked: 2026-11-28T02:43:06+08:00
verdict_note: 苏州市房地产监测V3 unblock/notice/detail.vue、noticeChange/detail.vue 实存 hasVerificationOptions，与 bug6520 修复一致。
---
# 禅道 Bug 6520
预售资金监管银行-资金解款-划拨（用款）通知书详情页码值显示问题，2026-11-13 修复并回写禅道 resolved/fixed。

## 问题与根因
- 预售资金监管银行-资金解款-划拨（用款）通知书详情页「验证标识」「通知书状态」显示数字码值，因 DetailTemplate tag 项缺 options。

## 修复
- 在 `notice/detail.vue:956` 与 `noticeChange/detail.vue:478` 补 `options: this.hasVerificationOptions / this.noticeStateOptions`。

## 验证与交付
- 子模块 65b114c93 推送 develop/v3.0.0、父仓 gitlink 1cc13cf 推送。
- eslint 与 npm run build 均 exit 0（build 2.6.1，2026-11-13 10:37:18，102s），本地 nginx 8098 部署完成。
- 禅道 bug 6520 变为 resolved/fixed，resolvedBy=tiany，assignedTo zhunan。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6520",
  "source_extraction_id": "955314ce34404803aed611d61c869231",
  "version": 1,
  "memory_type": "entities"
}
-->