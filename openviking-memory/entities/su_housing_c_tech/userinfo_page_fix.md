# 我的-个人信息页未注册修复
苏住房C小程序「我的」头像区因 `pages_my/setting/userInfo` 未在 `pages.json` 注册导致 page not found，已修复。

## 问题根因
- `pages_my/setting/userInfo` 的 Vue 文件存在，但未在 `pages.json` 的 `pages_my` 分包中注册
- 小程序因此报「page not found」，点击头像区域无法进入个人信息页

## 修复内容
- 在 `pages.json` 补充两条路由：`setting/userInfo`（标题「个人信息」）、`setting/realInfo`（标题「实名信息」）
- `userInfo` 页内「实名信息」也会跳转到 `setting/realInfo`

## 涉及文件与归属
- 涉及文件：src/pages.js、src/pages/index/components/My_Suzhufang.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：4cc33d41-1cbc-4887-bc8a-15d1fdcc8a0e

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "userinfo_page_fix",
  "source_extraction_id": "aac1b2384e6740f491121840123bb125",
  "version": 1,
  "memory_type": "entities"
}
-->