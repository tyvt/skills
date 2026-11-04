# houseMap组件缺失路径误引
`pages_main/houseMap/components/`下的`StockHouse.vue`与`NewHouse.vue`误用已删除相对路径`../../collect/components/collectBtn.vue`引发组件缺失。
## 问题根因
- 两个文件引用了已删除的相对路径，导致构建/运行时组件缺失
## 解决方案
- 引用路径已更正为`@/components/collectBtn/collectBtn.vue`
## 验证与归属
- 验证证据：src=苏住房C/031.md
- 涉及文件：zhi2-mobile-shimin/src/pages_main/houseMap/components/StockHouse.vue、NewHouse.vue、pages/commonNew/houseCard.vue、pages.json、vite.config.ts、components/commonNew/houseCard.vue、pages_main/collect/components/collectBtn.vue、pages_main/collect/index.vue、components/collectBtn/collectBtn.vue、pages_transaction/stockHouse/commonBuildings.vue
- 所属项目：苏住房C；来源会话ID：3ae4dee9-19f6-4db4-8759-c97af7318eb7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "housemap_import_bug",
  "source_extraction_id": "683afd88640c49c496defff46d02b40e",
  "version": 1,
  "memory_type": "entities"
}
-->