# 全局响应ID解析修复
苏州市房地产监测V3 新增 `resolveResponseId` 公共函数并全局排查替换，统一处理响应ID解析以防跳转到 `/null`。

## 公共层改动
- `ruoyi.js` 新增 `resolveResponseId(response, primaryKey)`，兼容 `data` 为标量/对象、顶层 `id` 等返回格式
- `main.js` 将 `resolveResponseId` 挂载到 Vue 原型，各页面可通过 `this.resolveResponseId(...)` 调用
- `changeFormState` 在 view 模式拦截 `null`/`undefined`/`'null'` 等无效 ID，避免跳转到 `/null`
- `detailMixins.addCallback` 默认新增回调改为使用 `resolveResponseId(response, this.primaryKey)`

## 批量修复
- 24 个仅用 `response?.id` 的文件（supervision 23 + repairFunds 1）已全部替换
- 29 个已有 `response?.data`/`id||data` 写法的文件已统一

## 涉及文件与归属
- 涉及：`ruoyi.js`、`main.js`、`supervision/agreement/account/detail.vue` 等
- 所属项目：苏州市房地产监测V3；来源会话ID：48d8443a-2b9b-4362-94b9-0e8c065800e4

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_resolve_response_id",
  "source_extraction_id": "fcd6806d2909436b9c03c10e7af28512",
  "version": 1,
  "memory_type": "entities"
}
-->
