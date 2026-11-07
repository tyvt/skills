# 页面白底且内容区仅灰卡致下方留白
苏住房C 移动端页面默认白色背景且内容区仅灰色卡片有背景色，下方未覆盖区域显白空白。

## 问题根因
- 页面默认白色背景
- 内容区仅灰色卡片有背景色，下方未覆盖区域显白空白

## 修复要点
- 为 `page` 设置与 `DecisionResult` 一致的灰色背景
- 去除最后一张卡片多余下边距
- 另次修复：为 `page` 设置灰色背景，并让 `.container` 使用 `min-height: 100vh` 铺满整页（cursor session 2e60e0b3-4f6b-4a34-b5c3-c0b8ef4fd6f8）

## 涉及文件
- src/pages_vote/decision/common/DecisionRecord.vue
- src/api/autonomy.js
- src/pages_vote/decision/common/DecisionResult.vue
- src/pages_vote/elect/ResultRecord.vue
- src/components/CardCell/CardCell.vue
- src/store/vote.js
- src/pages.json
- src/pages_owner/decision/common/DecisionRecord.vue
- src/pages_vote/elect/DecisionResult.vue
- src/pages_vote/elect/ResultDetail.vue

## 验证与归属
- 验证证据：extracted source=cursor session=82e653ab-16aa-4131-885b-deca387b3836
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：82e653ab-16aa-4131-885b-deca387b3836；代码基线：none
- 补充来源会话ID：2e60e0b3-4f6b-4a34-b5c3-c0b8ef4fd6f8（page 灰底 + .container min-height:100vh 铺满修复）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "page_blank_bug",
  "source_extraction_id": "41104766f2154919ae35cea9ede14f5c",
  "version": 2,
  "memory_type": "entities"
}
-->