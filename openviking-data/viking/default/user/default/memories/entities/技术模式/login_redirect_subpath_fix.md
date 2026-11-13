# 苏住房登录重定向子路径修复
苏住房前端测试环境登录后 window.location.replace('/') 硬编码根路径，导致部署在 /test 子路径时跳转到无 test 的另一项目。

## 问题根因
- 测试环境地址 https://szf.szzfcjj.cn/test 登录成功后 window.location.replace('/') 导航到站点根 /，丢失 /test 子路径，跳转到 https://szf.szzfcjj.cn（另一项目）
- 该 replace('/') 最初为修复 bug6540（消除 pathname 残留 /login 导致图片破损）而引入，假设各环境 nginx 均在根路径提供 SPA 入口
- 涉及 5 处硬编码根路径导航：login.vue:516、LoginForm.vue:200 与 218、companyLogin.vue:198、api/index.js:16（window.location.href = '/#/login'）
- 路由器为 hash 模式，测试环境实际地址为 https://szf.szzfcjj.cn/test/#/login，pathname 为 /test/

## 修复内容
- 新增 src/utils/appBase.js，导出 getAppBasePath()（基于 window.location.pathname 按扩展名判断目录，非 .html 视为目录并补 /，镜像生产 getAssetResolveBase 逻辑）及 redirectToAppRoot()、redirectToLogin() 辅助函数
- 5 处导航点统一改为调用 redirectToAppRoot() / redirectToLogin()，保留 /test/ 子路径
- 边界校验：/test 与 /test/ 均返回 /test/；用纯 Node 断言脚本验证路径边界（项目无单测框架）
- 不改动生产 getAssetResolveBase()，仅新增独立工具，避免回归 bug6540

## 验证与归属
- ESLint：新增文件与 3 个 SFC 文件零错误；api/index.js 的 8 处错误为既有问题（GET/POST 函数分号），非本次引入
- 构建：vite build 后台执行，截至 2026-11-13 会话结束未见 dist 产出，需复核
- 所属项目：苏住房前端（zhi2-web-admin）；来源会话：gitlab.zhi.com peer 会话 2026-11-13

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_redirect_subpath_fix",
  "source_extraction_id": "1f53f2178c274a27aab89136e3fec394",
  "version": 1,
  "memory_type": "entities"
}
-->