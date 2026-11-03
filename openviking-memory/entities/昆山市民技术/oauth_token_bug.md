# 实名成功后 getOauthInfoByIdNumber 缺 accessToken 会静默清空登录态
昆山市民小程序实名流程因无条件 setToken 可能将已有 token 写为 undefined，导致后续接口 401。

## 问题背景
- `src/pages/verifyUser/index.vue` 人脸成功只 `setUserInfo(faceRes.data)`，不写 token。
- `refreshUserAndHouse()` 在 redirect 之后后台调用 `getOauthInfoByIdNumber` 并无条件 `setToken(userRes.data.accessToken)`。
- 若 200 但无 `accessToken`，会把 `wx.login`→`getInfoByCode` 已有 token 写成 `undefined`，请求拦截器不再带 Authorization，后续接口 401 而实名流程表面已成功。
- `initMyHouseInfo` 只校验 `idNumber` 仍会执行。

## 加固建议
- 仅当 `accessToken` 存在时再 `setToken`。
- 或失败时保留原 token 并提示刷新。

## 验证与归属
- 验证：会话 e7a59e5a 用户问接口不返回 token 会怎样，结论梳理调用链与 setToken(undefined) 隐蔽后果。
- 涉及文件：src/pages/verifyUser/index.vue、src/stores/user.js、src/request/index.js。
- 所属项目：昆山市民；代码基线：818bf9b；来源会话ID：e7a59e5a-613e-404d-ab23-37e8863e3fcf。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "oauth_token_bug",
  "source_extraction_id": "a9d0b2ccfd0f4c0fac517d664707e5c5",
  "version": 1,
  "memory_type": "entities"
}
-->