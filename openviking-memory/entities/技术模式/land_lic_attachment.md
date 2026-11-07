# 建设用地规划许可证详情页内联要件
苏州市房地产监测V3 项目中，截图红框标注的「附件块」已在建设用地规划许可证详情页落地，实现方式与预售延期、人员备案等页面内联要件一致。

## 正证详情改动
- conLandLic/detail.vue：在「基本信息」下方增加「要件上传」，使用 AppendixPackageSection（requirement-grid）
- 顶部操作栏关闭抽屉式「附件」（:show-attachment="false"），避免与页面内要件重复
- busCode 来自路由 meta（060602，getRouteMetaValue）
- 新增临时 attachGroupId 挂要件，保存时随 attachGroupId 提交；保存前 checkRequiredAppendix 校验必传要件
- 新增/编辑态在 formMode === 'add' 或 bizState === '0' 时可上传要件

## 变更详情改动
- conLandLic/changeDetail.vue：同样增加内联要件区（busCode：060606）
- 从原证发起变更新增时，将 bizState 置为 '0'，避免继承已备案状态导致要件只读

## 涉及文件与归属
- 涉及文件：conLandLic/detail.vue、conLandLic/changeDetail.vue、ProjectCertificateTabs.vue、AppendixPackageSection/index.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：08d158aa-14a3-438a-98bd-09ead4ebdacd

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "land_lic_attachment",
  "source_extraction_id": "bbd4581dcffa4b8cbd0e54040f471573",
  "version": 1,
  "memory_type": "entities"
}
-->
