# 企业管理员变更能力实现
苏州市房地产监测V3 新增 companyAdminChange 管理员变更（拆单）能力，对齐对接文档要求。

## 排查结论
- 代码库原先无 companyAdminChange 能力：管理员详情仍走 companyAdmin 的 /edit + 同表审批（allow-edit-when-recorded），与文档「拆单」要求不一致

## 已实现改造
- API src/api/company/companyAdminChange.js：新增 getLast/detail/update，与文档 2.1–2.3 一致
- 常量 companyOrgan.js：变更要件编码 qyglybg/jgglybg/zlglybg 及 resolveCompanyAdminChangeBusCode()
- 变更详情路由（需后端菜单登记 meta.filePath）：company/companyAdminChange/detail、developer/detail、agency/detail；统一跳转 /company/companyAdminChange/detail?dataId={变更单ID}（支持 dataId 查询参数）

## 涉及文件与归属
- 文件：src/api/company/companyAdminChange.js、companyOrgan.js、companyAdmin/detail.vue、company-record-change.spec.js
- 项目：苏州市房地产监测V3；来源会话ID：30daf179-c00a-4ab2-91ef-33d98ef90302

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_admin_change",
  "source_extraction_id": "cf849a215e8c44dd8c9bdd8eace90dfe",
  "version": 1,
  "memory_type": "entities"
}
-->
