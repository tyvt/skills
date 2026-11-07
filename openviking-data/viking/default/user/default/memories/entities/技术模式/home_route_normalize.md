# 侧栏首页路径归一与精确匹配
苏住房G项目侧栏「首页」报错未授权及高亮错乱，需统一首页路径为 /index 且菜单仅精确匹配。

## 现象
- 点侧栏首页提示「页面未授权或不存在」
- 修复后首页不高亮，或切到别的菜单首页仍高亮

## 根因
- 后端菜单首页 path 写法不一，路由守卫兜底、侧栏跳转、首页识别函数各自比较字符串口径不一致
- getLinkProps 用 canonicalizeHomePath 使 router-link 指向 /index，但 isItemActive/checkActiveByPath/hasActiveRoute 仍用未归一的 fullMenuPath（如 /index/home）与 $route.path（/index）比较，永不相等致不高亮（会话 ea05a521）
- E2E 只断言 Tab 数量，未覆盖侧栏 active 样式，测试全绿也发现不了
- isHomeMenuRoute 仅按子菜单 path 段判定、不校验父级链，若后端在 /system 下配 path:'index' 会把 /system/index 错链到 /index；需补「完整路径为 /index、/index/home 或在 /index 树下」约束
- permission.js 的 rewriteRoutes 过了 stripDuplicateHomeRoutes，而 sidebarRoutes 仍对原始 sdata 过滤，侧栏仍出现两个首页项，两处须用同一份去重
- 内层叶子菜单 handleClick 直接 $router.push(menuItem.path)，未拼父路径也未 canonical，需补全

## 解决方案
- 抽公共归一函数 homeRoute，把首页统一成 /index，在一级叶子菜单点击、路由守卫兜底、首页识别三处共用
- 侧栏高亮比较时对当前路由同样归一；首页菜单只允许精确匹配，避免 /index/xxx 同级误高亮
- 把「当前路径」与「菜单完整路径」都灌进同一个 canonicalizeHomePath 再比较，或 getSidebarActivePath 对门户首页路径统一 canonical 且与 homeRoute.js 同源
- 补 isHomeMenuRoute 完整路径约束；sidebarRoutes 与 rewriteRoutes 用同一去重；handleClick 补全父路径并 canonical

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：进入首页高亮、切走后不再高亮
- 涉及文件：router/index.js、utils/homeRoute.js、utils/permission.js、store、layout/components/Sidebar/RecursiveMenu.vue
- 所属项目：苏住房G；来源会话 cb0377ba-165d-4411-88e0-da19021618ab（基线 c17e4d8）；补充会话 ea05a521-a616-40d9-b860-3870b34a52ab（基线 db4f82c）指出高亮根因

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_route_normalize",
  "source_extraction_id": "12244aba6c2143ed925def5f8c54b8d0",
  "version": 3,
  "memory_type": "entities"
}
-->