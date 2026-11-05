# 消息页高度塌陷修复
苏住房C 微信小程序 `pages_main/message/index` 页因 `page { height: 100% }` 导致高度塌陷，已改用 calc 精确计算并包裹分页容器修复。

## 问题根因
- 上次改法 `page { height: 100% }` 在微信小程序里让高度塌陷，整页 flex 链断裂
- 原有 `message-panel-wrap` 与 `page { overflow: hidden }` 结构有误

## 修复要点
- 恢复原有页面结构，去掉 `message-panel-wrap` 和 `page { overflow: hidden }`
- 用 `calc(100vh - var(--nav-height))` 精确计算高度，减去自定义导航栏高度
- 在 `index.vue` 注入 CSS 变量 `--nav-height = 状态栏高度 + 44px`
- `ZsPaging` 外包 `paging-host` 容器，设 `:deep(.zs-paging) { height: 100% }` 确保分页组件有确定高度

## 涉及文件
- src/pages_main/message/index.vue
- src/pages/message/index.vue
- src/pages.json
- src/pages/message/message.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：86040ce3-4045-4591-bad4-02ee7724cc1b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "message_height_fix",
  "source_extraction_id": "77dfc578cbe248d99adb47bed2b7e4a2",
  "version": 1,
  "memory_type": "entities"
}
-->