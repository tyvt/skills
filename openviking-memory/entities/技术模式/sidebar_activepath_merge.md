# sidebar_activepath_merge
苏房侧栏高亮归并：activePath 只改「当前路径」不改「菜单路径」，精确/前缀两种匹配语义不能混用。

## 场景与做法
- 让详情页、按来源拆分的列表页（rectificationNotice detail0/detail1、rectificationNotice1/2 等）在侧栏高亮唯一「整改通知书」菜单。
- utils/sidebarActivePath.js 导出 getSidebarActivePath(route) 返回归一后菜单路径，由 layout/components/Sidebar/RecursiveMenu.vue 的 activePath computed 消费，经 matchMenuPath 判定。

## 关键约束
- matchMenuPath 判定为「归一当前路径 === 归一菜单路径」或「当前路径 startsWith(菜单路径 + '/')」双分支，语义不同：等式管本节点，前缀管子路由。
- 归一函数只能动「当前侧」取值，绝不能把菜单侧/菜单项自身 path 也归一，否则前缀分支误判导致「菜单不亮」。
- 归一后路径必须返回已注册菜单路径（getCurrentRouterByFilePath 按 meta.filePath 从路由表反查），排除 :tableid 等动态段并去尾部斜杠，统一 canonicalizeHomePath 做首页别名收敛，避免 /index/home 误判。
- RecursiveMenu 是递归组件，activePath 是顶层 computed，改一处对所有层级生效，勿逐层改。

## 验证与涉及
- 验证：会话 a19337fd（基线 315702f）审查指出 getSidebarActivePath 导出后全库无消费方；仓库 HEAD ee0d915a7 最终解法：src/utils/sidebarActivePath.js 导出，RecursiveMenu.vue:66 import、:105 activePath 消费，matchMenuPath(:364-390) 双分支，canonicalizeHomePath(isHomeMenuRoute) 首页特判短路。
- 涉及文件：zhi2-web-admin/src/utils/sidebarActivePath.js、zhi2-web-admin/src/layout/components/Sidebar/RecursiveMenu.vue、zhi2-web-admin/src/utils/homeRoute.js、zhi2-web-admin/src/utils/ruoyi.js
- 所属项目：苏住房G；来源会话：a19337fd-e97d-478d-a10f-deee6d572a15；代码基线：315702f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sidebar_activepath_merge",
  "source_extraction_id": "3a85eaede4c4445db42f39130147b4c2",
  "version": 1,
  "memory_type": "entities"
}
-->