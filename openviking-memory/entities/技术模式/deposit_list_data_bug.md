# 定金列表因接口data未被解析而不显示
苏州市房地产监测V3的定金通知列表中，通用 listCallback 仅读取 response.rows，而 V3 接口数据置于 data 字段下导致表格空。

## 问题根因
- 通用 `listCallback` 仅读取 `response.rows`
- V3 接口 `selectDepositNoticeList` 数据置于 `data` 字段下，导致表格为空

## 解决方案
- index.vue 新增 `extractListData`/`extractTotal` 兼容多结构
- `normalizeNoticeRow` 映射 `noticeNo` 等字段差异

## 验证与归属
- 涉及文件：路由信息.json、前端技术信息.md、MEMORY.md、2026-09-13.md、index.vue、notice.js、listMixins.js、table.js
- 来源会话ID：39e4c6b2-6db7-42a7-8dc7-56ade38929bc；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "deposit_list_data_bug",
  "source_extraction_id": "99fa5352d8a04f5193fd2ce21a6dfcb0",
  "version": 1,
  "memory_type": "entities"
}
-->