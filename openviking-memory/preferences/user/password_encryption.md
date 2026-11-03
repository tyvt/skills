- 修改密码相关接口不可传明文，必须在 API 层统一加密后再发请求。
- 禁止依赖全局 window.CryptoJS 加密：Vite dev 下全局脚本与业务模块加载顺序不保证 CryptoJS 已挂载，会静默失败或退化为明文。
- 正确做法：用 npm 包 crypto-js 在模块内 import；api/system/profile.js 新增 updateProfilePwd，所有改密入口（个人中心、顶部改密弹窗、强制改密弹窗）均改调该 API，避免页面各自加密。
- 验证标准：重启 dev 并硬刷新，在 Network 确认密码字段为密文（如 Base64 形态），不能只看「能否改成功」。
- 适用项目：惠山二期G；涉及文件：zhi2-web-admin/src/api/system/profile.js、zhi2-web-admin/src/views/system/user/profile、zhi2-web-admin/src/views/login.vue、zhi2-web-admin/src/api/index.js。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "password_encryption",
  "source_extraction_id": "d24a5ccb2658402b9453ac1bed06c24b",
  "version": 2,
  "memory_type": "preferences"
}
-->