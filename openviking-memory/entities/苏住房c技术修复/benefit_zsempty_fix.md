# 受益分包空状态组件属性批量修复
苏住房C小程序 pages_benefit 分包中 11 处 ZsEmpty 的 text 属性误用，已统一改为 description。

## 问题根因
- ZsEmpty 组件空状态文案应使用 description 属性，原代码错误使用 text 属性导致不显示。

## 修复内容
- 批量修改 balancePublicity/index.vue、assetsPublicity/parkingLeaseSituation.vue、collectionPayment/index.vue、fundPublicity/index.vue、fundPublicity/detail.vue、fundPublicity/detail2.vue、fundPublicity/benefit.vue、fundPublicity/benefitDetail.vue、sharedFunds/components/PublicityTab.vue、sharedFunds/components/OverviewTab.vue、sharedFunds/components/DetailsTab.vue 共 11 处，将 text 改为 description。

## 验证与归属
- 涉及文件如上；所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：f33d070f-15e7-4d33-aa9e-f5133dc9ff92

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "benefit_zsempty_fix",
  "source_extraction_id": "dd644fade7404995bf520b780ef14064",
  "version": 1,
  "memory_type": "entities"
}
-->