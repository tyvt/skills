# 移除登录入口统一苏服办登录
苏住房C 移除独立登录入口，统一改为苏服办(sfb)登录。

## 主要改动
- 新增 `src/utils/sfb.js` 封装苏服办登录能力
- 从 `pages.js` 删除登录相关路由：login/index、login/forget、login/password、login/success
- 所有跳转 `/pages/login/index` 的位置改为调用 `promptSfbLogin()`

## sfb.js 能力
- `hasLightAppJssdk()` 检测是否在苏服办容器内
- `ensureSfbTicket()` / `triggerSfbLogin()` 静默或主动获取 ticket
- `loginWithSfbTicket()` 用 ticket 换 token 并拉取用户信息
- `initSfbUser()` App 启动时静默登录
- `promptSfbLogin()` 替代原登录页用户主动登录入口

## 统一拦截位置
- `goMenu()` 鉴权拦截(`utils/index.js`)
- 「我的」页头部(`My_Suzhufang.vue`)
- 收藏、二手房详情、在线课堂点赞、实名认证等

## 验证与归属
- 涉及文件：src/utils/sfb.js、pages.js、utils/index.js、My_Suzhufang.vue
- 验证证据：extracted source=cursor project=苏住房C；来源会话ID：92b16b83-222f-4c4d-93dd-2c8f89738fb1

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "sfb_login_unified",
  "source_extraction_id": "b9576b83830643c7a838f2b915795c6c",
  "version": 1,
  "memory_type": "entities"
}
-->