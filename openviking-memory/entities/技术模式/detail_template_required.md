# 详情查看态去必填星号须改DetailTemplate
从多个详情页的 DetailTemplate 数据中移除 required: true 以消除查看态必填星号，校验规则不变。

## 关键修复
- 从 personnelCertificate/detail.vue、brand/detail.vue、auxiliaryProject/detail.vue 的 DetailTemplate 数据中移除 `required: true`
- rules 校验规则保持不变，编辑/新增态必填星号与校验提示不受影响

## 涉及文件
- styles/index.scss
- .workbuddy/memory/MEMORY.md
- 路由信息.json
- components/zs-form-item/zs-form-item.vue
- components/zs-form/zs-form.vue
- layout/components/AppMain.vue
- views/company/personnelCertificate/detail.vue
- views/company/companyManagement/components/agencyBasicInfoContent.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/099.md
- 来源会话ID：99e93fa9-bdba-48d1-9456-be2dc7b45c5f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_template_required",
  "source_extraction_id": "9e8e2d3533054e708a85237f24078d9d",
  "version": 1,
  "memory_type": "entities"
}
-->