# 搜索表单 Padding 嵌套与重叠修复
苏州市房地产监测V3 中 `zs-search-form` 组件存在 padding 多重嵌套和重叠问题，已修复并处理好折叠区内全局 `el-row` 规则与搜索 gutter 的冲突。

## 修改文件
- zhi2-web-admin/src/components/zs-search-form/zs-search-form.vue
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/styles/detail-form.scss
- zhi2-web-admin/src/components/zs-form/zs-form.vue

## 修复内容
- 去掉全局 `:deep(.el-col)` 的 `3px 12px`，改为仅 `.zs-search-form__field-row > .el-col` 保留上下 `3px`，横向间距交给 `gutter="8"`
- 布局列（`form-content-col` / `button-col` / `multi-line-*`）左右 padding 归零
- 删除重复的 `id="queryForm"`；内层字段行增加 `class="zs-search-form__field-row"`
- 容器 `margin-bottom` 改为 `0`；`borderless` 使用 `margin-bottom: 0 !important`
- 单行布局 `gap: 12px !important`；标签 `padding: 0 4px 0 0`
- 搜索区在 index.scss 不再套用全局 `el-row` 规则

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：7500a99d-b061-4f92-bbbe-0136b9fa86aa；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "search_form_padding_fix",
  "source_extraction_id": "a49f22e6571844eeb473d75963a3686e",
  "version": 1,
  "memory_type": "entities"
}
-->