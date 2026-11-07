# 卡片图片底部形态前缀条showTypePrefix
苏找房二手房卡片图片底部「二手 | 📍 区域名」前缀条由showTypePrefix控制，需同时落地prop、模板渲染、列表页数据映射三段。

## 需求与现象
- 苏找房二手房卡片要在图片底部显示「二手 | 📍 区域名」前置说明条
- 父组件Project_Suzhufang已传show-type-prefix但卡片上什么都没出现——只有开关没有渲染实现，开关空转

## 展示约定
- 图片容器底部叠绝对定位前缀条：「形态文字(二手/新房/租房) + 竖线 + 定位图标 + 地址文字」
- 渲染由showTypePrefix prop单独控制，默认关，仅苏找房这类需区分形态的入口才开
- 地址文字取值口径固定为「中介房源优先agentCompanyName，个人房源回退regionName」，不要反过来
- 同一容器「热」推荐标用独立showHot prop控制，避免与形态前缀抢角落
- 列表页负责把regionName/agentCompanyName映射到卡片数据，卡片本身不做字段兼容

## 要点与验证
- 新增展示开关必须同时落地「prop→模板渲染→列表页数据映射」三段，只传prop不实现渲染是最常见的静默无效
- 来源会话：2259f4fa；代码基线：5f0f4dc
- 涉及文件：houseCard.vue、stockHouse/index.vue、Project_Suzhufang.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "housecard_showtypeprefix",
  "source_extraction_id": "bc2e17ccbf314a70a51b2c2bf67c360f",
  "version": 1,
  "memory_type": "entities"
}
-->