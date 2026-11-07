# 待办跳转壳菜单组件误判
苏住房G 待办跳转因 flattenTree 将 Layout 壳组件写入 meta.filePath，导致单菜单时打开空壳而非真实详情页。
## 问题根因
- flattenTree 把壳组件名（Layout/ParentView）写进 meta.filePath，getRouteFilePath 将其当有效页面路径返回。
- 当 busCode 只配一个菜单时，resolveTodoTaskNavigation 走 resolveRegisteredRoute 的 name 解析，用 {name:'Property11/:tableid', params} 打开路由，其 component 为 Layout，导致空壳，storedPath 被忽略。
- 用户补充判据：菜单项 component 是默认 Layout 也算匹配失败。
## 解决方案
- ruoyi.js 新增 SHELL_MENU_COMPONENTS = ['Layout','ParentView','InnerLink','InnerLink/index']，与 store/modules/permission.js 一致。
- getRouteFilePath 遇到壳组件一律返回 ''，使 hint 匹配与 filePath 查找不再命中 Layout。
- resolveTodoTaskNavigation 在 resolveRegisteredRoute 前后加 isMenuShellRoute 判定，命中且有 storedPath 则直接 { path: storedPath, query:{ formMode:'view' } }。
- 边界：仅懒加载函数+无 meta.filePath 的真实详情页仍可走 name 解析；只有壳组件强制回退 storedPath。
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证证据：会话 f1c7af59 用户给出 Property11/:tableid 且 component:"Layout" 真实菜单 JSON 并指出「components 是默认的 layout，这种也算匹配失败的」。
- 涉及文件：d:\repository\苏住房G\zhi2-web-admin\src\utils\ruoyi.js、src\store\modules\permission.js、src\views\flowable\todo.vue、src\views\home\v2\components\TodoPanel.vue
- 所属项目：苏住房G；来源会话ID：f1c7af59-850a-422f-aaa3-9169cf16f750；代码基线：db4f82c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_shell_menu",
  "source_extraction_id": "9af2f036baf34743bd6ba71eed958267",
  "version": 1,
  "memory_type": "entities"
}
-->