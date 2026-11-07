# 选项表决组件单选逻辑致无法多选
太仓一网通办H5 的 OptionStepChoose.vue 强制单选，与后台多选配置冲突导致无法多选。

## 问题根因
- OptionStepChoose.vue 的 chooseOption 强制单选（遍历取消其他）
- 与后台 minOptionNum/optionNum 多选配置冲突

## 修复方案
- 改为点击切换选中态
- 增加达到 optionNum 上限提示与 minOptionNum 下限校验
- 参考 ElectionParticipate.vue

## 验证与归属
- 验证证据：extracted source=cursor session=804f62c1-551c-4332-a5e4-02f086853a2e
- 涉及文件：src/views/owner-decision/components/OptionStepChoose.vue、src/views/decision/components/StepChoose.vue、src/store/vote.ts、src/views/election/ElectionParticipate.vue、src/store/vote.js、src/views/owner-decision/ParticipateIn.vue、src/views/owner-decision/components/GeneralStepChoose.vue、src/views/decision/components/StepConfirm.vue
- 所属项目：太仓一网通办H5；来源会话：804f62c1-551c-4332-a5e4-02f086853a2e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_multiselect_bug",
  "source_extraction_id": "fc297c05bb3e476ab3698f797831cc98",
  "version": 1,
  "memory_type": "entities"
}
-->