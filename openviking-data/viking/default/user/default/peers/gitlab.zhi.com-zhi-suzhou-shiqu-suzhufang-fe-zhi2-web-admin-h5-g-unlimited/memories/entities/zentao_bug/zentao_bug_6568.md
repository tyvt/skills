# 禅道 Bug 6568
禅道缺陷 6568：首页双晒公示「点进度」进入列表应只显示已晒（已发布）公示，修复于 2026-11-13。

## Description
- product=42; project=141; execution=142; openedBy=lichandan; type=codeerror。
- 行点击链路：SunshinePanel row-click → index-v2.vue openSunshineRegion → msg/publicNotice/index。

## Resolution
- 根因：跳转只带区域参数（complexId/parentDeptId/areaCode），未带发布状态过滤。
- 修复：openSunshineRegion params 增加 publishState='1'（publish_state 字典 0=未发布/1=已发布/2=已撤回，已晒=已发布）。
- status=active→resolved; resolution=fixed; resolvedBy=tiany; resolvedBuild=trunk; assignedTo=lichandan; zt_action id 92809。
- 子模块提交 7f4869b71 已推送；父仓 gitlink 32f345d6 已推送（rebase 时 gitlink 冲突按后代提交解决）。

## Verification
- eslint 退出码 0；vite 构建 225s 退出码 0，version.json gitHash=7f4869b71 与 HEAD 一致；页面联调未执行（本地站点未启动）。

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->