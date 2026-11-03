# 移除mock配置请求统一走prod-api真实接口
太仓一网通办H5 移除多环境 mock 配置，请求统一走 prod-api 真实后端接口。

## 修改内容
- 移除 .env.development、.env.test、.env.production 中的 VITE_APP_MOCK 与 VITE_APP_API_MOCK_URL
- src/api/index.ts 的 baseURL 固定为 VITE_APP_API_BASE_URL（/tcwxjj/prod-api）
- 拦截器校验 code === 200
- src/vite-env.d.ts 删除类型，请求经代理至真实后端

## 验证与归属
- 验证证据：src=太仓一网通办H5/001.md
- 涉及文件：d:/repository/太仓一网通办H5/src/router/index.ts、d:/repository/太仓一网通办H5/src/api/index.ts、d:/repository/太仓一网通办H5/src/App.vue、d:/repository/太仓一网通办H5/src/views/components/loginBox.vue、d:/repository/太仓一网通办H5/src/vite-env.d.ts、d:/repository/太仓一网通办H5/src/store/user.ts、d:/repository/太仓一网通办H5/vite.config.ts、d:/repository/太仓一网通办H5/src/views/about/AboutUs.vue
- 所属项目：太仓一网通办H5；来源会话：9b39a3f2-89db-4ef6-9aaa-79a4e9737560；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mock_prod_api",
  "source_extraction_id": "257d5bae982e4b8e880e6453ec41e8c9",
  "version": 1,
  "memory_type": "entities"
}
-->