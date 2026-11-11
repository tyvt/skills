# 门户H5登录失败刷新图形验证码
门户H5(src/pages/login-design/index.vue)的登录接口失败时，submit()现在会刷新图形验证码。

## 问题背景
- 原 submit()（登录）的 catch 仅弹错误 toast，finally 仅重置 loading，未刷新验证码
- sendSmsCode() 的 finally 早已在失败时刷新验证码，行为不一致

## 解决方案
- 在 src/pages/login-design/index.vue 的 submit() 的 catch 分支调用 void refreshCaptcha()
- 与 sendSmsCode() 行为一致：获取短信失败或登录提交失败（含密码模式「接口未开放」）均刷新验证码
- 仅捕获真实接口/appLoginAction 抛出的失败；客户端校验（如「手机号格式错误」）在 try 之前 return，不触发刷新

## 构建与部署
- 修改后执行 npm run build:h5，新 dist 写入 D:/repository/门户H5/dist
- nginx 站点 门户H5.conf 的 root 指向该 dist，服务地址 http://localhost:8091/
- 用户需硬刷新（Ctrl+F5）加载新包

## 验证与归属
- 构建 exit 0，已修复并重新构建完成
- 涉及文件：src/pages/login-design/index.vue
- 所属项目：门户H5；来源会话：2026-11-11；代码基线：none

<!-- MEMORY_FIELDS
{
  "peer_id": "D--repository---H5",
  "category": "技术模式",
  "name": "login_captcha_refresh",
  "source_extraction_id": "e7b69d45ce8946b59dac5c8e16a3dc26",
  "version": 1,
  "memory_type": "entities"
}
-->