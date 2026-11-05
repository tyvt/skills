# 登录密码加密恢复
产品2.0 的 zhi2-web-admin 已恢复登录密码 AES-CBC 加密传输，用户登录与机构登录均使用密文。

## 修复内容
- 新增 src/utils/passwordEncrypt.js 封装 AES-CBC 加密逻辑，与历史实现及 index.html 中全局 CryptoJS 一致
- 修改 src/views/login.vue，引入 encryptPassword，在 handleLogin 登录前加密密码
- 加密参数：Key 为 A-16-Byte-keyValA-16-Byte-keyVal，IV 为 A-16-Byte-String，模式 AES-CBC + PKCS7
- /security/auth/userLogin 和 /security/auth/companyLogin 的 password 字段为 Base64 密文

## 涉及文件与归属
- 涉及文件：src/utils/passwordEncrypt.js、index.html、src/views/login.vue
- 所属项目：产品2.0；来源会话：c77f4406-8fd7-4cd0-b97f-9bc57e4e5db2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_encrypt_restore",
  "source_extraction_id": "0d97247c6f304cc4a9cc4f1e6b453cb7",
  "version": 1,
  "memory_type": "entities"
}
-->