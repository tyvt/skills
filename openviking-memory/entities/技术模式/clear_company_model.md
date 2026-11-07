# 资金代缴单位清除时同步清空表单 model
在 depositNotice/company 的 AddDialog.vue 中，清除资金代缴单位时需同步清空表单 model 值，避免残留旧值。
## 根因
- zsLikeSelect 清空后传回 {} / 空值，但 @select 不触发，导致 form.companyName/companyId 残留。
- 必填校验可能因旧值而失效。
## 修复
- 监听 selectedCompany（v-model 绑定值）。
- 当清空时执行 form.companyName = undefined 与 form.companyId = undefined。
## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 涉及文件：src/views/maintenance/depositNotice/company/components/AddDialog.vue。
- 所属项目：2-0；来源会话：76d28965-e3f4-48ff-bdb9-b55a6b87279b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "clear_company_model",
  "source_extraction_id": "a2bc8961895245fc8e999b0fee80988e",
  "version": 1,
  "memory_type": "entities"
}
-->