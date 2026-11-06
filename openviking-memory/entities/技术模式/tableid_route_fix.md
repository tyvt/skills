# 信息报送路由 tableid 拼写修复
苏州市房地产监测V3 修复「信息报送备案 / 信息报送变更」详情菜单因路由动态段拼写错误导致查看页路由错位的问题。

## 问题根因
- 后端路由把动态段写成 `:tableld`（少了 `i`），而前端 `buildDetailNavigation` 只识别 `:tableid`
- 「新增」走 `列表路径/add` 正常；「查看」误判为「无 tableid 的命名路由」，只带 `query`、不带主键路径，导致路由错位、侧边栏匹配失败、页面空白

## 修改内容
- `permission.js`：加载菜单时把 `:tableld` 统一纠正为 `:tableid`（含 `sessionStorage` 缓存的路由）
- `ruoyi.js`：路径规范化同样处理该拼写错误
- `路由信息.json`：本地参考数据已改为 `:tableid`（线上仍应在系统菜单里改库）
- 验证：重新登录（或清掉 `sessionStorage` 里的 `routers`）后，在列表点「查看」应进入 `…/InformationPush/{id}`

## 涉及文件
- permission.js
- ruoyi.js
- 路由信息.json

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：27799520-77e6-4e97-a27b-0e20a371490f
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tableid_route_fix",
  "source_extraction_id": "c72fc439f52742fe91d274aac0ac08bc",
  "version": 1,
  "memory_type": "entities"
}
-->