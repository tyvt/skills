# downloadJson 接口缺失修复
惠山二期G 后台 buildingTable 与 project 模块因 `@/api` 缺少 `downloadJson` 导致构建/运行报错的修复记录。

## 问题根因
- `buildingTable/index.vue` 与 `project/index.vue` 从 `@/api` 导入 `downloadJson`
- 但 `src/api/index.js` 仅导出 `download`（POST form-urlencoded）与 `downloadGet`（GET），无 `downloadJson`

## 修复方案
- 在 `src/api/index.js` 新增 `downloadJson(url, data, filename)` 函数
- 内部调用 `createBlobDownloadRequest(POST(url, data, { responseType: 'blob', noMessage: true }), filename)` 以 JSON 格式 POST 并下载文件
- 用法与 `exportHouse` 接口一致，传入 `projectIds` 数组等 JSON 参数

## 验证与归属
- 构建已通过验证；若 dev 仍报错可重启一次 `npm run dev`
- 涉及文件：`buildingTable/index.vue`、`project/index.vue`、`src/api/index.js`
- 所属项目：惠山二期G；来源会话：c97a341a-e901-4694-932b-d2c0da48f539；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "api_downloadjson_fix",
  "source_extraction_id": "d85cbb648e8e403383b0530c413db0a8",
  "version": 1,
  "memory_type": "entities"
}
-->