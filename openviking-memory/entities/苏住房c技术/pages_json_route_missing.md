# navigateTo 报 page not found：vue 在但 pages.json 路由被删
苏住房C 小程序多处跳转报页面不存在，根因是 pages.json 路由注册被删而 .vue 文件仍在，与 H5 直觉相反。

## 问题现象
- 多处跳转报 errMsg: 'navigateTo:fail page `/pages/login/index` is not found'
- src/pages/login/index.vue 文件存在、代码未删，却无法跳转

## 根因
- pages.json 中对应 4 个页面注册被删（commit 61febf6 统一苏服办登录流程移除）
- 项目仍大量代码 navigateTo('/pages/login/index')；uni-app 路由以 pages.json 为准，文件存在不影响运行时

## 解决方案
- 报 page not found 先 grep pages.json 有无路径注册，再确认 .vue 是否存在，勿反向
- 恢复时整条链路补回：login/index、login/forget、login/password、login/success 四注册缺一不可
- 删/改 pages.json 路由前全仓 grep 路径字符串确认无调用方；改完必须重新编译

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话 17b77da9（基线 db06361）：用户贴报错并要求恢复，补回 4 个路由注册
- 涉及文件：src/pages.json、src/pages/login/index.vue
- 所属项目：苏住房C；来源会话ID：17b77da9-0fa5-4835-918b-0363e0ec5bf1

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "pages_json_route_missing",
  "source_extraction_id": "c383dd4637e24cfe83f7be5dd47bdfb2",
  "version": 1,
  "memory_type": "entities"
}
-->