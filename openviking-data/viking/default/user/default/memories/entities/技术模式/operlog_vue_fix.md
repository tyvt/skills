# 操作日志页 Vue 警告修复（苏住房G）
苏住房G 项目 system/operlog/index.vue 修复 moduleName/businessName 未定义导致的 Vue 警告。

## 问题原因
- 模板第 24 行使用 moduleName 和 businessName，但 data() 未定义
- listMixins 依赖的 table mixin 也需要它们（用于 tableId、权限前缀）

## 修复方案
- data() 补充 moduleName: 'system'、businessName: 'operLog'，与接口 /system/operLog/page 一致
- 其他系统页面（dict/index.vue、user/index.vue）均在 data 中声明

## 涉及文件
- zhi2-web-admin/src/views/system/operlog/index.vue
- zhi2-web-admin/src/mixins/listMixins.js
- zhi2-web-admin/src/mixins/table.js

## 验证与归属
- 所属项目：苏住房G；验证证据：extracted source=cursor project=苏住房G
- 来源会话ID：6b87fa8d-f4b1-449c-ad47-3f43156f144d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operlog_vue_fix",
  "source_extraction_id": "3ed1418d03ae4a378ef623cde6769cc3",
  "version": 1,
  "memory_type": "entities"
}
-->