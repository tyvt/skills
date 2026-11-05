# 人工添加页必填项标识缺失修复
苏住房C 小程序「人工添加」页面（register.vue）修复必填项红色 `*` 标识缺失问题。

## 问题原因
- `uni-forms-item` 仅设置 `required` 属性才显示红色 `*`，`rules` 里的 `required:true` 只校验不显示标识

## 修改内容
- 为所属区域、街道、社区、小区、楼幢、室号等必填项添加 `required` 属性
- 所属社区 `name="Name"` 修正为 `name="community"` 并补充校验规则
- 图片上传区块「产证/合同相关图片」「身份证明相关图片」标题添加 `required` 样式类
- 单元、补充证件信息按设计保持非必填不标记

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：63944abd-5398-403d-9293-6bf00fd0e33d
- 代码基线：none
- 涉及文件：`src/pages_owner/authentication/components/FormManual.vue`、`src/pages_owner/house/owner/manual.vue`、`register.vue` 等

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "register_required_fix",
  "source_extraction_id": "d33c1384ff4a4ddeb16868b3c22e62c2",
  "version": 1,
  "memory_type": "entities"
}
-->