# API 未导出 downloadJson 导致导入失败
buildingTable/index.vue 和 project/index.vue 从 @/api 导入了 downloadJson，但 src/api/index.js 未导出它。

## 问题根因
- src/api/index.js 仅导出了 download 和 downloadGet，没有 downloadJson。

## 解决方案
- 在 src/api/index.js 中添加了 downloadJson（POST JSON + download blob），与 exportHouse 一致。

## 涉及的文件
- src/api/index.js
- building/buildingTable/index.vue
- building/project/index.vue

## 验证与归属
- 所属项目：惠山二期G
- 验证证据：extracted source=cursor project=惠山二期G
- 来源会话：c97a341a-e901-4694-932b-d2c0da48f539
- 验证证据: cursor 会话 c97a341a-e901-4694-932b-d2c0da48f539
- 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "api_downloadjson_missing",
  "source_extraction_id": "ddc1c4094e4a4afbb785440f96ae2bdc",
  "version": 1,
  "memory_type": "entities"
}
-->