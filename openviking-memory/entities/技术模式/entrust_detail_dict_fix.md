# 委托代售详情页字典回显修复
苏州市房地产监测V3 项目修复委托代售详情页字典回显，统一业务状态字典 key 与展示方式。

## 修改内容
- `presale/entrustSale/detail.vue`：业务状态字典 key 由 `BIZ_STATE` 改为 `biz_state`，与同模块 `index.vue` 一致
- `projectInfoView` 中业务状态、委托状态、电子签状态改为 `dictLabel()` 预翻译，与 `entrustInfoView` 的销售方式一致

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：98dea9b7-0496-43cc-8f46-c865905aa071

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "entrust_detail_dict_fix",
  "source_extraction_id": "ad219bd3153445a1967d7e62570af761",
  "version": 1,
  "memory_type": "entities"
}
-->