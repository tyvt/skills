# FormInput $el 报错修复
苏州市房地产监测V3 项目修复了 `FormInput` 组件 `$el` 报错，并保障现售合同编辑页大写金额输入框宽度自适应。

## 问题原因
- `FormInput` 在未满足条件时直接读取 `$el` 导致报错

## 修复内容
- 仅在 `fitContent` 为 true 时测量宽度
- 通过外层 `span` 的 `inputWrap` ref 安全读取 `clientWidth`，避免直接访问 `$el`

## 涉及文件
- `zhi2-web-admin/src/views/contract/components/formInput.vue`
- `zhi2-web-admin/src/views/contract/components/hashTitle.vue`
- `zhi2-web-admin/src/views/contract/chapters/cash/chapter2.vue`

## 验证与归属
- 刷新现售合同编辑页，Chapter2 确认控制台无报错，Chapter3 确认大写金额输入框宽度仍正常自适应
- 所属项目：苏州市房地产监测V3；来源会话：b7e96737-7bf9-4f61-9517-70baf4f0966c；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "forminput_el_error_fix",
  "source_extraction_id": "014112f6aff74aea9baf732337ff8e1f",
  "version": 1,
  "memory_type": "entities"
}
-->