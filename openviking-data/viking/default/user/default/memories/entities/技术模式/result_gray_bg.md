# 投票结果/记录页灰色背景铺满修复
苏住房C 项目 zhi2-mobile-shimin 修复投票结果页与记录页下方空白区域背景未铺满整页的问题。

## 问题现象
- 投票结果页、记录页下方空白区域背景与上方内容区不一致，未铺满整页

## 修复方案
- 给 `page` 设置统一的浅灰背景色
- `.container` 使用 `min-height: 100vh` 铺满整页，下方空白区域与上方统一为浅灰背景

## 涉及文件
- `src/pages_vote/elect/ResultRecord.vue`
- `src/pages_vote/decision/common/DecisionResult.vue`
- `src/pages_vote/decision/common/DecisionRecord.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：2e60e0b3-4f6b-4a34-b5c3-c0b8ef4fd6f8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "result_gray_bg",
  "source_extraction_id": "5117a99df72949b2bc4386bc627f3a94",
  "version": 1,
  "memory_type": "entities"
}
-->