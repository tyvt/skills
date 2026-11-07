# 可视化行政划分新字段缩进对齐修复
产品2.0项目benefit/mapOverview/index.vue中“行政划分”新增3个字段因lv设置错误导致缩进显示异常已修复。

## 问题根因
- mapTipRows里3个新字段（本年新增账户数、本年新增收入金额、本年新增支出金额）的lv被设为2
- 与“资金收入/资金支出”一样加了padding-left:20px，看起来像“资金余额”子项

## 修复方案
- 将这3个字段的lv改为1，与“资金余额”同级左对齐
- 顺序调整为：资金余额 → 3个本年新增字段 → 资金收入/资金支出（仍为lv:2缩进）

## 涉及文件与验证
- 涉及文件：benefit/mapOverview/index.vue
- 验证：刷新页面后红框里3个字段应与“资金余额”左对齐，不再缩进
- 来源会话ID：0c9c218b-0876-4484-af0e-4452a8f8c076；项目：产品2.0；代码基线：none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_lv_fix",
  "source_extraction_id": "43d08df398dd40149127f1a7c83beead",
  "version": 1,
  "memory_type": "entities"
}
-->
