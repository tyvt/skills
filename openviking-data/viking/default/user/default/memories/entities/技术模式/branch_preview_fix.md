# 分支机构页面图片预览与必传附件校验修复
苏州市房地产监测V3 中分支机构页面修复了图片预览失效与保存时未校验必传附件两个问题。

## 图片预览修复
- 根因 ImageGrid.vue：file_type 字典未匹配时 elem 为 undefined，访问 elem.remark 抛错导致缩略图和预览整体失效
- 安全匹配字典项，用 dictValue==='0' 判断是否为图片（与项目其他附件组件一致）
- 缩略图优先使用 fileThumbnailSite，预览使用 fileSite；修正预览索引计算避免混合类型错位
- FileList.vue 预览按钮支持大小写不敏感，扩展 gif/webp/bmp 等格式

## 必传附件校验
- 根因 AgencyBranchDetail 保存时只校验表单字段，未检查必传要件
- 新增 src/utils/appendix.js 的 checkRequiredAppendix 工具函数
- handleSave 提交前调用，缺少必传附件提示「请上传：xxx」；CancelDialog 注销确认前同步校验

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：ImageGrid.vue、FileList.vue、src/utils/appendix.js、AgencyBranchDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：7dc2bf6f-2c30-4f16-b810-f728fa38f9d8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_preview_fix",
  "source_extraction_id": "58c7810a01c34e9fa51dcebb81c6c582",
  "version": 1,
  "memory_type": "entities"
}
-->