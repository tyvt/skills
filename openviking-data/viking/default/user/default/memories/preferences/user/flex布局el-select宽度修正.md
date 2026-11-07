- Element Popper 基于参考节点 `getBoundingClientRect` 计算位置，flex 布局中 `.el-select` 被压至宽度≈0 导致 `top` 出现极大负值。
- 习惯在 `element-ui.scss` 中为 `.flex` 直接子元素增设 `flex:1` 与 `width` 以修正。
- 验证证据：extracted source=cursor session=c442cea0-961e-4e15-b4e3-627396d2834e；涉及文件：element-ui.scss；来源会话ID：c442cea0-961e-4e15-b4e3-627396d2834e；代码基线：none

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "flex布局el-select宽度修正",
  "source_extraction_id": "9fee5d40800342799edd0912880a11e7",
  "version": 1,
  "memory_type": "preferences"
}
-->