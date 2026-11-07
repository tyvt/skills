# 三方登录中转页token解码报错
江阴H5 三方登录中转页从 URL 读取 token 后经 decodeURIComponent 解码，脏值会抛 URIError 导致白屏。

## 代码位置
- src/main.ts 第 26 行：`const initToken = getQueryParam('token')`，三方登录带 ?token=xxx 跳入时读取并存入 userStore
- src/utils/url.ts 第 12 行：`queryParams[decodeURIComponent(key)] = decodeURIComponent(value)`，解码无 try/catch
- src/http/interceptor.ts 第 52 行：`token = getQueryParam('token') || ''`，也走到 url.ts 解码
- getQueryParams() 在 createApp() 同步执行最前面，抛错即中断 createApp 导致白屏

## 报错机制
- token 含孤立 `%`（如 `%`、`%E4`、`%zz`）或未转义特殊字符二次编码时抛 `URIError: URI malformed`
- 三方系统拼回调 URL 未对 token 做 encodeURIComponent 或二次编码会出现 `%` 未闭合
- 报错表现为中转页白屏，vConsole 红色 error 栈落在 uni 路由 URL 编解码 replace/encodeParam 区

## 登录页现状
- src/pages/login/index.vue 已改为账号密码+图形验证码表单（phone/password/imageCode），onLoad 仅调 refreshCaptcha()
- 该页不读取任何 URL 参数，密码表单为中转兜底 UI；最新提交 0b1614c「fix(login): 替换密码登录接口并接入图形验证码」
- 业务登录页不读 URL，但全局仍残留对 token 的 URL 读取（main.ts 与 interceptor.ts）

## 修复建议
- 最小改动：给 src/utils/url.ts 的 decodeURIComponent 包 try/catch 降级为原值
- 排查时可在 vConsole command 输入 `decodeURIComponent(location.search)` 验证，或贴出完整 URL 逐段扫非法 `%` 序列

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-wuxi-jiangyin-benefit-fe-zhi2-mobile-shimin-h5-c-unlimited",
  "category": "技术模式",
  "name": "login_token_decode",
  "source_extraction_id": "27d572e1d43a4544826efeb0c0711395",
  "version": 1,
  "memory_type": "entities"
}
-->