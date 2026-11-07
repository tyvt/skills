# 服务周报区域complexId缺失修复
苏住房G项目修复了服务周报选择发布范围与右上角全局区域不一致时未传递complexId导致数据错误的问题。

## 问题原因
- B端用户右上角有全局物业管理区域（currentProjectId）
- 服务周报选择发布范围时若选中其他区域，接口需显式传入该区域complexId
- 未传complexId时后端按全局区域处理，导致数据不正确

## 修复内容
- rangeTable.vue：选中区域与全局区域不同时请求自动附加complexId，规范化小区行数据保留complexId，选中后自动刷新列表
- index.vue：服务周报启用simple-complex-list模式，筛选发布范围时与全局不同则附带complexId
- detail.vue：新增/编辑保存时若发布范围与全局不同，表单附带complexId

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G；来源会话：f09d0d8f-6e96-496a-8a72-7934ff001122；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "service_weekly_complexid_fix",
  "source_extraction_id": "51d4b7a1bb0c40548955037bb74a267b",
  "version": 1,
  "memory_type": "entities"
}
-->