# 登录密码加密恢复约定
登录页密码加密被整段删除后需恢复，AES-CBC 的 Key/IV/模式必须与历史 bug43754 版本逐字节一致，复用全局 CryptoJS。

## 问题现象
- 登录页（用户登录 /security/auth/userLogin 与机构登录 /security/auth/companyLogin）密码加密被某次提交整段去掉，密码明文提交
- 需按历史实现恢复，但不能恢复成另一个版本的参数

## 根因分析
- 加密参数是前后端私有硬约定：Key=`A-16-Byte-keyValA-16-Byte-keyVal`、IV=`A-16-Byte-String`、AES-CBC + PKCS7，后端只按这套解密
- 任何改随机 IV / 换 Key 长度都会让登录直接失败
- 加密依赖 index.html 全局引入的 CryptoJS，另装 crypto-js 或改用 WebCrypto 会引入不一致实现

## 解决方案
- 新增独立工具 src/utils/passwordEncrypt.js 封装 encryptPassword()（复用全局 CryptoJS）
- login.vue 在 handleLogin 里对 password 先加密再提交，用户登录与机构登录两条分支都传密文
- 恢复前先用 git log -S/-L 追到具体提交，确认参数与 bug43754 一致再动手
- 验证方式：登录页抓包看两接口 password 字段是否为 Base64 密文而非明文

## 验证与归属
- 会话 c77f4406 结论：新增 passwordEncrypt.js 封装 AES-CBC，login.vue 两分支均传密文，参数与 bug43754 一致
- 涉及文件：utils/passwordEncrypt.js、views/login.vue、index.html
- 所属项目：产品2.0；来源会话：c77f4406-8fd7-4cd0-b97f-9bc57e4e5db2；代码基线：dfe69d6

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "login_pwd_encrypt",
  "source_extraction_id": "4a0d09f28e58446e8eec2d811704c187",
  "version": 1,
  "memory_type": "entities"
}
-->