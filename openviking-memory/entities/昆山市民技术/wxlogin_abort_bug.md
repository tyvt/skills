# 微信登录并发互打断致请求中止
昆山市民 `wxLogin.js` 的 `getInfoByCode` 接口偶报 `Request aborted`，根因多为并发登录请求互相打断。

## 问题根因
- `src/utils/wxLogin.js` 中 `getInfoByCode` 接口报 `MiniProgramError: Request aborted`
- 属微信登录请求被中途取消
- 最常见原因为重复触发登录流程，并发请求互相打断

## 验证与归属
- 来源会话ID：abc57820-2b35-4849-8e23-0d665121c69f
- 代码基线：none
- 涉及文件：src/utils/wxLogin.js、src/api/modules/estate.js、src/request/index.js、src/App.vue、src/pages_vote/vote/index.vue、src/env/mp.js、src/pages_home/home.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "wxlogin_abort_bug",
  "source_extraction_id": "1e221c0770bc474fb2d32abe42a88d10",
  "version": 1,
  "memory_type": "entities"
}
-->