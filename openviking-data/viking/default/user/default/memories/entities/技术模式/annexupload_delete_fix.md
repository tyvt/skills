# AnnexUpload 删除接口修复
苏州市房地产监测V3 项目 zhi2-web-admin 中公共组件 AnnexUpload 的删除逻辑写错，已修复。

## 问题根因
- 原删除逻辑调用 `DELETE /file/appendix/detail`，而后端期望 `POST /file/appendix/delete`
- 请求体应为附件 ID 数组（单个传 `[appendixId]`，批量传 `[id1, id2, ...]`）
- 预售方案维护页、EntrustSaleAddAppendix.vue 均使用该组件

## 修复内容
- `AnnexUpload/index.vue` 的 `handleDelete(id)` 改为 `this.$post('/file/appendix/delete', ids)`
- 实现方式与 `indemnity/components/detail.vue` 中的正确写法一致

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：8ce4793f-7535-4c0c-af5d-1eaf1173062c
- 涉及文件：`AnnexUpload/index.vue`、`indemnity/components/detail.vue`、`EntrustSaleAddAppendix.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "annexupload_delete_fix",
  "source_extraction_id": "28abe140eda94388b87f73b3086a18be",
  "version": 1,
  "memory_type": "entities"
}
-->