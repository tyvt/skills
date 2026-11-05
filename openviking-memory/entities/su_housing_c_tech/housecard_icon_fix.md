# houseCard 定位图标布局修复
苏住房C 的 houseCard 卡片底部地址栏定位图标在双列窄卡片中被压缩消失，已通过补充 flex-shrink:0 修复。

## 问题原因
- 地址栏为 flex 布局，新房 | 前缀设 flex-shrink: 0，但定位图标 .orientation 未设置
- 双列窄卡片里图标被压缩到 0 宽度，只显示「新房 | 高新区」而看不到图标

## 修复方式
- 在 houseCard.vue 中为 .orientation 补上 flex-shrink: 0（width: 9px; height: 10px; margin-right: 5px）
- 该组件用于苏找房页「推荐 / 新房 / 二手房」三个 Tab，修复后三列表均正常显示白色定位图标

## 涉及文件
- zhi2-mobile-shimin/src/components/commonNew/houseCard.vue
- zhi2-mobile-shimin/src/pages/index/components/Project_Suzhufang.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：61371a3a-6a5f-4dcd-a98f-26224110a6a9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "housecard_icon_fix",
  "source_extraction_id": "e97a61b113eb4bd1b76ab8df3477a9d8",
  "version": 1,
  "memory_type": "entities"
}
-->