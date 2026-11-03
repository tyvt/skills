# ElButton type=text 弃用兼容
Element Plus 3.0 将 `type="text"` 标废弃，页面改 `link` 并在 zs-button 做透传兼容。

## 问题根因
- Element Plus 3.0 将 `type="text"` 标为废弃，控制台报 `type.text is about to be deprecated, please use link`。
- 配置/操作列大量经 `zs-button` 生成时可能漏改直传 ElButton。

## 解决方案
- 页面侧把裸 `<el-button type="text">` 改为 `<el-button link>`。
- 在 `zs-button.vue` 里若 `rest.type === 'text'` 则删 `type` 并设 `rest.link = true`，避免漏网直传 ElButton。

## 验证与归属
- 验证证据：会话 00b18628：ElementPlusError type.text deprecated；4 处直改 + zs-button 兼容逻辑。
- 涉及文件：zhi2-web-admin/src/components/zs-button/zs-button.vue。
- 所属项目：2-0；来源会话ID：00b18628-52c8-4770-87e2-b9abc61e87b6；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elbutton_text_deprecated",
  "source_extraction_id": "e57735de826b42d4a27e72c858cd941c",
  "version": 1,
  "memory_type": "entities"
}
-->