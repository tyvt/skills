# 投票选项最小/大选择项数缺总数校验
VotingItemsDialog.vue 原缺最小/大选择项不超投票选项总数的校验，致可设超限值。
## 问题根因
- VotingItemsDialog.vue 原缺 minOptionNum/maxOptionNum 不超投票选项总数的自定义校验
## 解决方案
- 于 rules 增强 minOptionNum/mixOptionNum 自定义校验
- 校验要求：最少选择项不超投票选项总数、最多选择项不超投票选项总数，并保留原有最少<=最多、最多>=最少校验
- 在 handleDel/handleAdd 增删选项时联动触发校验
## 验证与归属
- 验证：extracted source=cursor session=ffe6dd2e-8a86-4812-a053-a9fd3670c616
- 涉及文件：zhi2-web-admin/src/views/autonomy/multiply/components/VotingItemsDialog.vue
- 所属项目：泰兴G
- 来源会话：ffe6dd2e-8a86-4812-a053-a9fd3670c616；代码基线：none
- 备注：该文件仍存在历史 lint 类型报错，与本次需求无关，本次新增未引入新同类问题

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vote_option_count",
  "source_extraction_id": "cd9cbfe71f1349adadefc18f35da7376",
  "version": 2,
  "memory_type": "entities"
}
-->