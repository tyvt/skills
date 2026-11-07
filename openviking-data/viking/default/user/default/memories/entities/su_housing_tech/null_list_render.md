# 无合同接口返回null未判空致列表渲染报错
苏住房C移动端公告页接口无合同时返回data:null，未判空致列表含null渲染报错。

## 问题根因
- getContractNoticeList 无合同返回 data:null
- publicNotice.vue 执行 res.rows=[res.data] 令列表含 null，模板访问 detailData.companyName 抛 TypeError

## 修复要点
- publicNotice.vue 判定 res.data 存在才赋值 rows 与 total
- ListContractIndex.vue 增 v-if="detailData" 且 prop 默认值改 () => ({})
- 涉及文件：ListContractIndex.vue、publicNotice.vue、ListIndex.vue、api/notice.js、hooks/useLoadMore.js

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：src=苏住房C/080.md
- 来源会话ID：ddfa164f-7797-420b-afa6-c5e85e60b348

<!-- MEMORY_FIELDS
{
  "category": "su_housing_tech",
  "name": "null_list_render",
  "source_extraction_id": "2426b49c7fdf4f01ad92a4896738da13",
  "version": 1,
  "memory_type": "entities"
}
-->