# uni.login 非微信端 appid missing 报错
uni.login 在非微信端因拿不到小程序 appid 触发 41002 appid missing。

## 问题根因
- 非微信端执行 uni.login 时拿不到小程序 appid，触发 `41002 appid missing`
- 开发者工具报 appid missing 需检查工具内 AppID 配置，而非页面代码问题

## 解决方案
- 仅在 `MP-WEIXIN` 端执行 `uni.login`
- 非微信端 `return` 使用基础 `webViewUrl` 并保留 `?code=xxx` 拼接逻辑

## 验证与归属
- 验证证据：extracted source=cursor session=d3527192-827d-483c-892e-e53cd0ce6c62
- 涉及文件：pages/home/new/index.vue、pages/home/index/index.vue、README.md
- 来源会话ID：d3527192-827d-483c-892e-e53cd0ce6c62；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "uni_login_appid_missing",
  "source_extraction_id": "a915952323c7436887ace9fedf19adbf",
  "version": 1,
  "memory_type": "entities"
}
-->