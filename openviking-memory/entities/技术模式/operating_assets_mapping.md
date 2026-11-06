# 运营资产统计Tab资产类型映射修复
修复 benefit/statisticsMap/operatingAssets.vue 中两个 Tab 因分类 key 不一致导致资产类型映射错位的问题。

## 问题根因
- 物业用房及经营用房、公共场地 两个 Tab 受分类 key 不一致影响
- 明细表"资产类别"分组错误归到默认类型

## 解决方案
- mapHouseType() 新增 poker→棋牌室、property→物业用房及 club/day_care/other 等别名
- mapVenueType() 新增 food→生鲜柜及 express_station/delivery/booth 等别名

## 涉及文件
- zhi2-web-admin/src/views/benefit/statisticsMap/operatingAssets.vue
- zhi2-web-admin/src/constant/map.js
- zhi2-web-admin/src/views/benefit/statisticsMap/mock.js
- zhi2-web-admin/src/api/benefit/pubAssetLease.js

## 验证与归属
- 来源会话：60c21339-ecb3-44a0-9019-c7bfbc324ce4
- 所属项目：产品2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "operating_assets_mapping",
  "source_extraction_id": "b09225a3568c454faf9481dce0c632cd",
  "version": 1,
  "memory_type": "entities"
}
-->