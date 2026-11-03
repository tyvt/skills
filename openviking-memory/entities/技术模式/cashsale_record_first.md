# 现售备案详情基本信息首位展示备案编号
苏州市房地产监测V3现售备案详情将「现售备案编号」置为基本信息首项，并防止顶栏重复。

## 修复方案
- CashsaleInfoPanel.vue 的 infoView 经 unshift 将「现售备案编号」置为基本信息首项
- 预售转现售以 splice(1, 0, …) 插入预售许可证号
- CashsaleDetail.vue 从 headTitleList 移除该编号防止顶栏重复

## 验证手段
- E2E 于 cashsale-apply-helpers.js 新增 assertCashsaleBasicInfoRecordNoFirst 校验首项与顶栏去重

## 涉及文件
- presale/cashsale/detail.vue、CashsaleInfoPanel.vue、cashsaleConstants.js
- CashsaleDetail.vue、PermitInfoPanel.vue、permit/detail.vue
- entrust-sale-detail-layout.spec.js、cashsale-apply-helpers.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/129.md
- 所属项目：苏州市房地产监测V3；来源会话：88abd213-0e65-43a2-9a47-f93417d5524d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_record_first",
  "source_extraction_id": "d59ddbfaa7294cb29f8936825d8b0a16",
  "version": 2,
  "memory_type": "entities"
}
-->