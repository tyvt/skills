# ref8443原生range输入修复
苏住房防汛C端 H5 ref8443 页面修复 input[type=range] 被编译成 uni-input 导致的样式差异，2026-11-06。

## 已修根因
- input[type=range] 被编译成 uni-input → 新增 Ref8443Range.vue 注入原生 range

## Git与构建
- 提交包含在 commit 4856264「fix(ref8443): theme overrides, native range, rescue/history parity」

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_native_range",
  "source_extraction_id": "88ae84c0b79f44a4bf63ac09d0173b11",
  "version": 1,
  "memory_type": "entities"
}
-->