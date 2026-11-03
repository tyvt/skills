# 接口跳转地址未做站内白名单校验
苏住房G 首页消息列表点击将后端返回的 row.msgUrl 直接作为路由 path，存在开放重定向风险。
## 问题根因
- index-v2.vue 将服务端/运营配置的 msgUrl 直接赋给 path 再 $router.push，前端默认信任。
- 若数据被写入非预期值（如 //evil.com、http://、javascript: 伪协议），会出现错误跳转甚至开放重定向。
- 前端路由 push 对非法 path 不一定报错，容易静默跳走。
## 解决方案
- 跳转前抽 isSafeInternalPath(url) 校验：必须以单个 '/' 开头，拒绝 '//' 开头、含协议头及非站内前缀。
- 不合法时用 msgWarning 提示并 return，不执行跳转。
- 凡接口/字典/配置读出的跳转地址（含 redirectPath）都收口到同一工具函数。
## 验证与归属
- 验证证据：index-v2.vue:390-402 消息打开使用未校验的 msgUrl 作为路由 path；Fix 建议仅允许以 / 开头的站内 path。
- 涉及文件：zhi2-web-admin/src/views/home/index-v2.vue
- 所属项目：苏住房G；来源会话ID：22db11e4-4ebb-4504-8a6e-e93aa9791182；代码基线：9e5c499

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "msgurl_whitelist",
  "source_extraction_id": "78a06fbd1aec4ffab8656af93c6d4aae",
  "version": 1,
  "memory_type": "entities"
}
-->