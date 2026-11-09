# magpie
本地模型网关（OpenAI 兼容），被 OpenViking 复用为 VLM 抽取与评测的模型代理。

## 基本信息
- 服务地址 http://127.0.0.1:3425/v1（OpenAI 兼容接口）
- 在 OpenViking 配置 ~/.openviking/ov.conf 中引用，VLM 模型为 openai/auto/hy3
- 网关 max_concurrent=8（并发上限）

## 暴露模型
- 2026-11-09 经 /v1/models 查询确认暴露 13 个模型，且全部支持图像输入（即本次 MMVP 评测对象）


<!-- MEMORY_FIELDS
{
  "category": "模型网关",
  "name": "magpie",
  "source_extraction_id": "bb930be7292541f3a4af8f2f7896e920",
  "version": 1,
  "memory_type": "entities"
}
-->