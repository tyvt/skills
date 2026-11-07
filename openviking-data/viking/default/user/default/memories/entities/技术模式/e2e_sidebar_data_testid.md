# E2E 侧边栏菜单定位改用 data-testid
产品2.0前端为 RecursiveMenu.vue 增加 data-testid，E2E 测试仅用 testid 与文本定位，摆脱 class 选择器。

## 组件改动
- 根节点 `menu-item` 加 `data-testid="sidebar-menu-item"`
- 可展开子菜单容器加 `data-testid="sidebar-submenu"`
- 叶子链接加 `data-testid="sidebar-leaf-link"`

## 测试改动
- 不再使用 `parent.evaluate()` 与 class 选择器收集子项
- 不再使用 `page.locator('a[href="..."]').first` 等依赖样式的定位
- 仅用 data-testid + 标题文本点击展开父级

## 涉及文件
- 组件侧：`RecursiveMenu.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 所属项目：2-0（园区物管2.0）
- 来源会话：80e7c3dd-abcf-4d74-acdd-8c8eca3b6dcc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_sidebar_data_testid",
  "source_extraction_id": "d84370698f6d4f08927a749b5ae08557",
  "version": 1,
  "memory_type": "entities"
}
-->