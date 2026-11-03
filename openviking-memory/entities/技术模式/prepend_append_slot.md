# #prepend 与 #append 插槽须同级放置
多个 vue 文件将 #append/#footer 错误嵌套于 #prepend/form-box 内，需调整插槽同级并将对话框改为 :visible+@update:visible。
## 问题根因
- maintenance/initiation/detail.vue、StatisticsDialog.vue 等将 #append/#footer 错误嵌套于 #prepend/form-box 内。
## 解决方案
- 调整插槽同级，template #footer 作为 zs-dialog 直接子节点。
- 对话框弃用 prop 上 v-model，改为 :visible + @update:visible。
## 验证与归属
- 验证证据：会话 74b0cccb（cursor session=74b0cccb-98ed-4ca2-b756-cfe54408c16b）。
- 涉及文件：maintenance/initiation/detail.vue、StatisticsDialog.vue；来源会话ID：74b0cccb-98ed-4ca2-b756-cfe54408c16b；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "prepend_append_slot",
  "source_extraction_id": "9a939398a49a4f2e9c451b05bb181dcb",
  "version": 1,
  "memory_type": "entities"
}
-->