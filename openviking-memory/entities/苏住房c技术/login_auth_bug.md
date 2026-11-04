# 登录后业主认证态缺失bug
登录成功进入各tab仍误提示「请先进行业主身份认证」，根因为getUserInfo未await身份列表且登录只存token未刷新认证态。

## 问题根因
- store/user.js的getUserInfo中identities赋值未await listStatus()，接口未返回就置空数组，goMenu的v3校验读空身份判定未认证。
- 登录链路只保存token，未拉取身份列表与绑定房屋列表，整个会话生命周期认证态无数据源。

## 解决方案
- getUserInfo改为串行：先await用户信息/状态接口，拿到结果再写identities。
- 新增refreshAuthState()，按「用户信息接口→getMyHouseList」顺序拉齐两类状态。
- 两处身份类型比较统一String()归一，避免数字1与字符串"1"比较失败。
- 登录页两分支跳转前await refreshAuthState；utils/tabBar.js各tab的onShow对已登录用户调一次；App.vue的H5 hash注入token分支同样刷新。
- 「我的」页删掉自带loadIdentityTypes改由refreshAuthState统一负责。

## 验证与归属
- 验证：会话db56ec08用户反馈登录后点菜单仍提示认证，根因明确为getUserInfo未await listStatus且登录后未刷新。
- 涉及文件：zhi2-mobile-shimin/src/store/user.js、pages_main/login/index.vue、utils/tabBar.js、App.vue、My_Suzhufang.vue、utils/index.js、api/property.js、pages/login/index.vue、pages_main/login/success.vue、pages_main/login/password.vue。
- 验证证据：src=苏住房C/033.md
- 所属项目：苏住房C；代码基线：5f0f4dc；来源会话ID：db56ec08-2aeb-407a-bde0-498f081066b6。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "login_auth_bug",
  "source_extraction_id": "683afd88640c49c496defff46d02b40e",
  "version": 2,
  "memory_type": "entities"
}
-->