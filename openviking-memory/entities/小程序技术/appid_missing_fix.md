---
audit_status: invalid
last_checked: 2026-11-26T06:33:10+08:00
verdict_note: 实机核对：小程序项目仅 wygl-wxxcx-dev-slh 一份，pages/home/index/index.vue 仍有 login 调用与 return，全文无 MP-WEIXIN 条件编译、无 41002/appid missing、无 ?code= 拼接逻辑；涉及文件 pages/home/new/index.vue、README.md 不存在。记忆描述的修复在当前代码中无法证实，判无效。
---
# uni.login appid缺失报错修复
非微信端执行 uni.login 报 41002 appid missing，已限制仅在微信小程序端执行。
## 问题根因
- uni.login 在当前非微信环境拿不到小程序 appid，导致 41002 appid missing 报错
## 修复内容
- 仅在微信小程序端（MP-WEIXIN）执行 uni.login
- 非微信端直接 return，使用基础 webViewUrl，不再报错
- 保留登录成功后拼接 ?code=xxx 的逻辑
## 验证与归属
- 所属项目：小程序
- 验证证据：extracted source=cursor project=小程序
- 微信开发者工具（小程序编译）打开页面应看到 wx login code
- H5/其他端打开页面不再触发 login fail 41002，直接加载基础地址
- 若微信开发者工具仍报 appid missing，属工具项目配置问题，需检查 AppID 设置
- 涉及文件：pages/home/new/index.vue、pages/home/index/index.vue、README.md、pages/active/active.vue
- 来源会话ID：d3527192-827d-483c-892e-e53cd0ce6c62；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "appid_missing_fix",
  "source_extraction_id": "e639637956e641fd92e4d5fcac5e1554",
  "version": 1,
  "memory_type": "entities"
}
-->