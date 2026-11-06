# portal-user.js 房屋合并逻辑
`utils/portal-user.js` 扩展数组解析能力并新增房屋合并函数，将物业房屋信息并入门户用户态。

## 改动点
- `extractPropertyPageRows` 支持 `res.data` 本身为数组
- `extractPropertyPageRows` 支持 `res.data.data` 为数组
- `isPropertyApiSuccess` 在 `res.data` 为数组时视为成功（与直接返回列表的接口一致）
- 新增 `mergeCtUserIdentityHouseIntoPortalUser(portalUser, token)` 调用 `GET ../v2.0/property/ctUserIdentity/pageByTokenAndIdentityTypeAndIdentityStatus?identityType=1&identityStatus=2`

## 背景原因
- 房屋接口原先只在 `devRefreshPortalHouseIfEmpty` 中调用且限定微信开发版 `develop`
- `refreshPortalProfile` 从未串联房屋请求，导致 profile 之后看不到房屋请求
- 返回体为顶层数组 `[{...}]`，原 `extractPropertyPageRows` 只认 `rows`/`records` 等解析不到数据

## 验证与归属
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：utils/portal-user.js、pages/user/index/index.vue、pages/webview/externalWebview.vue、api/home.js、api/common.js、utils/request.js
- 所属项目：小程序；来源会话ID：eb625bb1-51ca-49ee-a579-ba01827034bb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_house_merge",
  "source_extraction_id": "a623b29c73bb4000a6e5da571dafc2ba",
  "version": 1,
  "memory_type": "entities"
}
-->