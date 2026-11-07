# buildDetailPathFromRoute 非 tableid 路由拼接缺陷
惠山二期G zhi2-web-admin 待办按 busCode 解析详情路由时，非 tableid 路径误拼主键导致 push 失败或进错页的缺陷与修复。

## 现象
- `buildDetailPathFromRoute` 在路径既非 detail `filePath`、又不含 `:tableid` 动态段时，仍可能把 `id` 直接拼在 `basePath` 末尾（无 `/`），生成如 `/benefit/module` + `uuid` → `/benefit/moduleuuid`，致使 `push` 失败或进错页。

## 修复方案
- 该分支应 `return null`，交给下方 `name` + `params` / `storedPath` 兜底。
- 若业务确认需「path 末段 + id」，须显式 `${basePath}/${id}` 并与动态路由注册约定对齐。

## 验证与归属
- 验证：会话 26959102 HIGH「buildDetailPathFromRoute 非 tableid 路由可能错误拼接主键」，文件 ruoyi.js:273-286, 346-351。
- 涉及文件：zhi2-web-admin/src/utils/ruoyi.js。
- 所属项目：惠山二期G；来源会话：26959102-f851-4ffb-b534-01c3957b3e3e；代码基线：adccd7e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "build_detail_path_route",
  "source_extraction_id": "e266f60fb5ce435cac9f28e7d8ae0a88",
  "version": 1,
  "memory_type": "entities"
}
-->