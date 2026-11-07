# currentRoute 的小写规范化
在 zhi2-web-admin (产品 2.0) 中，currentRoute 未被转换为小写，导致路由逻辑失败。
## 问题根因
- currentRoute 未被统一为小写，导致路由验证失败。
- 重复路由和异常弹窗未能自动关闭。
## 解决方案
- 将 currentRoute 规范化为小写。
- 移除重复路由并自动关闭异常弹窗。
- 69 个 Playwright 菜单 E2E 测试通过。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：758460b0-2a05-4d83-8594-0821de46c25c
- 验证证据: cursor session=758460b0-2a05-4d83-8594-0821de46c25c
- 涉及文件: auth-helpers.js, company-personnel-flow.spec.js, playwright.config.js, 路由信息.json, package.json, recordPriceMngSuzhou/index.vue, src/main.js, src/store/modules/permission.js
- 所属项目: 2-0; 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "route_lowercase_fix",
  "source_extraction_id": "1922a2b4ee394b9bbf4543e1aa4ddd5a",
  "version": 1,
  "memory_type": "entities"
}
-->