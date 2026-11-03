# benefit页移除mock后列表仅走接口
在 src/pages/benefit/index.vue 删除 USE_MOCK_LIST、mockRows 等 mock 逻辑，列表数据仅请求 pubQuarterlyDeclaration 接口，失败维持 paging.value.complete(false)。

## 修改内容
- 在 src/pages/benefit/index.vue 删除 USE_MOCK_LIST、mockRows 等 mock 逻辑
- 列表数据仅请求 pubQuarterlyDeclaration 接口

## 失败处理
- 请求失败维持 paging.value.complete(false)

## 验证与归属
- 验证证据：src=H5/001.md
- 涉及文件：src/pages/benefit/index.vue
- 来源会话：66666cff-f4cc-497a-bea8-ef223cd4cb3c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "benefit_api_only",
  "source_extraction_id": "ec014e6704ab4b4c97a1f8eea1e7cab1",
  "version": 1,
  "memory_type": "entities"
}
-->