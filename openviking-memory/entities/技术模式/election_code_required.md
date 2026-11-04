# 选举申请共用组件缺失筹建编号必填校验
election/components/apply/detail.vue 作为业委会/监委会选举申请共用组件，原丢失 preparatoryApplyCode 必填规则，致保存时未填「筹建申请编号」无提示。
## 问题根因
- 共用组件 detail.vue 丢失 preparatoryApplyCode 必填规则，保存时未校验「筹建申请编号」
- 业委会/监委会选举申请复用同一组件，均受影响
- 前端重构遗漏 `rules` 必填校验，导致筹建申请编号非必填的回归缺陷
- 本仓库仅含前端子模块，后端 `@NotBlank` 校验无法在此核实
## 解决方案
- 于该文件补回 `rules` 校验（preparatoryApplyCode 必填规则），未填则提示不能为空
- 历史曾推送子模块 zhi2-web-admin 提交 a5ed781 与主仓 94abb8c 至 develop/v2.6.2，后于前端重构中回归
## 验证与归属
- 验证：src=泰兴G/006.md；extracted source=cursor session=4c42145a-00b5-4c8f-8130-d1dbd9c98adc
- 涉及文件：zhi2-web-admin/src/views/autonomy/election/components/apply/detail.vue、candidateCollect/components/detail.vue、preparatoryGroup/detail.vue、record/components/detail.vue、election/owner/apply/detail.vue、election/components/apply/index.vue、mixins/detailMixins.js、mixins/form.js、package.json
- 来源会话：c2b7f8fe-ee88-4f92-b79e-263bb7ea98c3；4c42145a-00b5-4c8f-8130-d1dbd9c98adc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "election_code_required",
  "source_extraction_id": "711b02c3051d41118a09a64828ded27d",
  "version": 3,
  "memory_type": "entities"
}
-->