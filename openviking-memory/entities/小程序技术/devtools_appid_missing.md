# 微信开发者工具 appid missing 排查
微信开发者工具报 appid missing 多数情况是工具内小程序AppID未配置，而非页面代码问题。

## 问题根因
- 微信开发者工具仍报 appid missing，一般是工具内小程序 AppID 未正确设置(项目配置问题)
- 不是页面代码问题，需在开发者工具里补全 AppID

## 验证与归属
- 验证证据：010.md 会话38c62c95(appid missing 提示)
- 涉及文件：pages/webview/externalWebview.vue、pages/webview/home.vue
- 来源会话ID：38c62c95-b396-4f30-a971-710346d3c9c6；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "devtools_appid_missing",
  "source_extraction_id": "d8600bf3c81e4e25b78224a443f65995",
  "version": 1,
  "memory_type": "entities"
}
-->