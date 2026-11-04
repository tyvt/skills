# 业委会选举候选业主群众隐藏党组织
太仓G 业委会选举 CandidateDialog 若把所属党组织写死 required，选政治面貌「群众」仍会显示红星并校验失败。

## 问题根因
- CandidateDialog 把所属党组织写死 required，选政治面貌「群众」仍显示红星并校验失败
- 园区公共收益有按身份切换附件的类似模式，但本弹窗是党组织字段联动

## 解决方案
- 新增 isMassesPoliticsStatus 计算属性，当政治面貌为「群众」时返回 true（通过字典 dictLabel 匹配，兼容不同 dictValue）
- 条件显示：政治面貌为「群众」时 v-if 隐藏「所属党组织」字段
- 动态校验：将 rules 改为计算属性，仅在非「群众」时校验「所属党组织」
- 切换清理：选择「群众」时自动清空「所属党组织」并清除该字段校验提示；党员等其它面貌仍显示且必填

## 验证与归属
- 验证证据：会话 ed64bbc0 用户选群众仍提示所属党组织必填；结论说明 dictLabel 匹配、条件显示与动态 rules
- 涉及文件：zhi1-web-admin/src/views/repairFunds/ownerApply/components/CandidateDialog.vue
- 所属项目：太仓G；来源会话：ed64bbc0-e94c-47ef-8caf-b46b1c3f85c0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "election_candidate_masses",
  "source_extraction_id": "8b0f5f72e9164350b1b5bfb2da20cbfe",
  "version": 2,
  "memory_type": "entities"
}
-->