# 修改密码AES加密统一
登录页与各修改密码入口统一使用AES-ECB加密密码，避免明文传输。

## 问题背景
- 登录页 login.vue 已用 CryptoJS.AES 加密用户名和密码
- 修改密码接口 /system/profile/updatePwd 原传明文
- 三处入口未加密：ChangePasswordDialog/index.vue、ResetPwdDialog.vue、resetPwd.vue

## 修复方案
- 新增公共加密工具 zhi2-web-admin/src/utils/crypto.js，抽取AES-ECB逻辑供复用
- 三处修改密码提交前对 oldPwd、newPwd 执行 encrypt()
- 登录页复用同一工具，避免两套加密逻辑不一致

## 验证与归属
- 验证证据：extracted source=cursor project=淮安存量房
- 验证：浏览器开发者工具查看 PUT /system/profile/updatePwd 请求体应为密文
- 涉及文件：login.vue、ChangePasswordDialog/index.vue、ResetPwdDialog.vue、resetPwd.vue、utils/crypto.js
- 所属项目：淮安存量房；来源会话：2ae66b52-1268-4c4b-a528-017626d542ca；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pwd_aes_util",
  "source_extraction_id": "73aa677d5dcc4c69894037c8c069e86e",
  "version": 1,
  "memory_type": "entities"
}
-->