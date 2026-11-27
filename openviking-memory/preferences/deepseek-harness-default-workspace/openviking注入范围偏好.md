---
audit_status: valid
last_checked: 2026-11-27T19:13:38+08:00
verdict_note: 用户偏好陈述，非幻觉/测试垃圾/隐私违规；当前注入的 profile 确为精简（身份+事件+少量规范），与偏好内容一致。
---
- 偏好 OpenViking 的 Profile 注入保持精简：仅注入当前用户身份、最近 3 个相关事件（如 6408、6409），以及总数不超过 5 条的核心规范。
- 反对把几百条历史偏好或实体全量塞进注入的做法，认为其无效且占用上下文。

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "OpenViking注入范围偏好",
  "source_extraction_id": "e47ec749dd8846b8a08fc03cb4dcbd6a",
  "version": 1,
  "memory_type": "preferences"
}
-->