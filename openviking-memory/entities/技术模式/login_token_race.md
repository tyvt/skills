# 登录页收敛时序避免token竞态
登录页作为启动首屏执行登录并写token后再初始化业务，避免业务请求先于token就绪导致的竞态问题。

## Description
- 新增 src/pages/login/index.vue 作为启动首屏（页面仅显示「登录中...」），执行灵犀/微信登录
- H5 走灵犀 requestCode / userAuth，微信小程序走 wx.login + getInfoByCode
- 支持 authCode 场景：拿到 token 后再调用 selectMyHouseByLingXi
- 登录成功写入 token 和用户信息，再初始化默认房屋/项目
- 登录成功写 token 后再初始化并 reLaunch 跳转首页 pages_home/huishan
- src/pages.json 把 pages/login/index 加为首个页面，启动先进入「登录中」页

## 关键逻辑
- src/request/index.js 拦截器：请求拦截器无 token 且不在白名单时直接跳转登录页并取消请求；响应拦截器业务码 401 或 HTTP 401 时清理登录态并跳转登录页
- 增加了免鉴权白名单（目前含登录和初始化相关接口）
- src/stores/user.js 提供 clearAuthState() 清理鉴权态，避免业务请求先于 token 就绪

## 验证与归属
- 验证证据：extracted source=cursor session=7c65fac1-ba07-4f50-b52b-e836826ca320
- 涉及文件：src/pages/login/index.vue、src/pages.json、src/request/index.js、src/stores/user.js
- 来源会话ID：7c65fac1-ba07-4f50-b52b-e836826ca320
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_token_race",
  "source_extraction_id": "1d00a9284a824937a6f796a98da6d2f6",
  "version": 2,
  "memory_type": "entities"
}
-->