# 新增登录页并移除Mock走真实接口
太仓一网通办H5 新增 register/phoneUse 登录页，并移除 mock 配置，所有请求统一走真实接口 /tcwxjj/prod-api。

## 改动内容
- 删除 .env.development/.env.test/.env.production 中的 VITE_APP_MOCK 和 VITE_APP_API_MOCK_URL
- src/api/index.ts 的 baseURL 固定为 VITE_APP_API_BASE_URL（/tcwxjj/prod-api），响应拦截器统一校验 code === 200
- src/vite-env.d.ts 删除对应类型定义

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：src/api/index.ts、src/vite-env.d.ts、src/router/index.ts、src/App.vue、src/views/components/loginBox.vue、src/store/user.ts
- 所属项目：太仓一网通办H5；来源会话：9b39a3f2-89db-4ef6-9aaa-79a4e9737560；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mock_removed_real_api",
  "source_extraction_id": "7be04939e3014bdabe23804ada6a4c43",
  "version": 1,
  "memory_type": "entities"
}
-->