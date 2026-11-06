# portal-user.js 房屋接口串联与解析
utils/portal-user.js 新增/修改房屋接口串联逻辑，使 profile 之后也能拉到房屋数据。

## 改动点
- extractPropertyPageRows：支持 res.data 本身为数组、res.data.data 为数组
- isPropertyApiSuccess：res.data 为数组时视为成功（与直接返回列表的接口一致）
- 新增 mergeCtUserIdentityHouseIntoPortalUser(portalUser, token)：调用 GET ../v2.0/property/ctUserIdentity/pageByTokenAndIdentityTypeAndIdentityStatus?identityType=1&identityStatus=2 合并房屋信息

## 背景
- 之前房屋接口只在 devRefreshPortalHouseIfEmpty 里调，且限定微信开发版 develop；refreshPortalProfile 里从未串联
- 返回体是顶层数组 [{...}]，原 extractPropertyPageRows 只认 rows/records，解析不到数据

## 验证与归属
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：utils/portal-user.js、pages/user/index/index.vue、api/home.js、api/common.js、utils/request.js、pages/webview/externalWebview.vue
- 所属项目：小程序；来源会话ID：eb625bb1-51ca-49ee-a579-ba01827034bb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_user_house_merge",
  "source_extraction_id": "1571c5bfb625441c962d9eab86b058e3",
  "version": 1,
  "memory_type": "entities"
}
-->