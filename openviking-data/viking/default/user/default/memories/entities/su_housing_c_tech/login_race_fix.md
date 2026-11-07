# 登录后菜单仍提示业主认证修复
苏住房C 小程序登录成功后各 tab 页仍提示业主认证，根因是 getUserInfo 竞态与登录未刷新状态，已修复。

## 问题根因
- `getUserInfo` 中 `listStatus` 未 `await`，`identities` 提前设为空数组致校验失败
- 登录仅存 token，未拉取身份列表与绑定房屋列表

## 修复要点
- `store/user.js`：`getUserInfo` 等待 `listStatus` 完成；新增 `refreshAuthState()` 依次调用户信息接口与 `getMyHouseList`；统一身份类型转字符串
- `pages_main/login/index.vue`：登录成功跳转前 `await userStore.refreshAuthState()`
- `utils/tabBar.js`：各 tab `onShow` 已登录自动调 `refreshAuthState()`
- `App.vue`：H5 hash 注入 token 时刷新认证状态
- `My_Suzhufang.vue`：移除重复 `loadIdentityTy`

## 涉及文件
- `store/user.js`
- `pages_main/login/index.vue`
- `utils/tabBar.js`
- `App.vue`
- `My_Suzhufang.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：db56ec08-2aeb-407a-bde0-498f081066b6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "login_race_fix",
  "source_extraction_id": "613eaf05d69d4f6fb7772b66d4276670",
  "version": 1,
  "memory_type": "entities"
}
-->