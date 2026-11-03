# 列表页导入入口依赖导入子菜单路由
列表页「导入」按钮因后台未配导入子菜单，getRouterPathByFilePath 反查失败抛「没有找到路由」，需探测式跳转加 embedded 内嵌兜底。

## 问题根因
- getRouterPathByFilePath 语义是「按 meta.filePath 在后台下发菜单里反查路由，查不到就 throw」
- 导入页通常只在前端注册了 component，后台菜单只配列表菜单、没配导入子菜单，反查必然失败
- 报错链路：zs-button → ListOperationButtonContainer → 各模块 components/index.vue，栈顶 ruoyi.js
- 这类报错不是权限问题，而是「页面存在但入口菜单不存在」的配置缺口

## 解决方案
- 单一列表页改用 getCurrentRouterByFilePath 拿路由对象（无命中返回 null 不抛错），有则 router.push，无则不跳转
- 复用做法：入口先探测路由，命中跳独立导入页，未命中把同一导入组件以 embedded 模式在列表页内嵌打开
- 确需可收藏独立页时，让运维补隐藏子菜单：component 填 property/spFeeBill/service/import，path 填 import/:tableid，是否隐藏填「是」
- 跳转类按钮不要用会 throw 的解析函数做前置条件，要么换非抛错版本，要么 try/catch 后回落内嵌

## 验证与归属
- 来源会话 69de9222（基线 526c1ff）：用户点「账单导入」报 Error: 没有找到路由，修复为探测 + embedded 内嵌
- 涉及文件：zhi2-web-admin/src/utils/ruoyi.js、src/views/property/spFeeBill/components/index.vue、service/index.vue、src/components/ListOperationButtonContainer/index.vue
- 所属项目：产品2.0；代码基线：526c1ff

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "import_route_fix",
  "source_extraction_id": "8bfe7b9f72d7470eae3c3aa21cb9be36",
  "version": 1,
  "memory_type": "entities"
}
-->