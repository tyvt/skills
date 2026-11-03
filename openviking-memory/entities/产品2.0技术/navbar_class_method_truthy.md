# 模板 :class 绑定方法引用恒为 truthy 致首页永远高亮
Navbar.vue 把 methods 里的方法直接绑到 :class，函数引用恒 truthy，导致首页永远高亮、其他模块永不高亮的静默视觉错误。

## 问题现象
- 顶部导航「永远默认选中首页」，点其他子模块也不高亮
- isActive() 里 if (this.isHomeActive) return false 恒成立，其他模块高亮分支永远走不到

## 根因分析
- Navbar.vue 中 isHomeActive 定义在 methods，模板写成 :class="{ active: isHomeActive }" 绑定的是函数引用本身
- 任何函数引用都是 truthy，故「首页」恒 active；与已知「computed 写成方法简写导致构建失败」同族但表现不同，此处不报错

## 解决方案
- 将 isHomeActive 改为 computed 属性，让模板与 isActive() 读到真实布尔
- 补 syncActiveMenuFromRoute 按当前路由匹配一级模块，路由监听加 immediate: true，刷新或直访子页面 URL 也能回填高亮
- 凡「某状态恒真/恒假且无报错」，先查模板绑的是方法名还是计算属性

## 验证与归属
- 来源会话 428cfc70：函数引用恒 truthy 修复为 computed + syncActiveMenuFromRoute + immediate watcher
- 涉及文件：layout/components/Navbar.vue、layout/components/TagsView/index.vue
- 所属项目：产品2.0；代码基线：8e16dca

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "navbar_class_method_truthy",
  "source_extraction_id": "d6fff46e82c345f0a1fd71b1f6da4fd9",
  "version": 1,
  "memory_type": "entities"
}
-->