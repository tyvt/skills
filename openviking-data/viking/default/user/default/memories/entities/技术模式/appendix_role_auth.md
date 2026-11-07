# 按角色展示附件并优先采用授权包
在 Suzhou Real Estate Monitoring V3 项目中，所需的附件根据操作员角色展示，在出现重复时优先采用授权包。

## 展示规则
- 非合同操作员仅见身份证
- 合同操作员见身份证和授权书
- 登记包（`备案包`）仅保留身份；包 `zljghtsq` 提供身份和授权
- 与登记包重复时，优先采用授权包并合并去除重复项

## 涉及的文件
- `views/institution/leasePersonnel/components/LeasePersonnelDetail.vue`
- `api/company/leasePersonnel.js`
- `views/institution/agencyPersonnel/components/AgencyPersonnelDetail.vue`
- `docs/suzhou-2016-presale-contract-diff-checklist.md`
- `views/institution/agencyPersonnel/components/AgencyPersonnelAddAppendix.vue`
- `components/AppendixPackageSection/index.vue`
- `e2e/fixtures/appendix-package-helpers.js`
- `components/AnnexUpload/index.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：77fa1a75-24f0-43b1-bb5c-38c9efb094bb
- 验证证据: src=苏州市房地产监测V3/027.md
- 会话 ID: 77fa1a75-24f0-43b1-bb5c-38c9efb094bb
- 所属项目: Suzhou Real Estate Monitoring V3; 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appendix_role_auth",
  "source_extraction_id": "6fc8792e24d54a0aa777d242fbe84ee6",
  "version": 1,
  "memory_type": "entities"
}
-->