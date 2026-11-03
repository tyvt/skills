# 模板孤立冒号致 Vue 编译非法 JS
在 ScopeSelectDialog.vue 的 `<zs-form>` 中 `:inline="true"` 后多余冒号使 Vue 编译出非法 JS，触发 `[vite:vue2] Unexpected token`。

## 问题现象
- `<zs-form>` 的 `:inline="true"` 后存在多余冒号，导致 Vue 模板编译生成非法 JS
- Vite 构建报 `[vite:vue2] Unexpected token` 错误

## 解决方案
- 移除 `:inline="true"` 后的多余孤立冒号即可消除错误

## 验证与归属
- 验证证据：extracted source=cursor session=97483054-f372-458c-b11a-afe35cc4d287
- 涉及文件：d:/repository/产品2.0/zhi2-web-admin/src/views/maintenance/components/ScopeSelectDialog.vue、ScopeSelectDialog.vue
- 所属项目：产品2.0；代码基线：none；来源会话：97483054-f372-458c-b11a-afe35cc4d287

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_inline_colon",
  "source_extraction_id": "708689435f864318965b557f3ab6ccf6",
  "version": 1,
  "memory_type": "entities"
}
-->