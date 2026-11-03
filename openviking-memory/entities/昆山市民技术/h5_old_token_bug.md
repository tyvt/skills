# H5复用旧token因登录短路与persist
昆山市民H5复用旧token导致请求带旧凭证的bug根因与修复记录。

## 问题根因
- `user` store `persist` 缓存 token
- `src/utils/wxLogin.js` 的 `loginWithWxCode` 遇 token 短路返回
- 页面 `onLoad` 抢先发请求带旧 token

## 修复方案
- 移除短路逻辑，强制调 `getInfoByCode` 换新 token
- 业务请求延至登录完成

## 验证与归属
- 验证证据：src=昆山市民/005.md
- 涉及文件：src/stores/user.js、src/utils/wxLogin.js、src/App.vue、src/api/index.js、src/request/index.js、src/main.js、src/pages_home/home.vue、src/pages_vote/vote/votedetail.vue
- 所属项目：昆山市民；来源会话ID：5879f04f-c762-41db-942c-5ca6acb2e3ce；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "h5_old_token_bug",
  "source_extraction_id": "caaa6f50daa5490bae09d3487c3ef499",
  "version": 1,
  "memory_type": "entities"
}
-->