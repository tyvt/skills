# 前后端RSA密钥不匹配诊断
园区公共收益项目前端解密失败的根因诊断：服务端公钥与前端私钥不是同一 RSA 密钥对。

## 关键结论
- 服务端 ResponseEncryptAdvice 用配置里的 publicKey 加密 AES 密钥
- 前端必须用与之配对的私钥解密
- 用户提供的 publicKey（以 ...mz+ZERo954InwR6dd2QZ... 开头）与 privateKey（以 ...CqHF0snnQAbzV9lCVSYw... 开头）不是同一密钥对
- 用与 publicKey 配对的私钥解密才能成功

## 验证方式
- 用 Node.js 验证两把密钥是否配对，结果：否
- 服务端用 publicKey 加密 → 用用户给的 privateKey 解密：失败
- 用与 publicKey 配对的私钥解密：成功

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 所属项目：园区公共收益；来源会话：546d781a-5f68-46d0-9e05-4f2817562b38；代码基线：none
- 涉及文件：utils/responseDecrypt.js、env/.env、jsencrypt

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "rsa_key_mismatch",
  "source_extraction_id": "4b566ffdc76e457fbb659ffa7cef0027",
  "version": 1,
  "memory_type": "entities"
}
-->