# 租赁合同备案列表说明文字统一为 operation-hint 样式
公共收益-租赁合同备案下三个模块的列表页顶部说明文字各写一份样式，与同模块房源表风格不一致，需统一对齐 pubHouseTable 的 operation-hint。

## 问题现象
- 经营资产、经营资源、停车泊位三个租赁合同备案模块列表页说明文字整段橙色、上下内边距 15px、无图标
- 与同模块房源表（pubHouseTable）的 operation-hint 风格不一致
- 经营资产、停车泊位表格标签上存在多余的 `>` 字符

## 根因
- 说明文案是各页手写的 div + scoped 样式，未对齐已成熟的 operation-hint 样式

## 解决方案
- 以 pubHouseTable 的 operation-hint 为基准：左侧橙色警告图标、文案左对齐、正文 #333 仅关键词标橙、上下内边距 8px
- 三个模块三处一起改，顺带修掉多余的 `>` 字符
- 第 4 个模块需要时把 operation-hint 抽成公共组件/公共类，而非复制第四份 scoped 样式
- 详情页 Headline 显式传 titleText="基本信息"；查看态 basicInfoList / payeeInfoList 补两列布局（lg/xl: 12）

## 验证与归属
- 验证证据：会话 8331b045 用户参考样式图诉求
- 涉及文件：benefit/pubHouse/components/pubHouseTable.vue、benefit/assetLeaseApply/index.vue、benefit/assetLeaseApply/detail.vue
- 所属项目：产品2.0；来源会话：8331b045-2515-4a08-946d-7d95ffaf7dd5；代码基线：41c6961

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "lease_hint_style",
  "source_extraction_id": "e59099027e5d4206a29ce912d71e4142",
  "version": 1,
  "memory_type": "entities"
}
-->