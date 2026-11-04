# 代理分支在添加页面使用 getOwnCompany
在添加页面，使用 getOwnCompany 替代 init 以预填机构数据。

## 描述
- `AgencyBranchDetail.vue` 将 `loadInit` 改为 `loadAddPage`，使用 `getOwnCompany` 获取 `companyRecord`。
- 映射到显示为禁用的 `parentCompanyName`/`parentSocialCreditCode`。
- 在添加状态下，发送 `configOnly`，并通过 `/add` 的 `attachmentList` 附加 `draftAppendixIds`。
- «提交»按钮隐藏直到 `/add` 成功。

## 文件
- `AgencyBranchDetail.vue`、`AgencyBranchList.vue` 进行了本地草稿注入，不带 `agencyBranchId`。
- 测试 `agency-branch-real-api-flow.spec.js` 等待 `getOwnCompany` 替代 `init`。

## 验证
- 来源: 苏州市房地产监测V3/072.md; 会话 01a162aa-5047-70c5-a400-7594cbb8728b.

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_branch_add_get_own_company",
  "source_extraction_id": "c7bc53bcb27a4ee29de6d3657fdd1479",
  "version": 1,
  "memory_type": "entities"
}
-->