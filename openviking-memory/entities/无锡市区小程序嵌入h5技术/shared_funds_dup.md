# 共有资金明细类型"全部共有资金"重复Bug
无锡市区小程序嵌入H5中 DetailsTab.vue 的类型选择器出现两条相同的「全部共有资金」选项。

## 问题根因
- `DetailsTab.vue` 的 `loadTypeOptions` 在加载字典 `benefit_app_account_fund_type` 时，手动在列表头部插入了「全部共有资金」
- 字典本身已包含该项（`value` 为空表示「全部」），导致选择器出现重复选项

## 修复方案
- 合并字典数据前先 `filter` 掉 `value` 为空或 `null` 的项，仅保留手动添加的那一条「全部共有资金」
- 代码：`dict.filter((item) => item.value !== "" && item.value != null)`

## 验证与归属
- 来源会话：0d2c6516-1930-4d19-b020-1182a8c885bb；代码基线：none
- 涉及文件：src/pages_benefit/sharedFunds/components/DetailsTab.vue、src/api/sharedFunds.js
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "shared_funds_dup",
  "source_extraction_id": "5279fead9abb4516adfbc3c5bd9fc16c",
  "version": 1,
  "memory_type": "entities"
}
-->