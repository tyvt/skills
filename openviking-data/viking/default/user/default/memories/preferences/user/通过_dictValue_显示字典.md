---
audit_status: valid
last_checked: 2026-11-26T14:40:43+08:00
verdict_note: detail-template.vue 796行 optVal 优先取 o.dictValue 再回退 o.value，与「优先用 dictValue 避免显示代码」描述一致。
---
- 优先使用 dictValue/dictLabel 而不是 value/label 来显示字典，以避免显示代码
- 根本原因：formatSelectOptionsDisplay 和 detail-template 标签查找的是 value/label，但 getDicts 使用的是 dictValue/dictLabel，导致回退到代码
- 修正点：detail-template.vue 中的 formatSelectOptionsDisplay 和 getItemValueDisplayString 应优先使用 dictValue/dictLabel
- 涉及文件: detail-template.vue, property/complexChange/detail.vue, main.js, mixins/area.js, dict-tag.vue, mixins/detailMixins.js, utils/dict.js
- 验证证据: src=产品2.0/028.md; 会话: b608284d-b42b-4810-99bd-afe869af0cbd

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：b608284d-b42b-4810-99bd-afe869af0cbd

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->