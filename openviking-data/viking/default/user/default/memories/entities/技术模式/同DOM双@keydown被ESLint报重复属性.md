# 同DOM双@keydown被ESLint报重复属性

根因：同一DOM上`@keydown.enter`与`@keydown.space`被`duplicate-attributes/no-duplicate-attributes`规则视为重复`v-on:keydown`。修复：在`zhi2-web-admin/src/layout/index.vue`模板合并为`@keydown="onContentFullscreenExitKeydown"`，并新增方法处理Enter/空格防默认及调用`exitContentFullscreen()`。

**验证证据**：extracted source=cursor session=dbd73ba3-a057-403e-a019-3d6ab1cec6c2

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/layout/index.vue、zhi2-web-admin/src/layout/index.vue

**所属项目**：园区物管2.0
**来源会话**：dbd73ba3-a057-403e-a019-3d6ab1cec6c2
**代码基线**：none
<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_keydown_dup_attr",
  "source_extraction_id": "f5d831b184074ef7877fa2026e807b62",
  "version": 1,
  "memory_type": "entities"
}
-->