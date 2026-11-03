# 小程序动态import编译成字符串致store为undefined
苏住房C分包改造时把静态import的store改动态import，uni-app编译到mp-weixin后变成路径字符串，解构出undefined。

## 问题现象
- 分包改造中将 `import menuStore from '@/store/menu'` 改为 `const { default: menuStore } = await import('@/store/menu')`。
- 运行时报 `TypeError: Cannot read property 'loadMenu' of undefined`（栈顶 utils/tabBar.js），目标文件 @/store/menu.js 明明存在。

## 根因
- uni-app 编译到 mp-weixin 时，动态 import() 不返回模块对象，而是被编译成路径字符串，形如 `const { default: menuStore } = "./store/menu.js"`。
- 对字符串解构 default 得 undefined，后续调用全崩；错误仅运行时暴露，编译阶段静默，易被误判成store文件丢失或tabBar逻辑错。

## 解决方案
- 小程序端同一模块被多页共用、对体积敏感的场景，不要用动态 import 做懒加载。
- 减小主包体积靠分包目录 + componentPlaceholder 异步化组件 + 把重资源（ECharts、图标）物理迁进分包，而非改导入方式。
- 发现「解构出来是undefined但文件存在」时，第一时间读编译产物dist里那一行，看import是否变成字符串字面量。

## 验证与归属
- 验证：会话 160a40f4（2026-08-24）用户贴微信开发者工具报错，定位「分包」提交把menuStore改动态import、编译成字符串，改回静态import后恢复。
- 涉及文件：src/utils/tabBar.js、src/store/menu.js
- 所属项目：苏住房C；来源会话ID：160a40f4-daed-4e76-ae44-e7c0120d9b6f；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "dynamic_import_string",
  "source_extraction_id": "fb3a64033c064976b834d788539c9914",
  "version": 1,
  "memory_type": "entities"
}
-->