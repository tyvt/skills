- ruoyi.js 新增 resolveResponseId(response, primaryKey) 兼容标量/对象/顶层 id，统一挂载 Vue 原型
- changeFormState 兜底拦截 null/undefined/'null'，detailMixins.addCallback 默认调用该解析
- supervision 与 repairFunds 共 53 个文件批量替换原响应 ID 解析写法

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "响应ID解析统一写法",
  "source_extraction_id": "9e54f66bae9c41bab41d42c2c7413b3d",
  "version": 1,
  "memory_type": "preferences"
}
-->