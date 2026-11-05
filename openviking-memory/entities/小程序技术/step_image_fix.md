# 新增巡检步骤弹窗图片显示修复
泰兴小程序新增巡检步骤弹窗中巡检图片不显示的问题已修复，改动集中在 src/staff/pages_facility/record/add.vue。

## 问题根因
- 「巡检说明」「巡检图片」原在 flex 横排容器中，上传组件在 flex 里被压缩为 0 宽度导致不可见
- 编辑回显时若在组件初始化前回填图片列表，上传组件会丢失图片

## 修复方案
- 将「巡检说明」「巡检图片」从 flex 横排拆出，改为独立的块级布局（step-form-block / step-form-upload-block）
- scroll-view 仅保留 max-height: 55vh，去掉 flex: 1，对齐 ReplyDialog 模式
- ZsUploader 增加 size="small" 和 class="step-form-uploader"，并用 :deep(.file-picker__box) 固定为 160rpx × 160rpx 防止被压缩
- onEditStep 先打开弹窗，再在 nextTick 后回填 stepFormImages，避免初始化时图片列表丢失

## 验证与归属
- 验证方式：微信小程序进入「添加巡检记录」→ 选择程序 → 点击「新增」
- 涉及文件：src/staff/pages_facility/record/add.vue
- 所属项目：泰兴小程序；来源会话ID：1e0282db-565c-4871-b424-f34153bcc9c5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "step_image_fix",
  "source_extraction_id": "aa06516a5e8149c6b7cf2801366c4597",
  "version": 1,
  "memory_type": "entities"
}
-->