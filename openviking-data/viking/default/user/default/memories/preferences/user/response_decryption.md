---
audit_status: valid
last_checked: 2026-11-28T00:19:07+08:00
verdict_note: responseDecrypt.js 存在且含 expand.encrypt/jsencrypt；request.js 命中 responseDecrypt 与 returnRawResponse
---
- 参考 `develop/v2.6.1-yuanqu` 分支新增 `src/utils/responseDecrypt.js`，实现 `expand.encrypt` 响应解密（RSA 解密 AES 密钥、AES/CBC 解密正文）。
- 在 `src/utils/request.js` 响应拦截器 `returnRawResponse` 判断前插入解密逻辑。
- 依赖 `jsencrypt@^3.3.2`，`index.html` 已引 `crypto-js.min.js`。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "response_decryption",
  "source_extraction_id": "b2ccd8c8a7544a0a964a644555f9bb44",
  "version": 1,
  "memory_type": "preferences"
}
-->