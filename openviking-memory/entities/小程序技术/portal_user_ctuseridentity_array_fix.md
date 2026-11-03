# 物业门户 ctUserIdentity 房屋分页顶层数组解析修复
物业门户小程序拉身份房屋时后端可能返回顶层数组而非 rows/records 分页壳，需扩展解析分支避免 houseList 为空。

## 问题根因
- utils/portal-user.js 调 GET .../ctUserIdentity/pageByTokenAndIdentityTypeAndIdentityStatus
- 后端可能直接返回顶层数组 [{...}] 或 data.data 为数组
- extractPropertyPageRows 只认 rows/records 会解析不到，表现为 profile 成功但 houseList/houseId 空、切换小区无数据

## 修复方案
- extractPropertyPageRows 增加 res.data 本身为数组、res.data.data 为数组的分支
- isPropertyApiSuccess 在 res.data 为数组时视为成功
- 映射结果写入 portalUser.houseList，首条同步 houseId、project；空列表清空 houseList 与 houseId

## 验证与归属
- 验证：会话 eb625bb1 最终结论：返回体是顶层数组，原 extractPropertyPageRows 只认 rows/records；已扩展数组分支与 isPropertyApiSuccess
- 涉及文件：d:/repository/小程序/wygl-wxxcx-dev-slh/utils/portal-user.js ; d:/repository/小程序/wygl-wxxcx-dev-slh/pages/user/index/index.vue
- 所属项目：小程序；来源会话ID：eb625bb1-51ca-49ee-a579-ba01827034bb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_user_ctuseridentity_array_fix",
  "source_extraction_id": "f6fe17b59d124d2a9018edb7331037df",
  "version": 1,
  "memory_type": "entities"
}
-->