# 产品2.0 路由 404 全局拦截约定
产品2.0 后台在 router.beforeEach 中统一拦截 to.path==='/404'，改为消息提醒而非渲染 404 页。

## 背景与问题
- 原用通配路由 { path: '*', redirect: '/404' } 处理未匹配地址，用户要求不进 404 页。
- 通配重定向在 beforeEach 之后，仅守卫判断通配会漏掉显式 push('/404') 场景。
- 直接渲染 404 页体验差且丢失来源上下文。

## 解决方案
- 在 router.beforeEach 开头（handleExternalToken 之后、登录态处理之后）拦截 to.path === '/404'。
- 有上一跳有效匹配时 next({ path: from.fullPath, replace: true }) 留在原页并抹掉无效历史。
- 首次打开即非法地址时 next({ path: '/index', replace: true }) 回首页并 Message.warning 提示。
- /404 路由配置保留不删，避免影响其他引用，但实际不再渲染。

## 验证与归属
- 验证证据：会话 4ccb79cb 用户要求全局拦截跳 404 改为消息提醒，方案写入 router/index.js。
- 涉及文件：zhi2-web-admin/src/router/index.js。
- 所属项目：产品2.0；来源会话ID：4ccb79cb-b7a0-47a0-8d7a-1873a520064f；代码基线：6b9d9d7（2026-05-08）。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "router_404_global_intercept",
  "source_extraction_id": "d5c590fa365f4509a81c129f2975f534",
  "version": 1,
  "memory_type": "entities"
}
-->