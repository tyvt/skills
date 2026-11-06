# 服务方案详情弹窗改造
苏州市房地产监测V3 中服务方案详情弹窗已改为单列弹窗并简化底部按钮。

## 主要改动
- 去掉「未获取到机构备案信息就不打开」的前置拦截（原先 rootCompanyRecordId 未加载完时点新增会被拦住）
- 用 v-if="schemeDialogOpen" 每次打开重新挂载弹窗，保证 @open / loadPage 执行
- 弹窗底部只保留常规按钮：查看为关闭，新增/编辑为取消+确定（保存成功后关闭并刷新列表）
- 启用/禁用仍在列表行开关操作；编辑仍从列表「编辑」进入弹窗

## 涉及文件
- company/institutionRegister/detail.vue
- company/companyRecordAgency/detail.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：fe8e14a9-62e2-477a-bd32-f3f069ed26fd

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "service_scheme_dialog",
  "source_extraction_id": "2ce6e05076dc4191b626041ebd65d301",
  "version": 1,
  "memory_type": "entities"
}
-->