# 巡检步骤弹窗placeholder样式对齐修复
泰兴小程序新增巡检步骤弹窗中「巡检说明」placeholder 与输入框颜色字号不一致，根因是混合使用原生 input 与 ZsTextarea，已统一为原生 textarea 修复。

## 问题根因
- 步骤弹窗里「步骤名称」「标准工时」用原生 `input` + `placeholder-class="input-placeholder"`。
- 「巡检说明」走 `ZsTextarea` / `uni-easyinput`，内部固定用 `uni-easyinput__placeholder-class`，小程序里 placeholder 样式机制不同，颜色对不齐。

## 处理方式
- 将「巡检说明」改为原生 `textarea`，同样使用 `placeholder-class="input-placeholder"`，与上方输入框完全一致；字数统计样式保留。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序。
- 涉及文件：add.vue、ZsTextarea.vue、ZsUploader.vue 等（路径 d:\repository\泰兴小程序\src\staff\pages_facility\record\add.vue 等）。
- 来源会话ID：11a4e214-e500-42a0-9c0a-82e53325ad0f
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "textarea_placeholder_fix",
  "source_extraction_id": "73b155aac32a4c42aabee05de66ae54e",
  "version": 1,
  "memory_type": "entities"
}
-->