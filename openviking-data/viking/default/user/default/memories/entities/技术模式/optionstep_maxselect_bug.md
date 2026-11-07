# OptionStepChoose 选项表决最多选择项数错误
太仓一网通办H5 的选项表决页面因 maxSelect 优先级错误，导致 C 端可选出超过分组配置上限的选项数。

## 问题根因
- OptionStepChoose.vue 第79-82行 maxSelect 取值顺序有误：优先使用决策级 view.optionNum（选项总数，本例为4）而非分组级 currentGroup.optionNum（最多可选数，后台配置为3）
- 代码 `return Number(view.optionNum) || Number(currentGroup.value?.optionNum) || 0` 先读决策级4，使上限被误判为4

## 修复内容
- 调整上限字段优先级：存在分组时优先使用 currentGroup.optionNum 作为最多可选数
- 补充下限字段：分组级也支持 minOptionNum
- 提交时二次校验：点击「下一步」时再次检查是否超过上限

## 验证证据
- 重新进入选项表决页面（决策 ID 2493）测试：最多应只能选3项，选第4项时提示「最多选择3项」
- 涉及文件：src/views/owner-decision/components/OptionStepChoose.vue、src/store/vote.ts、src/views/decision/components/StepChoose.vue、src/store/vote.js、src/api/modules/decision.ts、src/views/election/ElectionParticipate.vue、src/views/owner-decision/ParticipateIn.vue、src/views/owner-decision/OwnerDecisionDetail.vue
- 所属项目：太仓一网通办H5；来源会话：31fcae87-08be-423a-9da7-ea37db71840b；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "optionstep_maxselect_bug",
  "source_extraction_id": "924a0db299a54a6195a4b0d68cc0e945",
  "version": 2,
  "memory_type": "entities"
}
-->
