# 窄框输入框清除图标重叠修复
zs-input 默认 clearable 在窄框与占位符重叠，已通过关闭清除图标与调整布局修复。

## 问题根因
- zs-input 默认 clearable 在 40px 窄框与 placeholder 及相邻文字叠合
- 行高 27px 小于输入框 28px 致换行挤压，「其它均价」三字段同行遮挡

## 解决方案
- 月/日输入框去 placeholder 关 clearable
- 全局叙事输入框隐藏清除图标、统一 padding、间距 2px 4px
- .narrative-line 行高调 32px 且 vertical-align: middle
- 其它均价拆 3 行；数字框 sm 宽增至 64px

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/036.md
- 涉及文件：presale/permit/components/PresalePlanFillForm.vue、PermitPlanPanel.vue、e2e/fixtures/presale-permit-helpers.js、permit/plan/detail.vue、.workbuddy/memory/2026-09-11.md、package.json、vite.config.js、main.js
- 所属项目：苏州市房地产监测V3；来源会话：2e82688a-7c17-45fc-82e8-25c79990e1a7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "narrow_input_clearable",
  "source_extraction_id": "5bcae300dd0246af886a92e41c877c5b",
  "version": 1,
  "memory_type": "entities"
}
-->