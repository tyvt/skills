# 园区物管2.0 附件图片区块间距修复
园区物管2.0 的 benefit 详情页中「附件图片」紧贴上方表单，已通过包进统一 Headline 区块来对齐间距。

## 问题根因
- 「附件图片」直接放在最后一个 Headline（公共收益账户信息）后面，缺少区块间距。
- 上方各块由 Headline 提供 margin-top: 12px 与卡片内边距，故附件区显得过紧。

## 修复方案
- 将「附件图片」与「备注」包进新的 Headline 区块「其他信息」，与「基本信息」「用款申请信息」等保持一致。
- 查看模式下两字段已在 regulatoryInfo 的 DetailTemplate 展示，编辑区块加 v-if="formMode !== 'view'" 避免重复显示。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：benefit/pubAllotNotice/detail.vue、benefit/resourcesLeaseContractFiling/detail.vue、components/Headline/index.vue。
- 所属项目：园区物管2.0；来源会话：fe456319-acb9-4949-980a-575125236276；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_spacing_fix",
  "source_extraction_id": "1ded6c3f5a284e6eaec4d40de8a84dd5",
  "version": 1,
  "memory_type": "entities"
}
-->