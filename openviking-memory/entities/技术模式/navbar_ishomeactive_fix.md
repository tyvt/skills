# Navbar isHomeActive 误用修复
产品2.0 的 zhi2-web-admin 中修复顶部导航「首页」永远高亮、子菜单不高亮的问题。

## 问题根因
- `Navbar.vue` 中 `isHomeActive` 是 methods 方法，但模板和 `isActive()` 把它当作属性使用（未加 `()`）
- 函数引用恒为 truthy，导致「首页」永远带 active 样式
- 各模块 `isActive()` 被 `if (this.isHomeActive) return false` 短路，永远返回 false

## 修复内容
- 将 `isHomeActive` 改为 computed 属性，模板和 `isActive()` 都能正确读取布尔值
- 新增 `syncActiveMenuFromRoute` 方法，根据当前路由自动匹配对应的一级模块
- 路由监听增加 `immediate: true`，页面刷新或直接访问子页面时也能正确高亮

## 预期效果
- 访问 `/index` → 高亮「首页」
- 访问 `/to-C/authentication/ctUserIdentityApply` 等子模块 → 高亮对应父级模块（如「维修资金」），「首页」不再高亮

## 涉及文件
- d:/repository/产品2.0/zhi2-web-admin/src/layout/components/Navbar.vue
- d:/repository/产品2.0/zhi2-web-admin/src/layout/components/TagsView/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/layout/index.vue
- d:/repository/产品2.0/zhi2-web-admin/src/settings.js

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0；来源会话：2128505f-8e3c-45e5-8ca0-aa7871402fb0、428cfc70-782c-4061-9b59-52d8ce8ccbd5；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_isHomeActive_fix",
  "source_extraction_id": "8a43c32a273941439109c1eae5f6e5e3",
  "version": 2,
  "memory_type": "entities"
}
-->