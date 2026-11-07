# 巡检图片不显因URL未归一化及加载未回退
物业手持B端巡检记录详情页因 pictureList 字段提取错误且步骤数据无回退导致图片不显示。

## 问题根因
- `pictureList` 字段提取错误，未取出 `fileSite`/`fileUrl`/`url` 等字段，且步骤数据无回退致图片不显

## 解决方案
- 在 `detail.vue` 新增 `normalizePictureUrl`/`normalizePictureUrls`，从 `pictureList` 提取 `fileSite`/`fileUrl`/`url`，用 `ImageGrid` 替换原生 `<image>`，支持 H5/小程序 URL 前缀
- 加载顺序调为 `getRecordProcessDetail` 内嵌步骤(`procedureProcessList`) → `getRecordDetail` → `getRecordPage`(使用 `recordData.recordId` 而非 record)
- 修正空态判断：有 `pictureList` 但无 `processPicture` 时不再误显「暂无内容」
- 步骤详情弹框同样使用归一化后的 `pictureUrls`

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 涉及文件：src/pages_facility/record/add.vue、src/components/ZsUploader/ZsUploader.vue、src/pages_facility/repair/submit.vue、src/pages_facility/issue/components/ReplyDialog.vue、src/pages_facility/issue/components/TransferKnowledgeDialog.vue、src/api/file.js、src/pages_facility/record/detail.vue、src/utils/index.js
- 来源会话ID：f0ee9a83-c325-4307-a2a4-4dc20cb16369
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_image_fallback",
  "source_extraction_id": "039687108a0b4a3480f4534b33cc58de",
  "version": 2,
  "memory_type": "entities"
}
-->