# externalWebview 灵犀链路接入
按 `temp.vue` 在 `externalWebview.vue` 接好灵犀授权链路，实现先登录再调灵犀选屋。

## 行为说明
- 解析 query 使用 `getQueryParamsFromOptions`（含 `redirectUrl` 内参数）
- 判断是否走灵犀：存在 `authCode` 或 `authoCode`（兼容拼写）即视为带灵犀授权码
- `onLoad`：无 token 且 URL 带上述参数时，设 `lingXiAutoLoginTriggered` 并执行 `startLoginFlow()`（`loginPortalByWxCode`）
- `startLoginFlow` 在 `refreshFromServer()` 之后调用 `maybeRunLingXiSelectMyHouse()`

## 选屋逻辑
- `maybeRunLingXiSelectMyHouse`：有 token、有灵犀 query、且未执行过（`lingXiQueried`）才继续
- 非开发版且 `authCode === '0'` 时不请求 `selectMyHouse`
- 否则执行灵犀选屋请求

## 验证与归属
- 涉及文件：pages/webview/externalWebview.vue、temp.vue、pages/user/index/index.vue、utils/portal-user.js
- 所属项目：小程序（wygl-wxxcx-dev-slh）；来源会话：38603878-ea6a-4871-8ac2-8531b6c94bb4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "externalwebview_lingxi_link",
  "source_extraction_id": "acfa3d29203d49719c288b371914a6bf",
  "version": 1,
  "memory_type": "entities"
}
-->