
# 修改密码AES加密修复
泰兴小程序修改密码页补上明文密码的 AES 加密步骤，解决后端 BCryptPasswordEncoder 报 rawPassword cannot be null。

## 问题原因
- 报错 rawPassword cannot be null 来自 Spring Security 的 BCryptPasswordEncoder，后端加密时收到 null。
- 小程序修改密码页直接提交明文密码，但服务端要求先 AES 加密再传输（与登录接口一致）。
- Web 管理端 zhi2-web-admin 的 resetPwd.vue 用 encryptPassword 加密后提交，实现正确。

## 修复内容
- 在 src/staff/pages/profile/change-password.vue 提交前对原密码、新密码调用 encryptPassword（与登录页一致）。
- 重新编译后测试：填写原密码、新密码、确认密码。

## 验证与归属
- 验证：extracted source=cursor session=10888bdc-54d2-4048-989f-b70f9519c3dc
- 涉及文件：d:/repository/泰兴小程序/src/staff/pages/profile/change-password.vue、src/staff/api/security.js、src/staff/api/index.js、src/staff/utils/passwordEncrypt.js、d:/repository/泰兴G/zhi2-web-admin/src/views/system/user/profile/resetPwd.vue
- 所属项目：泰兴小程序；来源会话：10888bdc-54d2-4048-989f-b70f9519c3dc；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rawpassword_aes_fix",
  "source_extraction_id": "930aeb202b4947b390d651ba7a9adf06",
  "version": 1,
  "memory_type": "entities"
}
-->