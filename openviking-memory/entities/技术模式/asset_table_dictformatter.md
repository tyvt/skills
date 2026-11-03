# asset_table_dictformatter
statisticsMap 资产表业务状态列需加 dictFormatter 以统一字典格式化显示。

## 问题背景
- AssetLeaseInfoTable.vue 的 业务状态 列未使用字典格式化，显示不一致

## 解决方案
- 参照 src/views/benefit/pubAssetLease/index.vue 增加 :formatter="dictFormatter"
- 其余 dict-tag 逻辑不变，无 lint 报错

## 验证与归属
- 涉及文件：statisticsMap/components/AssetLeaseInfoTable.vue、src/views/benefit/pubAssetLease/index.vue
- 来源会话：ab754da1-67a3-472d-958a-16a7203363bd
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "asset_table_dictformatter",
  "source_extraction_id": "283032af46cb4317908e542b78aaeac1",
  "version": 1,
  "memory_type": "entities"
}
-->