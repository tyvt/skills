# 侧边栏自定义 RecursiveMenu 组件
园区物管2.0 的侧边栏是自定义递归组件 RecursiveMenu，缩进靠 level prop + paddingLeft 实现，与 el-menu 无关。

## 现象
- 排查侧边栏子菜单缩进/层级问题时，按 RuoYi 经典结构找 el-menu / SidebarItem / el-submenu 必然找不到病灶。
- 全仓库仅 element-ui 静态 CSS 里还有 el-menu 样式。

## 根因
- 缩进完全不依赖 el-menu 的 indent/default-openeds，而是 RecursiveMenu.vue 内部实现。

## 解决方案
- 入口 Sidebar/index.vue 遍历 sidebarRouters，每项从 level=1 起。
- RecursiveMenu.vue 用 level prop + 内联 paddingLeft：目录节点 paddingLeft = 24 + (level-1)*18，叶子节点 = 父组件的 paddingLeft + 18（用父级 computed，非 24+level*18），子目录递归传 :level="level+1"。
- 菜单管理页（system/menu）用 zs-table 树表懒加载，缩进走 Element 树表默认机制。
- 改缩进/层级逻辑只动 RecursiveMenu.vue；菜单 JSON 深嵌套 + ParentView 展平时核对 level 传递是否断链。

## E2E 测试方案
- Playwright 点击不要用 `.menu-item`/`evaluate` 收集子项或全页 `a[href]`（易点到其他目录同名叶子或展开后旧 locator 卡死）
- 组件加 data-testid：`sidebar-menu-item`（菜单块）、`sidebar-submenu`（展开子区）、`sidebar-leaf-link`（叶子链接）
- 测试用父级标题文本定位对应 `sidebar-menu-item`，等待块内 `sidebar-submenu` 可见后，对该块内所有 `sidebar-leaf-link` 按 `.nth(j)` 顺序点击；只传标题字符串，不持有展开前的 parent 引用
- 验证：会话 80e7c3dd E2E 与手工 DOM 顺序不一致、点「项目管理」卡住，回退点击逻辑改动后采用 testid 方案；涉及文件 RecursiveMenu.vue；所属项目 2-0；来源会话 80e7c3dd-abcf-4d74-acdd-8c8eca3b6dcc

## 涉及信息
- 涉及文件：zhi2-web-admin/src/layout/components/Sidebar/index.vue、zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue。
- 所属项目：园区物管2.0；来源会话：b096fe20-ff70-474d-bf2b-1e39449b1ce9；代码基线：f101dd464。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sidebar_recursive_menu",
  "source_extraction_id": "96994393a37c46d59cb68b2dd4ca2698",
  "version": 2,
  "memory_type": "entities"
}
-->