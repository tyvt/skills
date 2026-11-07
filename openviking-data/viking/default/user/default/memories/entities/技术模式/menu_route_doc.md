# 菜单路由文档对齐精简
产品2.0 前端菜单文档已按路由数据核对并精简，未改动任何代码。

## 主要调整
- 一级菜单名称改为路由实际标题（如「经营资产管理」「用款申请」）
- 表格增加 `路由 name`、`路由 path`、`组件` 三列，与菜单 JSON 一致
- 公示管理/业主表决直接写实际路由，去掉错误 wrapper 路径描述

## 删除与修正
- 删除公共辅助接口单独章节、重复前端改动清单、过长后端说明
- 「用款管理」修正为菜单实际「用款申请」（`PubUseMoneyApply`）
- 「资金缴款」对应 `PubPaymentNotice`，监管协议版本标注不涉及本次改造

## 验证与归属
- 文档从约175行压缩到约90行，按路由一级菜单分组
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：`benefit/pubHouse/index.vue`、`mixins/area.js`、`pubCommunityBook/index.vue`、`pubMerchantNumber/index.vue` 等
- 来源会话：f9cc4363-b407-4d06-9b68-1db9634d7833；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "menu_route_doc",
  "source_extraction_id": "b7c4512054fb4b70bf552a713aed3145",
  "version": 1,
  "memory_type": "entities"
}
-->