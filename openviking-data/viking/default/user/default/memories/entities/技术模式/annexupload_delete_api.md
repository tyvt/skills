# AnnexUpload删除接口方法及路径错误
苏州市房地产监测V3 的 `AnnexUpload/index.vue` 删除误调用 `DELETE /file/appendix/detail`，后端要求 `POST /file/appendix/delete` 传 ID 数组，已修正。

## 问题根因
- `AnnexUpload/index.vue` 的 `handleDelete` 误调用 `DELETE /file/appendix/detail`
- 后端实际要求 `POST /file/appendix/delete` 并传 ID 数组，导致删除失败

## 修复方案
- `handleDelete` 改为 `this.$post('/file/appendix/delete', ids)`，与 `indemnity/components/detail.vue` 一致

## 验证与归属
- 验证证据：extracted source=cursor session=8ce4793f-7535-4c0c-af5d-1eaf1173062c
- 涉及文件：AnnexUpload/index.vue、FileList.vue、ImageGrid.vue、utils/appendix.js、api/fwgl/fjgl.js、indemnity/components/detail.vue、presale/entrustSale/components/EntrustSaleAddAppendix.vue、presale/permit/plan/detail.vue
- 来源会话ID：8ce4793f-7535-4c0c-af5d-1eaf1173062c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "annexupload_delete_api",
  "source_extraction_id": "64e817141a014c119f2d75e08fa51c85",
  "version": 1,
  "memory_type": "entities"
}
-->