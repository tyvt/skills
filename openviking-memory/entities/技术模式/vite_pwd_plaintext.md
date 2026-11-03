# Vite dev 改密仍明文：window.CryptoJS 时序未就绪
惠山二期G 项目中，Vite 开发模式下改密接口因全局 CryptoJS 未就绪而退化为明文传输的缺陷与修复方案。

## 现象
- 本地 Vite dev 调 system/profile/updatePwd，Network 中 oldPassword/newPassword 仍为明文，用户误以为未加密
- 打包或部分环境可能正常，具有时序偶发性

## 根因
- 改密走 encryptPassword 读全局 window.CryptoJS
- Vite 开发模式全局脚本与业务模块加载顺序不保证 CryptoJS 已挂载，加密静默失败或退化为明文
- 与 index.html 漏引 CryptoJS 导致 undefined 是不同根因

## 修复方案
- 用 npm 包 crypto-js 在模块内 import，不依赖 window
- api/system/profile.js 增加 updateProfilePwd，API 层统一加密后再发请求
- 个人中心、顶部改密弹窗、强制改密弹窗等所有入口改调该 API，避免页面各自加密

## 验证与归属
- 验证：重启 dev 并硬刷新，Network 确认密码字段为密文（如 Base64 形态），不只看能否改成功
- 涉及文件：zhi2-web-admin/src/api/system/profile.js、views/system/user/profile、views/login.vue、api/index.js
- 所属项目：惠山二期G；来源会话：c458c0e2-e264-43ca-a51b-78d564dfcdd6；代码基线：bda09e5

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vite_pwd_plaintext",
  "source_extraction_id": "d24a5ccb2658402b9453ac1bed06c24b",
  "version": 1,
  "memory_type": "entities"
}
-->