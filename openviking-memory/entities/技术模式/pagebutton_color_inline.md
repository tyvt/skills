
# PageButton颜色内联样式未透传致背景白
`detail.vue:378` 中 `反馈进度` 的橙色 `#F39C12` 配置正确，但 `PageButton` 将颜色转为内联 `:style` 挂在 `<ZsButton>` 自定义组件标签上，在微信小程序里不会透传到组件内部真实 `<button>`，导致按钮背景显示为白色。
## 问题根因
- `detail.vue:378` 中 `反馈进度` 橙色 `#F39C12` 配置本身没错。
- `PageButton` 把颜色转成内联 `:style` 挂在 `<ZsButton>` 自定义组件标签上；微信小程序里写在组件标签上的 `class`/`style`（含 `--css-var`）只落在外层包装节点，不会透传到组件内部的真实 `<button>`。
- 内部原生 `<button>` 默认背景 `#f8f8f8`（≈白）盖住橙色；文字色 `#FFFFFF` 被 `.zs-button{color:#333}` 压成深灰字，呈现「白底+深灰字」。
- 提交 4635cee 加的 `.zs-button.btn-custom{background-color:var(--btn-bg-color)!important}` 因 `btn-custom` 类只在外层节点、选择器匹配不到，是死代码。
## 受影响范围
- 不止 `反馈进度`，同页 `催办`、`<ZsButton class="submit-btn">` 也受影响。
## 验证与归属
- 验证证据：src=泰兴小程序/004.md
- 涉及文件：detail.vue、src/components/ZsButton/ZsButton.vue、src/staff/components/ZsButton/ZsButton.vue、src/staff/components/PageButton/PageButton.vue
- 来源会话ID：a6595586-e4f7-4b47-9b7a-2844397b091d
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pagebutton_color_inline",
  "source_extraction_id": "628e445ead5342fe8e8a0f3c75869f07",
  "version": 2,
  "memory_type": "entities"
}
-->