# 新房列表页搜索区被遮挡修复
苏住房C小程序新房相关列表页因 z-paging 默认固定层遮挡搜索区，已移入 #top 插槽修复。

## 问题根因
- z-paging 默认 fixed=true 以全屏固定层渲染，外部搜索框、导航图标、筛选条件被列表层覆盖

## 修复内容
- 将搜索、导航（户型集锦/最新楼盘/在售楼盘/两智一全）、筛选移入 z-paging 的 #top 插槽，固定在列表滚动区域上方
- 仅楼盘列表在下方滚动，顶部功能区保持固定

## 涉及文件与归属
- 涉及文件：newHouse/index.vue、newHouse/indexMore.vue、newHouse/houseTypeList.vue、goodProject/index.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：671da04e-7711-4f45-b4cb-a4bcab90d503；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "newhouse_zpaging_fix",
  "source_extraction_id": "f9a8a8092b644e0e884293a518ae4796",
  "version": 1,
  "memory_type": "entities"
}
-->