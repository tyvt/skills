# 地图概览重复 computed 修复
园区物管2.0 修复 mapOverview 因重复 computed 键覆盖导致悬停弹窗报错的问题，并规范 computed 书写。

## 问题原因
- `index.vue` 写了两个 `computed` 对象，JS 对象重复键后者覆盖前者
- `districtStatsByName` 被 `threeAssetsMax` 顶掉，变为 undefined
- 鼠标移入执行 `this.districtStatsByName['锡山区']` 报错，弹窗无法显示

## 解决方案
- 将 `districtStatsByName` 与 `threeAssetsMax` 合并进同一个 `computed`
- 悬停弹窗恢复正常

## 编码规范
- 以后新增 computed 只保留一个 `computed: { ... }`，内部并列多个属性

## 涉及信息
- 涉及文件：src/views/benefit/mapOverview/index.vue、src/views/property/largeScreen/index.vue
- 所属项目：园区物管2.0；来源会话：15514253-88df-4a75-b299-5e0fcb7ba067；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_overview_computed",
  "source_extraction_id": "9b2ff210e04c406b95120c0b33048de0",
  "version": 1,
  "memory_type": "entities"
}
-->