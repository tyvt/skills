# 表决页硬编码字段名不符致 undefined
昆山市民表决页因写死字段名与接口返回不一致导致显示 undefined，已新增工具函数兼容多字段名。

## 问题描述
- `vote.vue` 写死 `optionGroupList[0].minOptionNum` 与 `mixOptionNum`，与接口实际返回 `optionNum` 等字段不一致
- 字段名不匹配导致最小/最大可选数显示 `undefined`

## 修复方案
- 新增 `src/utils/optionLimit.js` 兼容多字段名
- `vote.vue` 改用该工具读取与校验最小/最大可选数

## 验证与归属
- 所属项目：昆山市民
- 验证证据：extracted source=cursor project=昆山市民
- 来源会话ID：ac3abbe6-acb9-4b9f-b696-4801dd2f5e3e
- 代码基线：none
- 涉及文件：src/pages_vote/vote/vote.vue、src/stores/vote.js、src/api/modules/vote.js、src/stores/election.js、src/pages_vote/vote/components/optionResult.vue、src/pages_election/election/confirmElection.vue、src/pages_vote/vote/vote_confirm.vue、src/pages_election/election/Participate.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "vote_fieldname_bug",
  "source_extraction_id": "1e221c0770bc474fb2d32abe42a88d10",
  "version": 1,
  "memory_type": "entities"
}
-->