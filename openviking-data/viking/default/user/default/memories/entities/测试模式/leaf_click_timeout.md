# 侧栏叶子点击超时遮挡
登录后批量点 sidebar-leaf-menu 时，Playwright 报 element not stable 或 subtree intercepts pointer events，用例超时。

## 现象
- 报「项目管理/宗地管理 … subtree intercepts pointer events」，视频里只点了一部分菜单。
- 折叠面板展开/动画中，同级或其它层级的目录标题覆盖目标 `<a>` 可点击区域。

## 根因
- 未完全展开或滚动到位时强行 click 会无限重试。
- Element 折叠面板展开/动画过程中标题覆盖目标链接。

## 解决方案
- 每个父级目录先显式展开并 waitFor 子菜单链接 visible。
- 点击前 scrollIntoViewIfNeeded；必要时限定在当前 menu-collapse-wrapper 内或更窄定位，或短暂等待动画结束。
- 全量遍历按「顶栏切换 → 侧栏父级展开 → 直接子叶子 → 嵌套父级」顺序，不一次性 locator('.sidebar-leaf').first() 扫全局。

## 涉及信息
- 涉及文件：zhi2-web-admin/tests/e2e/navbar-sidebar-accessibility.spec.js
- 所属项目：2-0；来源会话：fe1c5dc1-f6ad-4637-84a8-bda2ca44dffb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "测试模式",
  "name": "leaf_click_timeout",
  "source_extraction_id": "1001facf978947c0afeaf5611beb1e05",
  "version": 1,
  "memory_type": "entities"
}
-->