# zhi2-web-admin 仅含前端无后端
苏州市房地产监测V3的 zhi2-web-admin 仓库仅含前端实现，后端接口需独立仓库修改。

## 架构事实
- 仓库 zhi2-web-admin 仅含前端，无 Java 后端实现
- /company/companyApply 接口需后端独立仓修改

## 前端契约
- API 定义：src/api/company/companyApply.js
- 列表 companyApplyAudit/index.vue 用 approvalRegion
- 详情 detail.vue 读 administrativeArea 用 ECONOMIC_INSTITUTIONS_REGION，update 未封装调用

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/108.md; src=苏州市房地产监测V3-rest/055.md
- 涉及文件：src/api/company/companyApply.js、companyApplyAudit/detail.vue、companyApplyAudit/index.vue、companyApply/detail.vue、institution/record/components/AgencyApplyDialog.vue、institution/record/mixin.js、src/api/company/companyRecord.js、路由信息.json
- 来源会话：1ac6ad00-db16-4fd7-aafc-8152e4a58b8c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_frontend_only",
  "source_extraction_id": "ffbc88f6ff83419787a66226a5f2572d",
  "version": 2,
  "memory_type": "entities"
}
-->