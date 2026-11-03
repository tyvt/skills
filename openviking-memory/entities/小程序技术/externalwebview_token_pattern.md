# externalWebview 向 H5 传 token 不传 loginCode
门户 externalWebview 登录链路按实名状态分流壳页与 web-view，已实名才传 token 给 H5 且不传 loginCode。

## 登录分流
- 未登录：展示设计稿门户壳（背景走 static/images/zhishu/，如 login-bg@2x）；登录弹窗内嵌原 pages/home/login 授权 UI，手机号走微信 getPhoneNumber 授权而非纯文案「同意授权」
- 已登录未实名：仍显示门户/引导壳，不加载业务 H5
- 已登录且已实名：展示 `<web-view>`，向 H5 传递 token，不要再传 loginCode（避免 H5 旧 code 换票逻辑与小程序票不一致）

## 弹窗迁移
- 登录弹窗从独立页迁入壳页，点击「登录」再打开弹层，避免首页与登录页双份状态

## 验证与归属
- 验证证据：「登录后如果判断用户未实名认证，显示设计图页面。如果已实名认证，显示web-view，同时不要给web-view传递loginCode参数，改为传递token」
- 涉及文件：pages/webview/externalWebview.vue、pages/home/login/index.vue、static/images/zhishu/login-bg@2x.png
- 所属项目：小程序；来源会话ID：0931abc6-673c-4efb-91bc-d74159322efb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "externalwebview_token_pattern",
  "source_extraction_id": "2b34d842ccf94a47b62d912a34a3a9c0",
  "version": 1,
  "memory_type": "entities"
}
-->