# 选项表决选中状态异常 Bug
昆山市民业主表决功能因选项选中状态异常导致无法提交与预览缺项，已提交修复。

## 问题描述
- 选项表决选中状态异常，导致无法提交且提交预览缺项

## 修复与验证
- 提交 `be43e88` 修复逻辑
- 打 tag `suzhou-kunshan-wuguan-v1.40.20` 并推送至 `origin/main`

## 验证与归属
- 所属项目：昆山市民
- 验证证据：extracted source=cursor project=昆山市民
- 验证：src=昆山市民/003.md
- 来源会话ID：3fc0af4c-165e-456d-a2e7-3c8a15cb9868
- 涉及文件：src/pages_vote/vote/vote.vue、src/stores/vote.js、src/pages_vote/vote/vote_confirm.vue、src/utils/optionLimit.js、src/pages_vote/vote/participate.vue、src/pages_election/election/Participate.vue、src/api/modules/election.js、src/pages_election/election/components/CandidateCard.vue


<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "vote_selection_bug",
  "source_extraction_id": "fee3af51cb1141ce92e38b088ebd441e",
  "version": 1,
  "memory_type": "entities"
}
-->