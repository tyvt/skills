# 嵌套侧栏E2E叶子过滤
在 zhi2-web-admin 的 navbar-sidebar-accessibility E2E 用例中，Playwright 的 getByTestId 默认匹配所有后代，导致嵌套目录误点深层叶子。

## 现象
- 两层目录（如「规约管理 > 管理规约 > 管理规约拟定」）下，父层直接点到深层叶子，或子菜单顺序与页面不符。
- 街道/社区/小区、物业管理区域等被误判无子菜单；物业管理区域子菜单顺序与页面不符。

## 根因
- Playwright locator.getByTestId 匹配所有后代而非仅直接子节点。
- submenu.getByTestId('sidebar-menu-item') 会把更深层目录算进来，递归展开状态错乱。

## 解决方案
- 叶子只点满足 `leaf.closest('[data-testid="sidebar-menu-item"]') === 当前 menuItem` 的 sidebar-leaf-link。
- 嵌套目录只递归「其 sidebar-menu-item 祖先链上紧邻父级就是当前目录」的项。
- 菜单顺序以 DOM 实际出现顺序为准，不做 index/href 跨上下文排序；日志带面包屑便于对照。

## 涉及信息
- 涉及文件：zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js
- 所属项目：2-0；来源会话：97cb886a-e67c-42b6-8516-f9591fa85219；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "sidebar_leaf_filter",
  "source_extraction_id": "1001facf978947c0afeaf5611beb1e05",
  "version": 1,
  "memory_type": "entities"
}
-->