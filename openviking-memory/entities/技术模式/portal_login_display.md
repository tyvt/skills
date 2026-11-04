# 门户登录页账号密码区块显示规则
zhi2-web-admin 门户登录页账号密码登录区块在开发环境始终显示，生产环境须等待 IP 白名单检查完成且当前 IP 在白名单内才显示。

## 显示规则
- import.meta.env.DEV 为 true 时始终展示账号密码区块
- 生产环境须等 loadIpWhitelistStatus 完成且当前 IP 在白名单内才展示，否则隐藏
- 不要将「仅生产隐藏」与「生产+白名单」混为一谈

## 联动要求
- 白名单状态与原有 loadIpWhitelistStatus 逻辑需保持联动
- 改需求时维持 loadIpWhitelistStatus 与白名单相关状态按原样工作

## 涉及文件与归属
- zhi2-web-admin/src/views/login.vue
- 所属项目：门户；来源会话ID：1c1c985b-50bd-4717-b505-0e781560e2a9；代码基线：b84b4e7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_login_display",
  "source_extraction_id": "c21e6e7c60804fddb905460a5eabd1ef",
  "version": 1,
  "memory_type": "entities"
}
-->