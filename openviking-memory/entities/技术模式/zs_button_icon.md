# ZsButton 全局适配 el-icon 旧写法
在 Vue3 + Element Plus 迁移中，zs-button.vue 拦截 $attrs.icon 自动映射 Element Plus 图标组件，避免逐页面修改。
## 问题根因
- Element UI 的 icon="el-icon-..." 旧写法需迁移至 Element Plus，逐页面修改成本高。
## 解决方案
- zs-button.vue 拦截 $attrs.icon 并自动映射为 Element Plus 图标组件。
- 避免在每个使用 el-icon 旧写法的页面单独修改。
- 仅剩少量直接在 el-button 或特殊场景使用 `icon="el-icon-..."` 的地方未覆盖，需按页面精修。
## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 验证证据：会话 4eaf5cdc（cursor session=4eaf5cdc-4638-4f11-acea-647d5111b462）。
- 涉及文件：zs-button.vue；来源会话ID：4eaf5cdc-4638-4f11-acea-647d5111b462；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_button_icon",
  "source_extraction_id": "d9ab1a0ce9de4c3f9d36f986e9f6078d",
  "version": 2,
  "memory_type": "entities"
}
-->