# Element Plus el-radio label 弃用告警修复
Element Plus 中 `el-radio` / `el-radio-button` 使用 `label` 作为选中值的写法将在 3.0 废弃，需改为 `value`，已修复多处文件。

## 问题根因
- 旧写法 `<el-radio label="1">`、`<el-radio :label="dict.dictValue">`、`<el-radio-button label="table">` 等将 `label` 当选中值，触发弃用告警。
- Element Plus 3.0 起 `label` 仅作显示文本，`value` 才是选中值。

## 修复方案
- 将所有 `label` 改为 `value`：如 `<el-radio value="1">`、`<el-radio :value="dict.dictValue">`、`<el-radio-button value="table">` 等。
- 涉及组件 `el-radio` 与 `el-radio-button` 均需同步修改。

## 涉及文件与归属
- 涉及文件：`flowable/index.vue`、`system/menu/index.vue`、`system/paymentChannel/detail.vue`、`maintenance/facility/detail.vue`、`error.ts`。
- 所属项目：2-0；来源会话ID：ed53b5d6-854c-4ba8-8358-b4d73be5bd8b；验证证据：extracted source=cursor project=2-0；参考 https://element-plus.org/en-US/component/radio.html。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "radio_label_fix",
  "source_extraction_id": "b22c5c3f66104829a41402eaeb1ba6a1",
  "version": 1,
  "memory_type": "entities"
}
-->