# 苏找房二手房个人中介定位标志缺失修复
苏住房C苏找房二手房卡片缺少「个人/中介/定位」标志的问题已修复，根因含徽章显示条件、前缀拆分与数据映射缺失。

## 问题根因
- `houseCard`仅在`type`为空时显示徽章，二手房列表传`type="stock"`致徽章被跳过
- `Project_Suzhufang`已传`show-type-prefix`，组件未按设计拆分展示「二手 | 📍 区域/中介名」
- 二手房列表未映射`publishRole`、`agentCompanyName`到卡片字段

## 修复内容
- `houseCard.vue`：`type="stock"`时也显示发布角色徽章（个人蓝、中介橙），实现`showTypePrefix`底部显示「二手 |」+定位图标+地址，中介优先`agentCompanyName`个人显`regionName`，支持`showHot`热标
- `Project_Suzhufang.vue`：补充`regionName`、`agentCompanyName`映射
- `stockHouse/index.vue`：补充`publishUserType`、`agentCompanyName`映射

## 涉及文件与归属
- 涉及文件：`houseCard.vue`、`Project_Suzhufang.vue`、`stockHouse/index.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：2259f4fa-0848-4e14-8c96-c105c4a664e3；代码基线none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "stock_badge_fix",
  "source_extraction_id": "bc0083fed0b94cb88a7ca161c3df36e9",
  "version": 1,
  "memory_type": "entities"
}
-->
