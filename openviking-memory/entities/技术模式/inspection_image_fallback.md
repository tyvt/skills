# 巡检图片不显因URL未归一化及加载未回退
物业手持B端巡检记录详情页因 pictureList 字段提取错误且步骤数据无回退导致图片不显示。

## 问题根因
- `pictureList` 字段提取错误且步骤数据无回退致图片不显

## 解决方案
- 在 `detail.vue` 新增 `normalizePictureUrls` 提取 `fileUrl` 等并用 `ImageGrid`
- 加载顺序调为 `getRecordProcessDetail` 回退至 `getRecordDetail` 及 `getRecordPage`(`recordData.recordId`)

## 验证与归属
- 验证证据：src=物业手持B端/001.md
- 涉及文件：src/pages_facility/record/add.vue、src/components/ZsUploader/ZsUploader.vue、src/pages_facility/repair/submit.vue、src/pages_facility/issue/components/ReplyDialog.vue、src/pages_facility/issue/components/TransferKnowledgeDialog.vue、src/api/file.js、src/pages_facility/record/detail.vue、src/utils/index.js
- 来源会话ID：f0ee9a83-c325-4307-a2a4-4dc20cb16369
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_image_fallback",
  "source_extraction_id": "378a0d6c59af498ca69b4ef6193b77fc",
  "version": 1,
  "memory_type": "entities"
}
-->