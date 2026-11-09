# 门户经纪机构页 Tab 下划线修复
修复门户经纪机构信息公示详情页「交易记录/信用记录」Tab 下划线错位与按钮高度异常问题，统一为 zs-tabs type=line 风格。

## 问题根因
- BrokerPages.vue 的 `.portal-tabs` 使用 `align-self:stretch`，60px 高的 `.portal-table-toolbar` 把按钮撑成 60px，`height:40px` 失效
- `::after` 下划线 `bottom:0` 落到工具栏底边、离文字很远，用户反馈像带下划线文字

## 修复内容
- `.portal-tabs` 改为 `align-self:center`，按钮锁回 40px 并在 60px 工具栏内垂直居中
- 下划线贴回文字下 2px
- 未激活色改 `rgba(0,0,0,0.65)`，与 `zs-tabs type=line` 一致

## 涉及文件与验证
- 文件：`zhi2-web-admin/src/views/home/publicPortal/pages/BrokerPages.vue`
- 验证：私有 dist + nginx 8099 + Playwright 实测 tabHeight=40、上下留白各 10px、下划线 2px `#3f669c`
- 所属项目：门户；来源：2026-11-09 用户记录

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "broker_tab_fix",
  "source_extraction_id": "1e501ef82ff04e5197352be40702cd27",
  "version": 1,
  "memory_type": "entities"
}
-->