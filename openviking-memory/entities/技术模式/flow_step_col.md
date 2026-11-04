# 业务中心流程条图标等距
门户首页 index-new 业务中心两行流程步骤标签字数不一，要求图标间距等分、文字不等分，用 CSS 变量控制图标中心间距。

## Description
- 现象：index-new 业务中心两行流程步骤，标签字数不一（如「开发企业入网认证」），若按整列等分网格，图标间距随文字宽度漂移。
- 根因：等分列宽会把短标题列拉宽、长标题列挤窄，图标锚点跟着列边界走，看起来不齐。
- 所属项目：门户；涉及文件：zhi2-web-admin/src/views/home/index-new.vue

## Solution
- 用 CSS 变量控制图标中心间距（如 --flow-step-col，会话中从132px收紧到116px并微调 flow-steps 左右 padding 4px）。
- 每步图标占固定列宽、文案在列内左对齐；调参以8个14px汉字不互抢为参考，出现省略号可回调118–120px，仍嫌松再试112px。

## Verification
- 验证：会话 6744307c 用户明确「图标等分、文字不等分」并追问更密；最终 --flow-step-col 116px、flow-steps 左右 padding 4px。
- 来源会话ID：6744307c-7a3f-44d9-bc86-ea0a5e03757f；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_step_col",
  "source_extraction_id": "ca27764bcf814f6b8bfa01c9f8541337",
  "version": 1,
  "memory_type": "entities"
}
-->