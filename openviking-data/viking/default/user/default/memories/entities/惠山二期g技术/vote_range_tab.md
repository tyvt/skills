# 表决决策范围楼幢表视图Tab处理
惠山二期G zhi2-web-admin 表决模块在新增决策范围时移除楼盘表视图Tab，直接展示所有楼幢房屋列表便于核对。

## 改动概述
- BuildingTableViewTabs.vue 新增 showBuildingTableTab 属性（默认 true），为 false 时不渲染 Tab 栏只显示列表视图
- 表决 6 页（option/multiply/general/repair/election/preparatoryApply）传 :show-building-table-tab="false" 且 viewMode 默认 list

## 选择逻辑
- decisionRangeBuildingSelectMixins.js 新增 flattenAllBuildingsHouses() 汇总所有楼幢（含已选幢）房屋
- onListSelectionChange 写回全部楼幢原始数据并刷新勾选缓存，跨幢与切换幢勾选记忆保留
- mixin 新增 buildingSelectRevision watch 同步列表勾选状态
- repair 页列表补单户勾选框与 syncListSelection，其余 5 页本已有列表勾选框

## 验证与归属
- 验证：npm run build 通过，nginx 本地部署 index.html 返回 200
- 提交：子模块 zhi2-web-admin develop/v2.6.2-huishan 提交 daf1a2956；父仓库 惠山二期G 提交 886820f
- 禅道：zt_task 2035 status=done，finishedBy=tiany，finishedDate=2026-11-03
- 所属项目：惠山二期G；来源会话：2026-11-03 任务会话；代码基线：develop/v2.6.2-huishan

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "vote_range_tab",
  "source_extraction_id": "96d9dae62b1243c99008f3397606128d",
  "version": 1,
  "memory_type": "entities"
}
-->