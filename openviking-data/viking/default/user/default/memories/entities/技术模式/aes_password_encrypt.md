# 登录密码前端AES加密
登录密码前端用 CryptoJS AES(CBC+Pkcs7) 加密后再 POST 登录接口，避免明文传输。

## 加密方式
- 使用 CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })。
- key/iv 均为 16 字节 UTF8 字符串。

## 调用方式
- 加密后的密文与 username 一起 POST /security/auth/login。

## 验证与归属
- 验证证据：009.md 会话 57a3b1cf（同 key/iv 对密码 AES CBC Pkcs7 加密）。
- 涉及文件：assets/views/login.vue。
- 来源会话ID：57a3b1cf-b607-468e-83dd-7ccaf9007a47；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "aes_password_encrypt",
  "source_extraction_id": "e9498e5ec3134785bc60d5eca40d3bd0",
  "version": 1,
  "memory_type": "entities"
}
-->