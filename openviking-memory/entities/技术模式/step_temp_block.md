# 巡检步骤图片传后仍报未上传因临时路径拦截
物业巡检步骤上传图片后仍报错未上传，根因是防真机缩略图而加的临时路径拦截逻辑过激。
## 问题根因
- 为防真机上传失败显示缩略图，加了临时路径（wxfile:// 等）拦截。
- 拦截逻辑过激，上传状态同步偏差即误拦已传图片。
## 解决方案
- 仅当 isPicture === '1' 且 stepFormImages 完全无图时提示未上传。
- 保存取 stepFormImages，去除临时路径校验，改为 map(el => el.rawUrl || el.fileID || el.url).filter(Boolean).join(',')。
## 验证与归属
- 验证证据：src=泰兴小程序/006.md
- 涉及文件：src/staff/pages_facility/record/add.vue、src/staff/components/ZsUploader/ZsUploader.vue、src/components/ZsDialog/ZsDialog.vue、src/staff/api/file.js、src/staff/pages_facility/record/addScrap.vue、src/api/file.js、src/components/ZsUploader/ZsUploader.vue、src/env/mp.js
- 来源会话ID：1cc3bd97-be24-4f8d-abe0-a7fa7f804986
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "step_temp_block",
  "source_extraction_id": "75e2a66b692d45b087fc5f6610906d1c",
  "version": 1,
  "memory_type": "entities"
}
-->