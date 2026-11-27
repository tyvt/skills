---
audit_status: invalid
last_checked: 2026-11-28T01:13:24+08:00
verdict_note: 记忆称公示公告在 index-new.vue 用 notice-text→notice-footer 两行结构；现状该类内容在 HomeNoticeList.vue，仅 notice-meta、dashed 命中，notice-footer 不存在且 index-new.vue 文件不存在，文件名与类名均与现状不符。
---
# 首页公示公告列表样式调整
门户首页「公示公告」列表已按设计稿改为两行结构，调整圆点、标签、分隔线等样式以匹配设计。

## 问题原因
- 原先在 `.notice-content` 里用 `flex-wrap`，分类标签跟在标题同一行，日期固定在右侧顶部，与设计稿两行结构不一致。

## 修改说明
- 结构改为 `notice-text` → 标题 + `notice-footer`（标签与 `notice-meta` 同一行左右分布）。
- 圆点由字符 `·` 改为实心圆点（`#2D4B81`）。
- 标签灰底 `#f2f4f7`、文字 `#8a96a8`；分隔线改为虚线 `dashed`。
- 标题 `font-weight: 500`，加 `:title` 便于悬停看全文；列表 key 使用 `announcementId`。

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：`index-new.vue`
- 来源会话ID：3189eeb5-f453-4f06-a88b-e017c31ce460
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "home_notice_list_style",
  "source_extraction_id": "e97aa4d6101849998a56240336a9ee93",
  "version": 1,
  "memory_type": "entities"
}
-->