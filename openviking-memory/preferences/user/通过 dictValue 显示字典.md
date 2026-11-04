- 优先使用 dictValue/dictLabel 而不是 value/label 来显示字典，以避免显示代码
- 根本原因：formatSelectOptionsDisplay 和 detail-template 标签查找的是 value/label，但 getDicts 使用的是 dictValue/dictLabel，导致回退到代码
- 修正点：detail-template.vue 中的 formatSelectOptionsDisplay 和 getItemValueDisplayString 应优先使用 dictValue/dictLabel
- 涉及文件: detail-template.vue, property/complexChange/detail.vue, main.js, mixins/area.js, dict-tag.vue, mixins/detailMixins.js, utils/dict.js
- 验证证据: src=产品2.0/028.md; 会话: b608284d-b42b-4810-99bd-afe869af0cbd

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "主题标题: 通过 dictValue 显示字典",
  "source_extraction_id": "9ff25583c9e74f7aa13437ad3483f5e0",
  "version": 1,
  "memory_type": "preferences"
}
-->
