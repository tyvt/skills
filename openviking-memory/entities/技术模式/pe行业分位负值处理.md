# PE 行业分位负值处理约定
行业内 PE 分位定义方向为「越大越便宜」，负 PE 与零 PE 统一归入缺失走 L3 路径，禁止取绝对值。

## 处理规则
- 行业内 PE 分位定义方向为「越大越便宜」
- 负 PE 与零 PE 统一归入缺失，走 L3 路径（会话落地为 L3=0.5）
- 不得对亏损股 PE 取绝对值或做其他变换，否则亏损股会被错误赋予估值信号

## 验证与归属
- 验证证据：005 rollout 用户口径二及最终结论「负 PE、零 PE 均进入 L3=0.5」
- 涉及文件：output/factors/factor_summary.csv、output/orthogonality/selected_factors.json
- 所属项目：投资推送；来源会话ID：rollout-2026-08-27T12-47-53-01a0418b-c09c-7882-aeea-91ab71028277

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pe行业分位负值处理",
  "source_extraction_id": "17e08beb3b824e8dbcd91bdb8c2c85a8",
  "version": 1,
  "memory_type": "entities"
}
-->