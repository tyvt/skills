# 微信推送PushPlus迁Server酱
投资推送项目在 PushPlus 实名收费后将微信推送迁移至 Server酱，并约定多指数推送的免费额度合计规则。

## 迁移与配置
- PushPlus 实名推送收费后，独立脚本与统一推送改用 Server酱
- 环境变量 SERVERCHAN_SENDKEY（push.example.env / 各指数 *.env 模板）
- 多个 .env 可共用同一 SendKey

## 额度规划
- 免费档约 5 条/天，多指数各 1 条推送时需合计条数
- 例：930955 + H30269 各 1 条仍够用，两指数合计 2 条

## 验证与归属
- 验证证据：用户选免费方案 1，结论写明 Server酱 额度与两指数合计 2 条
- 涉及文件：push.example.env、930955.env、H30269.example.env
- 所属项目：投资推送；来源会话ID：45feeec0-aa70-4a57-8db0-3ebecabbf778

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "微信推送PushPlus迁Server酱",
  "source_extraction_id": "ca3327d69d744217af07100af44ea99c",
  "version": 1,
  "memory_type": "entities"
}
-->