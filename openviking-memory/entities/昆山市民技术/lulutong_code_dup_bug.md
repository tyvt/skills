# 鹿路通 code 重复调用修复
昆山市民小程序鹿路通登录因多处调用 loginWithWxCode 且 URL code 每次被读取，导致 /llt/getInfoByCode 重复请求，已修复。

## 问题原因
- App.vue 的 onShow、home.vue 的 onLoad 等多处调用 loginWithWxCode()
- URL 中 code 每次都被读取，导致 /llt/getInfoByCode 被重复请求

## 修复策略（wxLogin.js）
- 请求去重：用 loginPromise 合并并发调用，App.vue 与 home.vue 同时触发只发一次
- 已有 token 则跳过：H5 已登录直接返回本地用户信息，不再调接口并清除 URL 中 code
- code 一次性使用：登录成功记本地存储并标记已用，history.replaceState 移除 URL code 参数
- 已使用 code 拦截：检测到 code 已消费直接拒绝不再请求

## 验证与归属
- 来源会话ID：438b59b9-1f57-49a0-a674-06c5f58fdd8f
- 代码基线：none
- 验证证据：extracted source=cursor project=昆山市民
- 涉及文件：App.vue、home.vue、wxLogin.js


<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "lulutong_code_dup_bug",
  "source_extraction_id": "cd2cbfa87b0543bc8dc543511d49c208",
  "version": 1,
  "memory_type": "entities"
}
-->