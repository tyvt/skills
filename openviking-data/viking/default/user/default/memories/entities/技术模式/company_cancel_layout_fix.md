
# 机构注销详情「注销信息」布局修复
苏州市房地产监测V3 完成机构注销详情页 `detail.vue` 的布局修复。

## 修改内容
- 区块间距：增加 `.company-basic-info-form + .collapse-container { margin-top: 12px }`，使「注销信息」与上方「基本信息」卡片间有 12px 间距
- 编辑态布局：将 `el-row` / `el-col` 改为与 `CompanyBasicInfoForm` 一致的 `section-form` 栅格；注销时间 `.section-field`（半行宽），注销原因、附件 `.section-field--full`（整行撑满）；补充 `width: 100%` 深度样式；768px 以下自动切换为单列
- 查看态布局：注销时间 `layout` 从 `THIRD_LAYOUT`（1/3 宽）改为 `HALF_LAYOUT`（半行宽）与基本信息一致；移除未再使用的 `THIRD_LAYOUT` 常量

## 涉及文件
- zhi2-web-admin/src/views/company/companyCancel/detail.vue
- zhi2-web-admin/src/components/Headline/index.vue
- zhi2-web-admin/src/views/company/companyManagement/components/CompanyBasicInfoForm.vue

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：e29a66b7-c226-49ac-b501-5a592c4091f8；验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_cancel_layout_fix",
  "source_extraction_id": "23307535f6ae434f939ec78293727547",
  "version": 1,
  "memory_type": "entities"
}
-->