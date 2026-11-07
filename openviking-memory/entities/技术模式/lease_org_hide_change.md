# 租赁机构基本信息页isLeaseOrgan隐变更
苏州市房地产监测V3 中租赁机构（`isLeaseOrgan` 为真）基本信息页不需展示「变更」按钮。

## 问题根因
- 租赁机构（`isLeaseOrgan` 为真）基本信息页错误地展示了「变更」按钮
- 原逻辑未对 `isLeaseOrgan` 做隐藏判断，经纪机构仍按 `bizState === '2'` 等原规则显示

## 解决方案
- 于 `AgencyBasicInfoDetail.vue` 的 `resolvedShowChangeBtn` 中判断 `isLeaseOrgan` 为真时返回 `false`
- 经纪机构仍按 `bizState === '2'` 等原规则显示「变更」按钮

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/046.md
- 涉及文件：company/companyManagement/components/AgencyBasicInfoDetail.vue、路由信息.json、toB/agencyRecord/detail.vue、company/companyRecordAgency/index.vue、institution/company/index.vue、company/companyManagement/components/detail.vue、DeveloperBasicInfoDetail.vue 等
- 所属项目：苏州市房地产监测V3；来源会话：e9a70a5b-c33c-473a-a16b-d697f4cce441；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_org_hide_change",
  "source_extraction_id": "21c871f3e04343d18fdcbf2dc8406ff6",
  "version": 1,
  "memory_type": "entities"
}
-->