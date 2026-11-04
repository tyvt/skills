# 通过鉴权标记绑定房屋
utils/portal-user.js 引入了 houseBoundViaAuth 标志，仅当 LingXi authCode 房屋选择通过 mergeLingXiHouseIntoPortalUser 成功时设为 true，用作正式版本的房屋绑定判定标准。
## 行为
- houseBoundViaAuth 定义于 utils/portal-user.js 中，仅在 mergeLingXiHouseIntoPortalUser 成功时设为 true
- externalWebview.vue 中的 hasHouse 现在检查此标志以确定房屋存在
- refreshPortalProfile 不再从 ctUserIdentity 填充房屋字段
## 范围
- 正式版本要求 LingXi authCode 选择成功才计为房屋绑定
- 试用版本忽略此标志；houseList/houseId 存在即计为已绑定
## 归属
- 来源会话：05b9061d-bcb6-412b-9bf6-24c69eb80182；代码基线：none
- 文件：utils/portal-user.js, pages/webview/externalWebview.vue

<!-- MEMORY_FIELDS
{
  "category": "mini_program_tech",
  "name": "house_bound_via_auth",
  "source_extraction_id": "2682297093f14d8fbda8251389becd32",
  "version": 1,
  "memory_type": "entities"
}
-->