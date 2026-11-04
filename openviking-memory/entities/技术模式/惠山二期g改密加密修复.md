# 惠山二期G改密加密修复
惠山二期G的system/profile/updatePwd接口密码加密问题已修复，改用npm crypto-js在API层统一加密。
## 问题原因
- 原encryptPassword依赖window.CryptoJS，Vite dev下可能未就绪，导致请求仍是明文
## 修复改动
- 用npm包crypto-js替代全局脚本
- 新增api/system/profile.js的updateProfilePwd，在API层统一加密
- 个人中心、顶部改密弹窗、强制改密弹窗3个入口均已切换
## 验证方式
- 重启dev服务器并硬刷新，Network中确认oldPassword/newPassword为Base64密文
- 所属项目：惠山二期G；来源会话：c458c0e2-e264-43ca-a51b-78d564dfcdd6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "惠山二期G改密加密修复",
  "source_extraction_id": "4f77472383724b95a4b59f9b96533a19",
  "version": 1,
  "memory_type": "entities"
}
-->