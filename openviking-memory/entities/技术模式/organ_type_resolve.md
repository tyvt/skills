# 经纪机构管理员列表入参 organType 修复
苏州市房地产监测V3 项目中，经纪机构下的管理员管理列表接口误传 organType 为 agency，已修复为按路由与菜单正确推断。

## 问题原因
- 管理员列表请求的 organType 来自 listOrganType
- 菜单指向共用内核 company/companyAdmin/index 且无薄入口 :organ-type 时，resolveOrganType 默认 agency
- 导致开发企业管理→管理员管理误传 organType:"agency"，表头按经纪机构展示「管理员等级」

## 修改内容
- companyOrgan.js：filePath 推断后增加多层回退：路由 path/name 含 companyAdmin/developer→01、含 companyAdmin/agency→agency；菜单 busCode：qyglygl→01、jgglygl→agency；matched 父级标题含「开发企业」→01、含「经纪机构」→agency
- 共用 company/companyAdmin/index 不再一律当成开发企业
- companyAdmin/index.vue：列表统一用 resolveCompany 解析

## 涉及文件与归属
- 涉及文件：zhi2-web-admin/src/constants/companyOrgan.js、zhi2-web-admin/src/views/company/companyAdmin/index.vue、companyAdmin/agency/index.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：45c552dc-2133-4822-8720-0b09881d4cdf

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "organ_type_resolve",
  "source_extraction_id": "bbd4581dcffa4b8cbd0e54040f471573",
  "version": 1,
  "memory_type": "entities"
}
-->
