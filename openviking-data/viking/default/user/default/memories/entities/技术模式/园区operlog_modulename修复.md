# 园区公共收益 operlog 页 Vue 警告修复
园区公共收益项目 system/operlog/index.vue 修复 moduleName/businessName 未定义导致的 Vue 警告。

## 问题原因
- 第 24 行 `zs-operate-column` 使用 `moduleName` 和 `businessName`，但组件 `data()` 未定义
- `listMixins` 不会自动提供这两个属性，需各页面自行声明（可参考同目录 logininfor/index.vue）

## 修复方案
- 在 `data()` 中补充 `moduleName: 'bankagent'`、`businessName: 'operlog'`
- 取值与页面已有权限标识一致（`bankagent/operlog:remove`、`bankagent/operlog:export`），操作列权限校验正常工作

## 涉及文件
- zhi2-web-admin/src/views/system/operlog/index.vue
- zhi2-web-admin/src/mixins/listMixins.js

## 验证与归属
- 所属项目：园区公共收益；验证证据：extracted source=cursor project=园区公共收益
- 来源会话ID：6be2e0b2-c654-4450-88c2-a78a8fe79c79

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "园区operlog_moduleName修复",
  "source_extraction_id": "a1302e410ccd4dc58b49c441bfc57abd",
  "version": 1,
  "memory_type": "entities"
}
-->