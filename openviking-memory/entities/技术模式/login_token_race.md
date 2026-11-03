# 登录页收敛时序避免token竞态
登录页作为启动首屏执行登录并写token后再初始化业务，避免业务请求先于token就绪导致的竞态问题。

## Description
- 新增 src/pages/login/index.vue 作为启动首屏，执行灵犀/微信登录
- 登录成功写 token 后再初始化并 reLaunch 跳转业务页

## 关键逻辑
- src/request/index.js 拦截器在无 token 或 401 时跳转登录页
- src/stores/user.js 提供 clearAuthState() 清理鉴权态，避免业务请求先于 token 就绪

## 验证与归属
- 验证证据：extracted source=cursor session=7c65fac1-ba07-4f50-b52b-e836826ca320
- 涉及文件：src/pages/login/index.vue、src/request/index.js、src/stores/user.js
- 来源会话ID：7c65fac1-ba07-4f50-b52b-e836826ca320
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_token_race",
  "source_extraction_id": "9f93fce37f554190a2bb7cdfb8f52344",
  "version": 1,
  "memory_type": "entities"
}
-->