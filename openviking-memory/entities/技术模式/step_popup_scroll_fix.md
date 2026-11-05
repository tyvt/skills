# 巡检步骤弹窗滚动错位修复
泰兴小程序员工端「添加巡检记录」步骤弹窗中「巡检说明」placeholder 跟随滚动错位，已通过将弹窗内容区改为 scroll-view 修复。

## 问题根因
- 弹窗内容区原为 `<div class="step-form-body">`，滚动时 placeholder 跟随错位。

## 处理方式
- 将弹窗内容区改为 `<scroll-view scroll-y class="step-form-body" :show-scrollbar="false">`，与项目 ReplyDialog、CompleteDialog 等弹窗写法一致。
- 样式调整：`.step-form-body` 去掉 `overflow-y: auto`，改为 `max-height: 55vh`，由 scroll-view 接管滚动。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/pages_facility/record/add.vue、src/components/ZsTextarea/ZsTextarea.vue
- 来源会话ID：7ea10a0b-45b6-495f-93fd-3293e33a2ae1
- 所属项目：泰兴小程序；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step_popup_scroll_fix",
  "source_extraction_id": "2762fdd53c074d90b150c24c3dcb49e4",
  "version": 1,
  "memory_type": "entities"
}
-->