# CI test 构建需 .env.test 提供 VITE_API_BASE_URL
test 部署站点因 CI test 构建缺少 .env.test 文件，导致 VITE_API_BASE_URL 为空并提示未配置。

## 问题根因
- CI test 构建流程未生成或读取 .env.test，致前端打包时 VITE_API_BASE_URL 为空
- 部署后页面提示未配置该变量

## 解决方案
- 为 CI test 构建补充 .env.test 文件以注入 VITE_API_BASE_URL
- 登录页增加图形验证码支持

## 验证与归属
- 验证：2026-11-03 会话中用户反馈 test 部署配置缺失并要求登录验证码，助手定位并修复
- 所属项目：zhi2-mobile-query-h5-c-unlimited

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "test_env_vite",
  "source_extraction_id": "d4f99dd1943644b791e6be7c2faa17f6",
  "version": 1,
  "memory_type": "entities"
}
-->