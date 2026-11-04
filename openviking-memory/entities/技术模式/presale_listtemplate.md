# ListTemplate + listMixins 在商品房销售与维修基金中
commercialHousingSales 和 repairFunds 的列表页面已重构为 ListTemplate + listMixins。

## 上下文
- 5 个页面已转换：contractView, specialcontract, exchangeContract, verifyRecord 和 finance/rec
- 所属项目: zhi2-web-admin (产品 2.0)

## 关键点
- 配置了 presale 模块
- 保留了条件列 isSuzhouzhizai 和自定义的 getList
- 注入了 ChooseHouseDialog 组件

## 文件
- Views: commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue, commercialHousingSales/presale/{contractView,specialcontract,exchangeContract}/index.vue, repairFunds/{verifyRecord,finance/rec}/index.vue
- Mixins: mixins/ListTemplate.js 和 mixins/listMixins.js

## 验证
- cursor 会话: 43c84fe7-2b4f-4b61-b5ff-d697d2feb8ba

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_listtemplate",
  "source_extraction_id": "738f08956f814c1794657ebf13c3e648",
  "version": 1,
  "memory_type": "entities"
}
-->