# 首页 index-new 去 card-body 顶距同步 flex 对齐
门户首页 index-new top-row 两卡去 card-body 顶距时须同步左右栏 flex 对齐，否则视觉重心上移、垂直不对齐。

## Description
- 现象：top-row 两卡 stretch 等高，去 .card-body 顶 padding 仍 justify-content: center，而 func-grid 改 align-content: start 且 padding 22px→0 20px 20px，右侧栏重心上移与左侧流程区不对齐。
- 根因：去顶距未成对改对齐策略，待办/公告区 padding-top:0 叠加 body 顶距削减让表头贴丝带标题。
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue；zhi2-web-admin/tests/e2e/portal-home-visual.spec.ts

## Solution
- 去顶距时成对改为 justify-content: flex-start（或恢复网格垂直居中），并在标题与内容间保留固定间距。
- 用 portal-home-visual.spec.ts（如 1024 截图）做对比验收。

## Verification
- 验证证据：布局审查 HIGH 顶栏两列垂直对齐不一致；MEDIUM 业务中心 flex 内边距不对称、待办/公告更贴标题、func-grid 整体上行。
- 所属项目：门户；代码基线：04586c4；来源会话ID：fe95f322-13c9-4f4f-9871-824196102f03

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "index_card_padding",
  "source_extraction_id": "ed1fac0b5fc74af090dd3e2c670437c9",
  "version": 1,
  "memory_type": "entities"
}
-->