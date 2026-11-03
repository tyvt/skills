# 登录接口 data 为 accessToken 字符串
`LoginByUidResponse` 的 `data` 字段定义为 `string` 类型的 `accessToken`，江阴C端登录流程据此写入令牌。

## 问题现象
- `login.vue` 调用 `userStore.setToken(res.data)` 写入令牌，并在 `res.data` 非空时拉取用户信息及跳转
- 后端异常返回 `code === 200` 且空串时不写 token

## 关键定义
- `LoginByUidResponse` 的 `data` 字段定义为 `string` 类型的 `accessToken`

## 验证与归属
- 验证证据：src=江阴C端/001.md
- 涉及文件：d:/repository/江阴C端/src/pages/login.vue、src/api/security.ts、src/store/user.ts、src/main.ts、src/pages/login/index.vue、src/utils/url.ts、src/http/http.ts
- 所属项目：江阴C端；来源会话：dc371ef3-e637-4ca8-826a-fc2421c1ed0b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_data_accesstoken",
  "source_extraction_id": "3839cf190fa045a0b66d6e97a3ff2a09",
  "version": 1,
  "memory_type": "entities"
}
-->