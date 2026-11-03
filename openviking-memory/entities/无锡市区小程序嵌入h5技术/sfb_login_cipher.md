# 苏服办深链sfbLogin密文前端不解密
苏服办入口通过 location 传入 AES-ECB+Base64 密文的 name/idType/idNumber/phone，前端原样 POST 给后端，不做解密。

## 接口与约定
- `performSfbLoginIfNeeded` 从 URL/query 取出四字段原样 POST `/v2.0/security/ctAuth/sfbLogin`（或项目 security 层等价路径）
- 前端不做 AES 解密，曾误建 sfbCrypto.js 已删除；解密与明文校验一律在后端
- 联调示例 body 字段值仍为带 `==`/`=` 的 Base64 密文，而非张三/明文证件号

## 鉴权区分
- URL 上的 `token` 是苏服办侧 token（人脸识别等 SDK 用）
- 接口返回的 `accessToken` 才是后续业务 API 写在 header 的内部 token
- 苏服办入口不要把 URL 密文写入 userStore 当展示名，登录成功后走 `refreshProfileFromApi` 拉用户信息

## 密文加号解码陷阱
- `URLSearchParams`（以及按 application/x-www-form-urlencoded 规则解析 query）会把 `+` 当作空格解码
- 密文如 `phone=A+A7Pil3SsG9LSUe8q8mVw==` 会变成带空格的字符串，后端解密必然失败
- 上游若未把 + 编码为 `%2B`，问题在 H5 侧必然复现；易被误判为「token 无效」或「接口挂了」
- 在读取密文参数后统一做空格还原为 `+`（`restoreBase64Plus`：`value.replace(/ /g, '+')`），苏服办登录路径对 name/idType/idNumber/phone 全部应用
- 规范侧应要求拼 URL 时用 `%2B`；H5 端还原作为兜底，验证用含 + 的真实跳转链接对比还原前后密文长度与解密结果

## 验证与归属
- 验证证据：会话 8a10b942 用户明确「不需要解密啊，都是后端解密，url拿到什么就传什么」；会话1d789cb5用户给含+的unlimited测试URL，结论为URLSearchParams将+解码为空格破坏Base64，在h5Context.js增加restoreBase64Plus并在performSfbLoginIfNeeded对四个密文字段应用
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/h5Context.js、src/api/security.js、src/store/user.js、src/App.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：8a10b942-72e3-49f5-b5b6-415b24f7c1ec、1d789cb5-e259-4d57-ada7-dfb786d89609；代码基线：37bd5a1、3fb9434

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_login_cipher",
  "source_extraction_id": "99c310e4881245c0b2a8af204733867b",
  "version": 2,
  "memory_type": "entities"
}
-->