# 进度条 stroke-width 误收字符串致 ElProgress 警告
模板中 stroke-width="10" 作为字符串传给 ElProgress 的 strokeWidth 属性，其期望 Number 类型致警告。

## 问题根因
- 模板中 stroke-width="10" 作为字符串传给 ElProgress 的 strokeWidth
- ElProgress 的 strokeWidth 期望 Number 类型，收到字符串触发类型警告

## 解决方案
- 改用动态绑定 :stroke-width="10" 传入数值

## 验证与归属
- 所属项目：bugfix
- 验证证据：extracted source=cursor project=bugfix
- 验证证据：src=bugfix/003.md
- 涉及文件：packages/progress/src/progress.vue；D:/repository/bugfix/zhi2-web-admin/src/views/property/largeScreen/components/componentRanking.vue
- 来源会话ID：393829c3-3762-46f2-b7fa-330b64408e2a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "progress_strokeWidth",
  "source_extraction_id": "429aaedba67c4a77a524e32086f608a8",
  "version": 1,
  "memory_type": "entities"
}
-->