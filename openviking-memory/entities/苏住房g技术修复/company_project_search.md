# 企业项目统计搜索不调接口修复（苏住房G）
苏住房G 项目 publicQuery/companyProjectStats 页面点击搜索无接口请求的问题已修复。

## 问题根因
- companyProjectStats/index.vue 中 handleQuery 是空方法，点击搜索不会调用 getDetails()，因此不请求 /company/companyRecord/companyNumStatistics。

## 修复内容
- 将 handleQuery 改为调用 this.getDetails()，搜索重新拉取统计数据。
- 「统计类型」仍由前端 tableRows 计算属性按 statType 过滤，无需传给接口。
- 重置逻辑本身已正确调用 getDetails()，无需改动。

## 验证与归属
- 验证：刷新页面点「搜索」应看到接口请求；若仍无请求用 Network 面板确认。
- 所属项目：苏住房G；来源会话：5fd50fdd-c3d0-40b5-af88-9696e44c5d09；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：src/views/publicQuery/companyProjectStats/index.vue、src/views/publicQuery/feeStandardStats/index.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "company_project_search",
  "source_extraction_id": "279471c0bd4d496fa41824438d6b5de4",
  "version": 1,
  "memory_type": "entities"
}
-->