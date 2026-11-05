# AmountInput 金额输入组件
`产品2.0` 的 `AmountInput` 组件基于 `vue-currency-input` 实现，并修复了表单校验事件与清除图标样式问题。

## 实现要点
- 已去掉 `v-money` 指令，改用 `vue-currency-input` 处理金额输入
- 组件内增加 `@blur="handleBlur"`，向最近的 `ElFormItem` 手动分发 `el.form.blur`，恢复 `el-form` 的 `trigger: 'blur'` 校验
- 在 `handleChange` / `handleClear` 里同步分发 `el.form.change`，并保留业务监听转发（`listeners.blur/change`）
- 设置 `:clearable="false"`，去掉 `zs-input` 默认的 `el-input--suffix` 多余 `padding-right: 30px`

## 归属与文件
- 涉及文件：`src/components/AmountInput/index.vue`、`src/components/zs-input/zs-input.vue`
- 所属项目：产品2.0；来源会话：96954bb5-7491-4bdf-854e-917a5232b9e6、49ff6642-e504-475e-9982-4f88a028a3b9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_input_component",
  "source_extraction_id": "5d6b812cd45d4d66a1c26b64dc3a53e5",
  "version": 1,
  "memory_type": "entities"
}
-->