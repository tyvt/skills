# 监管协议打印模式
监管协议的打印模式依赖于后端，前端仅调整页面。

## 描述
- 仓库不包含监管协议相关的 `zhi2-benefit-server` (Java)；关联的打印应在 benefit 后端和打印配置中完成。
- `zhi2-web-admin` 的 detail.vue 根据原型调整字段顺序：公共收益协议的“备注”移至“其他”模块；争议方式获得字典回退。

## 验证与归属
- 验证证据: src=苏住房G/038.md
- 涉及文件: benefit/pubRegulatoryAgreement/detail.vue, OperationBtnGroup/index.vue, property/propertyAgreement/detail.vue, ZsPrint/index.vue, detailMixins.js
- 所属项目: 苏住房G; 会话: fcec66f6-3880-4027-9916-7ed4c8786fe9; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "regulatory_agreement_print",
  "source_extraction_id": "c6f4b8de214b47529df7b54c7e26ac75",
  "version": 1,
  "memory_type": "entities"
}
-->