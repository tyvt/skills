# 苏住房防汛C端demo构建导致真实接口未配置
苏住房防汛C端H5在8095部署demo构建后，登录报"真实接口未配置：请设置VITE_API_BASE_URL"。

## 问题根因
- 8095原部署demo构建(bun run build)，.env为空导致VITE_API_BASE_URL未配置
- request()/authRequest()在baseUrl为空时throw"真实接口未配置"
- 图形验证码已修好(fetchLoginCaptcha兜底/api能出真图)，但登录接口仍报错

## 解决方案
- 改用正确的test/remote构建部署：uni build -m test(读取.env.test→VITE_DATA_MODE=remote + VITE_API_BASE_URL=/api)
- 验证码、登录、各业务数据请求均走同源/api连真实网关
- 保留fetchLoginCaptcha的/api兜底作为防御

## 验证与归属
- 验证：用zsbase/Zs@2026Aa!登录，POST /api/v2.0/security/auth/login→200，跳转/pages/systems/index
- 涉及文件：dist构建流程、.env.test
- 所属项目：苏住房防汛C端(zhi2-mobile-query-h5-c-unlimited)；来源会话：2026-11-04；代码基线：fix/login-design-align分支

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_demo_build_deploy",
  "source_extraction_id": "0663dc0d90f74cb2a40a9ab91da4603a",
  "version": 1,
  "memory_type": "entities"
}
-->