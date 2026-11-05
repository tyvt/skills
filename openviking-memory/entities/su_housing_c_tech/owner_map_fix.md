
# 小区信息页地图显示不全修复
苏住房C小程序小区信息页地图因内联 style 字符串被忽略而压成细线，已修复。

## 问题根因
- 小区信息页（pages_owner/project/info/index.vue）地图通过 inline style 字符串设 height: 240rpx
- ZsMap 组件只合并 object 类型的 attrs.style，字符串形式被忽略后高度回退默认 100%
- 父容器无固定高度，地图被压成一条细线（仅见腾讯地图 logo 缝隙）

## 修复内容
- 参照 newHouse/detail.vue 用固定高度 .map-container 包裹 ZsMap，外层容器设 height: 240rpx
- 去掉无效的 inline style，让 ZsMap 正常接收高度

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：pages_owner/project/info/index.vue、ZsMap.vue、newHouse/detail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：fc3995fc-3653-441b-9537-8ac6acc697e9
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "owner_map_fix",
  "source_extraction_id": "82af7a5679844eb3b2da51f4435a7f0c",
  "version": 1,
  "memory_type": "entities"
}
-->