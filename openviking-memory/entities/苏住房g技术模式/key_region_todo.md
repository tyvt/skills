# 关键数据区域切换不触发待办接口请求
待办数据按用户维度独立于区域筛选，区域切换时不再请求待办接口。

## 设计要点
- 待办数据按用户维度独立于区域筛选
- index-v2.vue的onKeyRegionChange移除loadTodoPanel()
- getTaskCount({})与列表请求均不带regionCode

## 验证与归属
- 验证证据：苏住房G/086.md
- 涉及文件：src/views/home/index-v2.vue、src/views/home/v2/components/KeyDataNav.vue、tests/e2e/home-v2.spec.mjs、src/api/portal/home.js
- 所属项目：苏住房G；来源会话ID：9baedf91-d8d6-40c2-8e79-314e529e757a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术模式",
  "name": "key_region_todo",
  "source_extraction_id": "1af7b39407a248248e8b533ea8f422ce",
  "version": 1,
  "memory_type": "entities"
}
-->