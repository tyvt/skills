# PageButton颜色未传入内联样式致背景白
`detail.vue:378` 中 `#F39C12` 配置正确，但 `PageButton` 将颜色转为内联 `:style` 时未传入，导致按钮背景显示为白色。
## 问题根因
- `detail.vue:378` 中 `#F39C12` 配置正确。
- `PageButton` 将颜色转为内联 `:style` 时未传入颜色属性，导致按钮背景显示为白色。
## 解决方案
- 需确保 `PageButton` 正确接收并绑定颜色属性。
## 验证与归属
- 验证证据：src=泰兴小程序/004.md
- 涉及文件：src/staff/pages_facility/issue/detail.vue、src/staff/components/PageButton/PageButton.vue、src/staff/components/ZsButton/ZsButton.vue、src/components/ZsButton/ZsButton.vue、src/components/StatusBar/StatusBar.vue、src/staff/utils/virtualHost.js、src/utils/virtualHost.js、src/main.ts
- 来源会话ID：a6595586-e4f7-4b47-9b7a-2844397b091d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pagebutton_color_inline",
  "source_extraction_id": "fc9f554b0d494f35b937bf826962d11b",
  "version": 1,
  "memory_type": "entities"
}
-->