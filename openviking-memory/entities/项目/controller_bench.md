# controller-bench 主控批量评测
skills 仓库中的批量测试目录，用统一题库横向对比多模型的主控表现。

## 规模与成本
- 14 模型 × 25 题 = 350 组合，成本 $3.96

## 结果与去向
- 2026-11-13 提 4eae5751 推 origin/main
- 冠军 cursor/grok-4.7@256k 得分 0.90；现役 workbuddy/deepseek-v4.1-flash 0.87（4.4s 最快）
- 该轮淘汰 gpt-5.6 系、composer-2.5、gpt-6-astra

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "controller_bench",
  "source_extraction_id": "6e0b2d5547734bc5888642dfa624627f",
  "version": 1,
  "memory_type": "entities"
}
-->