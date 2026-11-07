# 预售许可历史查看硬编码路由致页面未授权
在苏州市房地产监测V3中，预售许可历史查看因硬编码路由导致未授权，已改用统一路由解析。

## 问题根因
- PermitHistoryPanel.vue 的 handleView 硬编码 /presale/permit/:id 导致页面未授权

## 修复方案
- 改用 buildNavigationByFilePath('presale/permit/detail', …) 统一路由解析
- 菜单缺失时复用 detail.vue 的 openPlanPage 提示 msgError('没有授权相关菜单，请联系管理员')

## 涉及文件
- zhi2-web-admin/src/views/presale/permit/components/PermitHistoryPanel.vue
- .workbuddy/memory/MEMORY.md
- .workbuddy/memory/2026-09-11.md
- zhi2-web-admin/src/permission.js
- zhi2-web-admin/src/views/presale/permit/components/detail.vue
- zhi2-web-admin/src/views/presale/permit/components/index.vue
- zhi2-web-admin/src/router/index.js
- zhi2-web-admin/src/mixins/listMixins.js
- .workbuddy/memory/MEMORY.md
- .workbuddy/memory/2026-09-11.md

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/084.md
- 来源会话：2cbd9c2f-a7a8-42bc-973a-d8fe877023a9
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_history_route",
  "source_extraction_id": "9a7a6e30e88942b69bcab76fafb42454",
  "version": 2,
  "memory_type": "entities"
}
-->