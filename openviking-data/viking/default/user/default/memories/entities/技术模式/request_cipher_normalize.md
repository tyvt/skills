# 密文格式校正守卫使JSEncrypt解密不再返回null
靖江物管G 的 request 层在密文传输或格式异常时调用 JSEncrypt.decrypt() 会返回 null，需在 normalizeCipherText() 中校正密文格式。

## 问题根因
- 传输中 `+` 被转成空格或 `%2B`，URL-safe Base64 未转标准（含 `-`/`_`）
- 密文尾部 `=` 填充缺失导致 Base64 解码异常
- 后端密钥对不一致，或采用 RSA-OAEP（JSEncrypt 仅支持 PKCS1 v1.5）使 decrypt() 返回 null

## 解决方案
- normalizeCipherText() 增补 decodeURIComponent 还原传输编码
- 空白还原为 `+`，将 `-`/`_` 映射回 `+`/`/`
- 自动补齐 `=` 至 4 的倍数，校正密文格式后再解密

## 验证与归属
- 验证证据：extracted source=cursor project=靖江物管G
- 验证证据：src=靖江物管G/001.md
- 涉及文件：src/request/index.js、src/utils/request.js
- 所属项目：靖江物管G；来源会话：6b27025b-cc03-4bb5-ab31-083c121c2826

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "request_cipher_normalize",
  "source_extraction_id": "07fb09c462ea44bd8382c5fb50834270",
  "version": 1,
  "memory_type": "entities"
}
-->