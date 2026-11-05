# zs-input 插槽转发与清除图标规则
`产品2.0` 中 `zs-input` 仅在父组件真正传入 suffix/prefix 时才转发 slot，`AmountInput` 通过 `:clearable="false"` 去除多余后缀样式。

## 规则
- 仅当父组件真的传了 suffix/prefix 时才转发对应 slot，避免空 slot 误触发 `el-input--suffix`
- Element UI 只要 `clearable` 为 true 就会加 `el-input--suffix`，即使禁用态不显示清除按钮，也会给 input 加 `padding-right: 30px`
- `AmountInput` 设置 `:clearable="false"`，消除多余 suffix 样式与内边距
- 带 `㎡` 单位的 amount-input 无需 clearable

## 归属与文件
- 验证：选中 `.el-input-group__append`，Computed 样式 `display` 期望值 `flex`
- 涉及文件：`src/components/zs-input/zs-input.vue`、`src/components/AmountInput/index.vue`、`src/styles/element-ui.scss`、`vite.config.js`、`input-group-fix.css`
- 所属项目：产品2.0；来源会话：49ff6642-e504-475e-9982-4f88a028a3b9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_input_slot_forward",
  "source_extraction_id": "5d6b812cd45d4d66a1c26b64dc3a53e5",
  "version": 1,
  "memory_type": "entities"
}
-->