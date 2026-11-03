# 顶栏首页高亮方法引用陷阱
产品2.0 Web 后台 Navbar.vue 中 isHomeActive 方法在模板与方法内部均被当属性引用（漏写括号），导致首页永远高亮、其他模块恒不高亮的布尔判断失效。

## 问题现象
- 顶栏导航（首页+模块 Tab）无论选中哪个子菜单，首页永远高亮，其他模块永不高亮
- 改动 isHomeActive 相关逻辑无任何变化，布尔判断「恒真/恒假且怎么改都不变」

## 根因
- Navbar.vue 模板 `:class="{ active: isHomeActive }"` 漏写调用括号，JS 里函数引用恒为 truthy，首页因此永远 active
- isActive(path) 内部 `if (this.isHomeActive) return false` 同样没调用方法，被 truthy 短路后各模块 Tab 恒返回 false
- 两处是同一个笔误的两种表现

## 解决方案
- 模板上方法必须带调用括号 `isHomeActive()`
- 方法内部互查也要写成 `this.isHomeActive()`
- 排查技巧：布尔判断「恒真/恒假且怎么改都不变」时，先 grep 模板里该方法有没有漏写 ()

## 验证与归属
- 验证证据：会话 2128505f 调查结论，模板第 94 行与 isActive 第 581 行均未加 () 调用
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue
- 所属项目：产品2.0；来源会话ID：2128505f-8e3c-45e5-8ca0-aa7871402fb0；代码基线：39e3114

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_home_active_truthy",
  "source_extraction_id": "643fcefaa41f48a5a04312521a319012",
  "version": 1,
  "memory_type": "entities"
}
-->