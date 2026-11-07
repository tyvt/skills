
# 新房详情页周边图标绑定报错修复
苏住房C新房详情页「项目周边」区域因 facilityCategory 未初始化导致图标绑定报错，已修复。

## 问题根因
- 页面根节点用 v-show="showPage"，即使为 false 模板表达式仍执行，报错不被阻断
- facilityCategory 初始值为空数组，onLoad 里才赋值，首屏渲染时 facilityCategory[0] 为 undefined，访问 .icon 报错

## 修复内容
- 在 data() 中直接用导入的配置初始化 facilityCategory，不再等 onLoad
- 模板里对 .icon 使用可选链 ?.，避免边界情况再次报错

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：newHouse/detail.vue、transaction.js、stockHouse/detail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：7f29f06a-70ca-4db2-9199-e681d3284e78
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_icon_fix",
  "source_extraction_id": "82af7a5679844eb3b2da51f4435a7f0c",
  "version": 1,
  "memory_type": "entities"
}
-->