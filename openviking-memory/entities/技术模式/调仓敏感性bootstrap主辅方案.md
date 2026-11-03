# 调仓敏感性Bootstrap主辅方案
投资推送项目中检验调仓时点与收益稳健性的 Bootstrap 主辅方案规则。

## 主方案
- 对每个调仓日做交易日随机偏移（如 ±13 日）后全路径重跑并重复足够次数（如 1000），直接测执行延迟与滑点敏感性

## 辅助方案
- 按调仓周期收益的分块 Bootstrap（块长如 36 个月）估计区间，因标准 i.i.d. 重采样会低估短期自相关带来的尾部风险
- 两方案独立输出，不与「仅改限价」混为一谈

## 验证与归属
- 用户确认 Bootstrap 方案 B 为主、Block Bootstrap 为辅；标准 Bootstrap 对动量/自相关的局限说明
- 涉及文件：output/robustness/
- 所属项目：投资推送；来源会话ID：rollout-2026-08-27T10-00-16-01a040f2-4dca-7810-b246-594ac1915afc

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "调仓敏感性Bootstrap主辅方案",
  "source_extraction_id": "0f69dcb281324049b1d45550b4ab9d73",
  "version": 1,
  "memory_type": "entities"
}
-->