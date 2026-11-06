# Summary
在苏州市房地产监测V3项目中，已在 zhi2-web-admin/src/api/company/companyApply.js 补全机构备案相关 API（包括 getCompanyApplyCertificateInfo 等）。截至2026-11-06，本地 npm run build 不再报 getCompanyApplyCertificateInfo is not exported，但约2分钟后因无关问题（agentTab.vue 从 @/api/system 导入错误）失败。
# 2026-11-06 (Friday) ChatLog:
**user**: 【记忆类型】pattern
【标题】[error] error during build
【内容】## 已完成 已在 [`zhi2-web-admin/src/api/company/companyApply.js`](zhi2-web-admin/src/api/company/companyApply.js) 补全机构备案相关 API，其中包括： - `getCompanyApplyCertificateInfo` → `POST /company/companyApply/certificateInfo` - 以及 `pageCompanyApply`、`getCompanyApplyRecordList`、`getCompanyApplyDetail`、`getAvailableAgents`、`addAgencyApply`、`replaceCompanyApplyPersonnel`、`approveCompanyApply`、`deleteCompanyApply` `getCompanyApplyOverview` 仍保留「无 `companyRecordId` 时传 `{}`」的逻辑。 ## 构建验证 本地 `npm run build` **已不再报** `getCompanyApplyCertificateInfo is not exported`。构建在约 2 分钟后因**无关问题**失败： `agentTab.vue` 从 `@/api/system`
【验证证据】extracted source=cursor project=苏州市房地产监测V3
【涉及文件】[`zhi2-web-admin/src/api/company/companyApply.js`](zhi2-web-admin/src/api/company/companyApply.js ; `agentTab.vue ; `companyApply.js ; 涉及文件：d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\api\company\companyApply.js、d:\repository\苏州市房地产监测V3\zhi2-web-admin\src\views\institution\record\components\RecordCertificateDialog.vue
【所属项目】苏州市房地产监测V3
【来源会话ID】8570c278-55c3-4b1f-94fe-2e52d9744baf
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "机构备案API补全",
  "goal": "补全备案相关API",
  "summary": "在苏州市房地产监测V3项目中，已在 zhi2-web-admin/src/api/company/companyApply.js 补全机构备案相关 API（包括 getCompanyApplyCertificateInfo 等）。截至2026-11-06，本地 npm run build 不再报 getCompanyApplyCertificateInfo is not exported，但约2分钟后因无关问题（agentTab.vue 从 @/api/system 导入错误）失败。",
  "ranges": "7-13",
  "source_extraction_id": "d88229bea29e42b0aee15c7479fccd64",
  "version": 1,
  "memory_type": "events"
}
-->