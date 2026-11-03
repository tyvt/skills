# 服务方案弹窗去拦截并用v-if重挂载
在苏州市房地产监测V3中，服务方案弹窗移除前置拦截并改用 v-if 重挂载以保证事件执行。

## 修复要点
- 移除 rootCompanyRecordId 未加载完则不打开弹窗的前置拦截
- 以 v-if="schemeDialogOpen" 重挂载确保 @open/loadPage 执行
- 弹窗底部仅留常规按钮（查看关闭、新增编辑取消+确定）
- 启用/禁用与编辑操作保留在列表

## 涉及文件
- zhi2-web-admin/src/views/company/institutionRegister/detail.vue
- zhi2-web-admin/src/views/company/companyRecordAgency/detail.vue
- zhi2-web-admin/src/components/README.md
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/views/system/bankList/components/BankDialog.vue
- zhi2-web-admin/src/views/company/companyManagement/components/agencyBasicInfoContent.js
- zhi2-web-admin/src/utils/detailLayout.js
- zhi2-web-admin/src/views/company/companyScheme/detail.vue

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/026.md
- 来源会话：fe8e14a9-62e2-477a-bd32-f3f069ed26fd
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scheme_dialog_remount",
  "source_extraction_id": "1eff560d266446f4988cb669dab21459",
  "version": 1,
  "memory_type": "entities"
}
-->