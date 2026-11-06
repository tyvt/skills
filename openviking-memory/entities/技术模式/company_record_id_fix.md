# 企业备案ID占位符过滤修复
苏州市房地产监测V3 中修复 getByCompanyRecordId 请求体携带菜单未替换占位符（如 tabUuid）的问题，统一解析可用企业备案ID。

## 问题原因
- getByCompanyRecordId 请求体出现占位符 companyRecordId: "tabUuid"（非真实备案主键）
- 原先从 query / getOwnCompany 取 ID 时未统一过滤占位符，占位值仍可能被发到接口

## 修改说明
- 新增 src/utils/companyRecordId.js：isUsableCompanyRecordId 排除 tabUuid、tableId 等占位符
- resolveCompanyRecordIdFromRoute：从 query（含 id）、:tableid、路径段解析并忽略占位
- shouldResolveCompanyRecordIdFromOwnCompany：仅 B 端本企业用户在无路由 ID 时回落 getOwnCompany
- toB/qualificationRecord/detail.vue 使用上述工具解析 ID，getOwnCompany 结果同样校验，监听 $route.fullPath 切换侧栏菜单时重新拉数
- qualificationRecord.js 的 getQualificationRecordByCompanyRecordId 接入校验

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：src/utils/companyRecordId.js、toB/qualificationRecord/detail.vue、qualificationRecord.js、companyAdmin/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：a02500a7-b2e2-4433-9f71-b3fd7a6ccd98

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_record_id_fix",
  "source_extraction_id": "ad9c255ef9424451b286246018dc4061",
  "version": 1,
  "memory_type": "entities"
}
-->