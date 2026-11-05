# 嵌套侧栏E2E叶子过滤
在 zhi2-web-admin 的 navbar-sidebar-accessibility E2E 用例中，Playwright 的 getByTestId 默认匹配所有后代，导致嵌套目录误点深层叶子。

## 现象
- 两层目录（如「规约管理 > 管理规约 > 管理规约拟定」）下，父层直接点到深层叶子，或子菜单顺序与页面不符。
- 街道/社区/小区、物业管理区域等被误判无子菜单；物业管理区域子菜单顺序与页面不符。

## 根因
- Playwright locator.getByTestId 匹配所有后代而非仅直接子节点。
- submenu.getByTestId('sidebar-menu-item') 会把更深层目录算进来，递归展开状态错乱。

## 解决方案
- 精简重写 `clickLeafMenusUnderParent`：去掉基于 index/href 的跨上下文数据结构，DOM 侧仅统计当前目录下 `.menu-collapse-wrapper .sub-menu a` 的 `<a>` 子菜单数量。
- Playwright 侧用 `.locator('.menu-collapse-wrapper .sub-menu a').nth(i)` 按顺序点击每个子菜单。
- 点击后短暂等待并调用 `assertMainContentNotBlank`；断言失败仅记录到 `uiErrorRecords` 不阻塞后续菜单。
- 每个子菜单点击用 `try/catch` 包裹，异常仅记日志，避免整个目录卡死。
- 早期方案曾用 `sidebar-leaf-link` 的 `closest` 过滤直接子级（避免 getByTestId 捞深层后代），现简化为上述最小可靠版本。

## 涉及信息
- 涉及文件：zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js
- 所属项目：2-0；来源会话：97cb886a-e67c-42b6-8516-f9591fa85219；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "sidebar_leaf_filter",
  "source_extraction_id": "eec1849560e54b0ab2f531caec03b1b3",
  "version": 2,
  "memory_type": "entities"
}
-->