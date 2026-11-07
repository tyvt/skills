# 物业门户 refreshPortalProfile 须串联 profile 后立刻拉房屋写快照
门户用户刷新不能只依赖 devRefreshPortalHouseIfEmpty，须在 profile 成功后立即合并房屋并写快照，避免重复打房屋接口。

## 正确顺序
- profile 接口成功 → applyCtProfileToPortalUser
- 立刻 await mergeCtUserIdentityHouseIntoPortalUser(merged, token)
- 再 writePortalSnapshot(merged)

## 入口与去重
- 任意入口（如「我的」refreshFromServer → refreshPortalProfile）都应走同一链路
- 页面层不要再二次调用 devRefreshPortalHouseIfEmpty
- devRefreshPortalHouseIfEmpty 应内部复用 mergeCtUserIdentityHouseIntoPortalUser，勿复制两套解析逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=小程序
- 验证：会话 eb625bb1：房屋接口原先只在 develop 的 devRefreshPortalHouseIfEmpty；已在 refreshPortalProfile 中 profile 后 await 房屋合并；user/index 去掉二次 devRefresh
- 涉及文件：d:/repository/小程序/wygl-wxxcx-dev-slh/utils/portal-user.js ; d:/repository/小程序/wygl-wxxcx-dev-slh/pages/user/index/index.vue
- 所属项目：小程序；来源会话ID：eb625bb1-51ca-49ee-a579-ba01827034bb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_user_refresh_workflow",
  "source_extraction_id": "f6fe17b59d124d2a9018edb7331037df",
  "version": 1,
  "memory_type": "entities"
}
-->