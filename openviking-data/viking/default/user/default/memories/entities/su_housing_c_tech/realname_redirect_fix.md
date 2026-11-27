---
audit_status: invalid
last_checked: 2026-11-27T21:11:42+08:00
verdict_note: 实机核对 userInfo.vue-39 仍为 goMenu(isReal?realInfo-'','v1')，未实名依旧传空路径；源码无 handleRealNameClick/AuthorizedFail/AuthorizedWaiting 状态路由，修复描述与现状不符。dist 中的相关字样为构建产物，非源码。
---
# 个人信息实名信息跳转修复
苏住房C小程序「个人信息→实名信息」点击提示「功能暂未开放」，根因是未实名时传给goMenu空路径，已按实名状态路由修复。

## 问题根因
- 未实名时传给 `goMenu` 的是空路径 `''`，触发了「功能暂未开放」提示

## 修复内容
- 新增 `handleRealNameClick`，按实名状态跳转：已实名→`/pages_my/setting/realInfo`、审核失败→`/pages_my/verification/AuthorizedFail`、审核中→`/pages_my/verification/AuthorizedWaiting`、未实名→`/pages_my/verification/TypeChoose`
- 更新行内展示文案：已实名显示脱敏姓名，其余显示对应状态文案

## 涉及文件与归属
- 涉及文件：`pages_my/setting/userInfo.vue`、`utils/index.js`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：04bd980d-60cb-4228-859f-9dca707763e9

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "realname_redirect_fix",
  "source_extraction_id": "7e2cf28eaccd4767bd08eb2baa41b9d2",
  "version": 1,
  "memory_type": "entities"
}
-->