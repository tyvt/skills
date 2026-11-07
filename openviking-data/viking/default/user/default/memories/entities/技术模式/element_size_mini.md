# Element 全局 size 配置为 mini 导致告警修复
产品2.0 中全局组件尺寸被配置为 Element UI 时代的 "mini"，而 Element Plus 的 size 仅接受 ["", "default", "small", "large"]，渲染时触发告警，已改为 "small"。

## 问题根因
- 项目在 `src/main.js` 通过 `app.use(Element, { size: "mini" })` 全局配置组件尺寸为 "mini"
- Element Plus 的 `size` 仅接受 ["", "default", "small", "large"]，"mini" 为 Element UI 旧值，渲染（如 ElPaginationSizes）时触发 Vue 告警
- `src/views/index.vue` 中直接使用 `<el-select size="mini">` 同样传入非法值

## 解决方案
- 将 `zhi2-web-admin/src/main.js` 的 `size: "mini"` 改为 `size: "small"`
- 将 `zhi2-web-admin/src/views/index.vue` 的 `<el-select ... size="mini">` 改为 `size="small"`

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：zhi2-web-admin/src/main.js、zhi2-web-admin/src/views/index.vue
- 所属项目：2-0；来源会话ID：3b324ddb-991b-4cfd-8477-ff3457de3576；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "element_size_mini",
  "source_extraction_id": "818f80f7eff34a4caf91327fe1f5fd03",
  "version": 1,
  "memory_type": "entities"
}
-->