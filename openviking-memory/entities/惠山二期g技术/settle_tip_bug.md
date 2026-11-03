# 施工结算总额注释误袭线下核查费文案
惠山二期G zhi2-web-admin 维修结算详情页施工结算总额提示文案误用线下核查费文案的缺陷与修复。

## 问题根因
- zhi2-web-admin/src/views/maintenance/completion/detail.vue 的 constructionSettleAmountTip 计算属性误用「线下核查费」注释文案

## 修复方案
- 改为「维修工程的实际造价，仅针对维修施工阶段发生的费用。」
- 同步生效于 el-tooltip 及 contentInfo.labelTooltip

## 验证与归属
- 验证证据：src=惠山二期G/013.md
- 涉及文件：zhi2-web-admin/src/views/maintenance/completion/detail.vue
- 所属项目：惠山二期G；来源会话：6bac5a7c-3034-4609-9345-03915c598bc6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "settle_tip_bug",
  "source_extraction_id": "199894fef6144ee28cf97b4077472d75",
  "version": 1,
  "memory_type": "entities"
}
-->