# 新房详情页周边地图不显示修复
苏住房C小程序新房详情页「项目周边」地图不显示的问题已修复，根因包含地图高度为0、初始化时机不对和图标路径错误。

## 问题根因
- manifest.json 中 mergeVirtualHostAttributes: false，写在 ZsMap 上的 height 样式不会传到内部 map，组件内只有 height:100%，父级无高度时地图区域塌缩
- 整页用 v-show="showPage" 控制显示，地图在隐藏状态下初始化，微信小程序里容易不渲染
- facilityCategory 使用了 /pages_transaction/static/icon/.. 路径，resolveStaticUrl 解析后变成重复路径，图标加载失败

## 修复内容
- ZsMap.vue 新增 height prop，用 inheritAttrs: false 把高度直接绑到 map 上
- detail.vue 显式引入 ZsMap，用 map-container 固定 200px 高度
- 有经纬度且页面显示后再 v-if 挂载地图
- 修正 markers 赋值逻辑，经纬度转为 Number

## 涉及文件与归属
- 涉及文件：manifest.js、ZsMap.vue、detail.vue、transaction.js
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：f0892537-a924-473d-9d3b-16bf6d6ea239；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_map_fix",
  "source_extraction_id": "62aa14aed6054f559c50f3eb85d9fa1b",
  "version": 1,
  "memory_type": "entities"
}
-->
