# 参考站Ref8443Header头部修复
在 zhi2-mobile-shimin（苏住房C）移动端项目中，参考站 Header 使用 `button.back + h1` 结构，与共用 `AppHeader` 不一致，正改为专用 `Ref8443Header` 并补齐参考站 CSS 与底部 action-bar 定位。

## 问题根因
- 参考站 Header 固定为 `button.back + h1` 结构
- 本端共用 `AppHeader` 与之不一致，导致头部样式差异

## 修复方案
- 新增专用 `Ref8443Header` 组件替代共用 `AppHeader`
- 补齐参考站 CSS 以对齐参考站头部样式
- 补齐底部 action-bar 定位逻辑

## 验证与归属
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源：2026-11-06 会话，消息 [0]

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "ref8443_header_fix",
  "source_extraction_id": "83f1c347e5f44378a0eb0d9e624db3eb",
  "version": 1,
  "memory_type": "entities"
}
-->