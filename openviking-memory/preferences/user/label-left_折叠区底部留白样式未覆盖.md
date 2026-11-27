---
audit_status: valid
last_checked: 2026-11-27T18:26:41+08:00
verdict_note: 苏州市房地产监测V3 detail-form.scss 命中，.collapse-content-not(.hide)去留白规则属实
---
- label-left 布局下于 detail-form.scss 新增 .collapse-container > .collapse-content:not(.hide) 规则，将 padding-bottom/margin-bottom 置为 0 以覆盖折叠区底部留白
- 拆分 el-form--label-top 块并增加 .detail-from-container 选择器
- 验证证据：src=苏州市房地产监测V3/086.md；来源会话：22342137-7680-4a86-9ec8-e4647eb82f33

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->