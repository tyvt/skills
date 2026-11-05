# 中转页写死option致401死循环修复
江阴H5 中转登录页 login.vue 写死失效的 TEST_LOGIN_OPTION，且 http.ts 将 401 重定向到中转页自身，形成无限循环。

## 问题根因
- src/pages/login.vue 第53行写死 TEST_LOGIN_OPTION，完全不读 URL 里的真实 option（三方登录传入的被忽略）
- src/http/http.ts 中 401 → uni.redirectTo('/pages/login')，而 /pages/login 正是中转页 login.vue 本身 → 401 时原地自跳
- 每次 vue-router replace 都 console.error，形成满屏红色栈（是结果不是死循环代码 bug）
- 实测：用写死的 option 请求 loginByUid 后端返回 401（option 已失效）

## 修复方案
- src/pages/login.vue：优先 getQueryParam('option') 读三方登录真实 option，读不到回退测试值；登录失败/无 token 统一回落账号密码登录页 /pages/login/index，绝不回流本页
- src/http/http.ts：401 重定向目标由 /pages/login 改为 /pages/login/index；登录类接口（loginByUid/ctAuth）的 401 不再自动重定向，交由调用方处理；加 redirectingLogin 防重入；httpFile 同步修正
- src/utils/url.ts：decodeURIComponent 用 safeDecode 包裹，脏 % 参数不再抛 URIError 中断 createApp（防白屏兜底）

## 验证与归属
- 验证：构建 DONE Build complete；本地 nginx 站点「江阴智慧物业H5」(8102) reload 后实测 200，新 chunk 下发
- 涉及文件：src/pages/login.vue、src/http/http.ts、src/utils/url.ts
- Git：worktree D:epository\江阴H5-wt-login-fix，分支 fix/login-option-loop，提交 fed0fe5；--no-ff 合并 main（43dacd3）；推送 origin/main（00a1826..43dacd3）
- 所属项目：江阴H5；来源会话：2026-11-05；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_option_loop_fix",
  "source_extraction_id": "6208b41bb18d450f81a0c2117001922c",
  "version": 1,
  "memory_type": "entities"
}
-->