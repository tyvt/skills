# 业务中心流程条标签防挤入相邻格
门户首页 index-new 业务中心横向步骤条标签与下一格图标重叠时，用 min-width: max(..., min-content) 配合 flex-shrink: 0 让文字在本格撑开。

## Description
- 现象：业务中心横向步骤条标签与相邻步骤的图标重叠，文字被压入下一格。
- 根因：标签列缺少最小宽度约束且可收缩，窄内容区下文字溢出到相邻列。
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue；zhi2-web-admin/tests/e2e/portal-home-visual.spec.ts

## Solution
- 对 .flow-step-cell / .flow-step / .flow-step-label 的标签列设 min-width: max(..., min-content) 并 flex-shrink: 0，文字在本格内撑开不压入邻格。
- 合并前需排查：箭头宽度写死 12px 而间距用 dw(14) 可能在窄屏错位；整行或横向溢出需单独验收。
- 模板步骤 :key 宜用稳定业务键而非索引 si；全仓 npm run lint 不能单独证明本次 CSS 无问题（历史风格告警过多）。

## Verification
- 验证证据：会话 d6e2d37c 审查 flow-step 相关 CSS，结论 Warning 可合并，认可 min-width max + flex-shrink:0 方向。
- 所属项目：门户；代码基线：04586c4；来源会话ID：d6e2d37c-78bf-4548-8cba-1179801832f4

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_step_label",
  "source_extraction_id": "ed1fac0b5fc74af090dd3e2c670437c9",
  "version": 1,
  "memory_type": "entities"
}
-->
