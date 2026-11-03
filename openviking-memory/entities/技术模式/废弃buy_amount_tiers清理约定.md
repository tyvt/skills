# 废弃buy_amount_tiers清理约定
分档金额迁至 buy_amount_change.py / buy_amount_config.py 后，约定删除死代码与孤儿 pyc 缓存的清理规范。

## 死代码清理
- buy_amount_tiers.py 与 config.py 内 BUY_AMOUNT_TIER_SCHEME、BUY_AMOUNT_TIER_ENABLED 为死代码
- 应删除模块并改 README 项目结构为 buy_amount_change.py

## 孤儿缓存清理
- 删除 .py 后 __pycache__ 中无对应源的 .pyc 为孤儿缓存，可整批删
- 与现存 .py 匹配的 .pyc 属正常产物可保留
- 清理后 python -c "import config" 验证

## 验证与归属
- 验证证据：用户指定清理 19 个孤儿 pyc 与 BUY_AMOUNT_TIER_*；执行删除 buy_amount_tiers.py 并更新 README
- 涉及文件：buy_amount_tiers.py、buy_amount_change.py、config.py、README.md
- 所属项目：投资推送；来源会话ID：832b9af8-4e22-47d7-936c-c5046be45c61

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "废弃buy_amount_tiers清理约定",
  "source_extraction_id": "ca3327d69d744217af07100af44ea99c",
  "version": 1,
  "memory_type": "entities"
}
-->