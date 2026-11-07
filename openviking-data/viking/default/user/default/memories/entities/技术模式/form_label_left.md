# 表单标签左对齐实现与E2E文档断言不一致
publicPortal 表单标签左对齐改动已覆盖多页并经 portal.scss 生效，但 README 与 E2E 断言仍写右对齐，合并前需同步更新。

## 改造范围
- 覆盖 RentalPages、PortalSearch、Property/Information/Broker 相关页与 PropertyDetailDialog
- 样式经 PortalDialogHost 引入的 portal.scss 生效

## 待办事项
- README 与 test:e2e:public-portal 仍断言右缘列对齐，合并前需更新文档与弹窗断言
- 若经纪/租赁列表需可见标签应在 searchFields 补 label

## 涉及文件
- zhi2-web-admin/src/views/home/publicPortal/portal.scss
- zhi2-web-admin/src/views/home/publicPortal/pages/PropertyPages.vue、BrokerPages.vue、InformationPages.vue
- zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue、PortalSearch.vue
- zhi2-web-admin/src/views/home/UnifiedLogin.vue、README.md

## 验证与归属
- 所属项目：门户
- 验证证据：extracted source=cursor project=门户
- 验证证据：门户/023.md
- 来源会话ID：fa14d9fd-092e-4803-84b7-313e9d826641；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_label_left",
  "source_extraction_id": "87dc3c1f529f4b5fb5a8a756193bd67c",
  "version": 1,
  "memory_type": "entities"
}
-->