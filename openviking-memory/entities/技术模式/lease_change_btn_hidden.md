# 变更按钮未按机构类型隐藏
在苏州市房地产监测V3项目中，租赁机构基本信息页面的工具栏未根据机构类型隐藏变更按钮。

## 问题根因
- 原始变更按钮未区分机构类型
- `AgencyBasicInfoDetail.vue` 未处理租赁机构的情况 (`isLeaseOrgan`)

## 解决方案
- 在 `AgencyBasicInfoDetail.vue` 的 `resolvedShowChangeBtn` 方法中，当 `isLeaseOrgan` 为 true 时返回 `false`
- 经纪机构按原规则保持显示，如 `bizState === '2'`

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/246.md
- 涉及文件: company/companyManagement/components/AgencyBasicInfoDetail.vue, 路由信息.json, toB/agencyRecord/detail.vue, company/companyRecordAgency/index.vue, institution/company/index.vue, company/companyManagement/components/detail.vue, DeveloperBasicInfoDetail.vue
- 所属项目: 苏州市房地产监测V3; 会话: e9a70a5b-c33c-473a-a16b-d697f4cce441; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_change_btn_hidden",
  "source_extraction_id": "3440ed0abfed42a4aa0c1bc2d6540321",
  "version": 1,
  "memory_type": "entities"
}
-->