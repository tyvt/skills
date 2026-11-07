# 租赁机构变更当前页内切换
苏州市房地产监测V3 将租赁机构「变更」改为在当前菜单页内切换查看/编辑，不再跳转到经纪菜单路径。
## 改动内容
- 新增租赁 B 端壳页面 `zljg/companyRecord/detail.vue` 与 `zljg/agencyRecord/detail.vue`（filePath 别名），逻辑同 `toB/agencyRecord/detail`，带 `CompanyOrganProvider`
- `AgencyBasicInfoDetail`：当前路由属于「本页内变更」白名单（含 `zljg/*` 与 `toB/agencyRecord/detail`）时，变更只改 query（`formMode=edit`），路径不变
- `toB/agencyRecord/detail`：提交变更后回到当前 path 查看态，不再写死经纪菜单路径
## 菜单配置
- 「机构基本信息」组件应配置为 `zljg/companyRecord/detail`（或 `zljg/agencyRecord/detail`）
## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`zljg/companyRecord/detail.vue`、`zljg/agencyRecord/detail.vue`、`LeaseEntryNetworkSections.vue`、`agencyBasicInfoContent.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：015a09b1-527e-4f9f-b78f-3ba02a284fe9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zljg_change_inline",
  "source_extraction_id": "069f712b5e4e47259870a25360d9451d",
  "version": 1,
  "memory_type": "entities"
}
-->