# 鹿路通 H5 登录 code 一次性去重 Bug
昆物通嵌入鹿路通后 H5 登录 code 一次性与并发重复调用的根因与四类去重策略。

## 问题根因
- H5 入口 URL 形如 `.../wyzx?code=xxx#/`，登录走 `POST /estate/weChatOauth/llt/getInfoByCode?code=`，返回结构与微信登录一致
- 须 `#ifdef H5` 走鹿路通、`#ifdef MP-WEIXIN` 保留原小程序登录
- `code` 只能使用一次，但 `App.vue` 的 `onShow` 与 `home.vue` 的 `onLoad` 等多处并发调 `loginWithWxCode()`，重复读 URL 会二次请求报错

## 去重策略
- `src/utils/wxLogin.js` 约定模块级 `loginPromise` 合并并发
- 已有持久化 token 则直接返回并 `history.replaceState` 去掉 `code`
- 成功后将 code 标记已用（本地存储），拦截已消费 code
- 登录成功后从地址栏移除 `code` 参数

## 验证与归属
- 所属项目：昆山市民；代码基线：1e46691
- 来源会话ID：438b59b9-1f57-49a0-a674-06c5f58fdd8f
- 涉及文件：src/utils/wxLogin.js、src/App.vue、src/pages_home/home.vue、src/api/modules/estate.js、src/pages_home/personal.vue、src/utils/vconsole.js、src/utils/index.js、src/main.js、src/api/modules/user.js

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "llt_h5_login_code",
  "source_extraction_id": "fee3af51cb1141ce92e38b088ebd441e",
  "version": 2,
  "memory_type": "entities"
}
-->