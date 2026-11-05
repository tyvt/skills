
# 个人房源详情页不显示经纪人图标修复
苏住房C 移动端 `pages_transaction/stockHouse/detail.vue` 中，个人房源（`publishRole == 0`）原本错误显示底部公司/经纪人图标区块，现已修复。

## 问题根因
- 个人房源（`publishRole == 0`）未隐藏底部公司/经纪人图标区块

## 修复内容
- 公司图标仅在中介房源（`publishRole == 1`）且存在机构名称（`agentCompanyName`）时渲染，个人房源完全不渲染该区块
- 标签文案由「个人-房东」改为「个人房源」，与设计稿一致

## 涉及文件与归属
- 涉及文件：`pages_transaction/stockHouse/detail.vue`、`pages_main/houseMap/components/StockHouse.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：cdb00ca8-ca47-462a-8aa6-e2db4d35b371
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "personal_broker_icon",
  "source_extraction_id": "5f8c87ce4f034a1abdb06f2a7cb79788",
  "version": 2,
  "memory_type": "entities"
}
-->