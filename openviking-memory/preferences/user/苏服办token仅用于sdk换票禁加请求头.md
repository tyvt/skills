- 苏服办入口 URL 的 `token` 仅用于 SDK 与登录换票，不得写入 `userStore` 以免 `api/index.js` 拦截器统一加 `Authorization` 头到业务接口
- `api/index.js` 拦截器需判断苏服办入口不添加 Authorization 头
- `h5Context.js` 新增 `clearSfbTokenIfStored()` 清除误存的 token
- `usePortal.js` 初始化清 token 并走 `sfbLogin` 换内部 `accessToken`
- `sfbFaceAuth.js` 人脸识别仅用 URL 上的 token
- 涉及文件：h5Context.js、api/index.js、usePortal.js、App.vue、store/user.js、utils/portal.js、sfbFaceAuth.js、api/security.js
- 验证：src=无锡市区小程序嵌入H5/013.md；来源会话 d5e17de9-b54b-41c7-804d-32a7473aa185

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "苏服办token仅用于SDK换票禁加请求头",
  "source_extraction_id": "b743329be02845368645a88e947afc1c",
  "version": 1,
  "memory_type": "preferences"
}
-->