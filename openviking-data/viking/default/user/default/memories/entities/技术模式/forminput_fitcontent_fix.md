# FormInput 非 fitContent 测宽报错修复
FormInput 在 fitContent 非 true 时误读 $el 宽度触发 Vue 警告，已改为仅 fitContent 为 true 时测量。

## 缺陷描述
- FormInput 在 fitContent 非 true 时误读 $el 宽度触发 Vue 警告

## 修复方案
- 仅 fitContent 为 true 时测量宽度
- 通过外层 span 的 inputWrap ref 读取 clientWidth

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/207.md
- 涉及文件：contract/components/formInput.vue、contract/components/hashTitle.vue、contract/chapters/cash/chapter2.vue、contract/mixins/formComp.js、contract/components/originalTip.vue、contract/components/contractContent.vue、contract/chapters/cash/chapter3.vue、contract/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：b7e96737-7bf9-4f61-9517-70baf4f0966c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "forminput_fitcontent_fix",
  "source_extraction_id": "410c6abe2a3b43599e57be64b1b56ab3",
  "version": 1,
  "memory_type": "entities"
}
-->