# 企业端变更页返回按钮缺失
苏州市房地产监测V3 项目中 toB/companyRecord/detail.vue 的企业端变更页缺少返回按钮逻辑缺陷。

## 问题现象
- 新增 showBackButton 仅在 isChange、backUrl 或路径末段为业务主键时显示返回
- 企业端从基本信息页发起变更时路由为 ../detail?formMode=edit&id=...，末段是模块名 detail 且未携带 backUrl
- 变更编辑/保存后查看阶段操作栏不显示返回，用户无法通过应用内导航回到企业基本信息视图

## 根因
- DeveloperBasicInfoDetail.navigateToChangeEdit 跳转到同一路径并仅附加 formMode 与 id 查询参数
- 路径末段始终为 detail，isNavigableDataId 将其识别为模块段而非业务主键

## 涉及文件与归属
- zhi2-web-admin/src/views/toB/companyRecord/detail.vue（172-177 行）
- 关联：DeveloperBasicInfoForm.vue、DeveloperBasicInfoDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：785103ae-ef4a-4772-bf72-7d837fa9f30c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tob_company_record_back_button_missing",
  "source_extraction_id": "6ae9df91bcf942f9a3361c899633d9bd",
  "version": 1,
  "memory_type": "entities"
}
-->