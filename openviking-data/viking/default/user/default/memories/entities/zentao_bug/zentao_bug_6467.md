# ZenTao Bug 6467
禅道缺陷 6467：惠山物管表决模块选择户室时页面卡死，楼幢筛选一直加载中、点击无响应。

## Description
- 模块路径 `autonomy/ownerdecision/general`（一般表决详情 → 选择户室弹窗），弹窗组件 `DecisionRangeTable.vue` 复用 `zs-select-dialog`。
- 现象：选择户室时页面卡死；楼幢筛选一直「加载中」，点击无响应。

## Root Cause
- 提交 `adbd25a2f`（#2035）回归：「选择户室」列表视图数据源从仅当前楼幢改为汇总所有楼幢全部房屋（flattenAllBuildingsHouses）。
- 扁平化结果依赖勾选版本号；惠山二期楼幢/户数多时，每次勾选/加载都 O(全部楼幢×房屋) 重算并深拷贝对象、重建全量勾选缓存，主线程阻塞致卡死。
- `onListSelectionChange` 用当前页覆盖其它页勾选，还会清空跨页选择。

## Fix
- 重构共享混入 `decisionRangeBuildingSelectMixins.js`（option/multiply/general/repair 等 6 个表决页共用）。
- 新增 `treeDataVersion`，仅在树加载/切换楼幢时自增并按版本缓存扁平化结果（勾选变化不再触发全量重扁平化）。
- `onListSelectionChange` 仅更新当前页房屋勾选（按 houseId 增量）。
- `refreshBuildingCheckCache` 仅刷新受影响楼幢；保留 #2035「多楼幢汇总、跨楼幢勾选记忆、可提交」功能不变。

## Verification & Resolution
- `npx eslint` 通过；生产构建成功（version 2.6.1，buildTime 2026-11-11 14:04:44，gitHash daf1a2956，分支 develop/v2.6.2-huishan）。
- 本地 nginx 新增站点 http://127.0.0.1:8119（root D:/repository/惠山二期G/dist，监听 8119，代理 huishan dev 网关），首页与全部 JS/CSS 资源均 200；交互式 E2E 未执行（无 huishan 后端登录态）。
- 禅道回写：zt_bug 6467 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhoudongdong（退回报告人）、resolvedBuild=trunk；zt_action 91037（resolved/fixed）已事务提交并复核落库。
- 改动落于 D:/repository/惠山二期G/zhi2-web-admin 子目录（仅 decisionRangeBuildingSelectMixins.js 为实际改动；public/version.json 为构建产物按规范不提交）。惠山二期G 是 zhi2-web-admin 的惠山物管专项部署分支（区别于门户部署 D:/repository/门户/zhi2-web-admin），代理地址 huishan.wuxi.dev.zhi.com。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6467",
  "source_extraction_id": "6f72dc685eb64f608f5f0aaabe1d5bc3",
  "version": 1,
  "memory_type": "entities"
}
-->