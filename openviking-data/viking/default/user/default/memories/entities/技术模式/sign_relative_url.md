# 签名密钥地址子路径相对化
园区物管2.0 的 sign.js 中 resolveSecretKeyUrl 改用无前导斜杠的相对路径，适配子路径部署。

## 问题现象
- 站点挂在子路径（如 `/admin/`）时，签名请求若写死 `/api/v2.0/secret/key` 会从站点根解析
- 与 axios `baseURL` 行为不一致，导致签名密钥请求路径错误

## 解决方案
- `resolveSecretKeyUrl` 返回 `api/v2.0/secret/key`（无前导 `/`），相对当前页面 URL 解析为 `/admin/api/v2.0/secret/key`
- `shouldApplySign` 里用于路径匹配的逻辑仍按绝对路径规则判断，不必与 URL 拼接方式混为一一处

## 验证与归属
- 验证：会话 8efadfc0 将 resolveSecretKeyUrl 从 `/api/v2.0/secret/key` 改为相对路径
- 涉及文件：zhi2-web-admin/public/assets/js/sign.js
- 所属项目：园区物管2.0；代码基线：c97957703；来源会话：8efadfc0-83f6-47ff-88d7-fb9b46407263

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sign_relative_url",
  "source_extraction_id": "00d55c383c404a0fb0e864045dac2dc7",
  "version": 1,
  "memory_type": "entities"
}
-->