# 机构基本信息接口调用排查结论
苏州市房地产监测V3 排查确认经纪/租赁机构侧「机构基本信息」页面不存在开发企业侧的接口未调用问题。

## 排查结论
- 对经纪/租赁机构相关的「机构基本信息」「入网申请」等页面做对照
- 经纪机构侧（AgencyBasicInfoDetail）没有与开发企业侧相同的接口未调用问题

## 代码对照
- 入口：`toB/agencyRecord/detail.vue`（租赁 `zljg/companyRecord/detail` 复用同一页）
- `AgencyBasicInfoDetail.vue` 在 `created` 里无条件调用 `loadDetail()`，内部 B 端走 `getOwnCompany`，不依赖 `detailMixins` 的 `formMode === 'view'` 才 `init()`
- 开发企业 `DeveloperBasicInfoDetail`（修前）存在差异

## 验证与归属
- 涉及文件：`AgencyBasicInfoDetail.vue`、`DeveloperBasicInfoDetail.vue`、`companyBasicInfo/detail.vue`
- 所属项目：苏州市房地产监测V3
- 来源会话ID：e15a1da6-99f2-4436-b12d-c0e94bfb9658

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_basicinfo_check",
  "source_extraction_id": "f16b3953e23c43639f5b40170e496d0f",
  "version": 1,
  "memory_type": "entities"
}
-->