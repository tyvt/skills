# 维护类接口前缀批量迁移 maintenance→dataProperty
全局把维护类接口前缀从 /maintenance/ 换成 /dataProperty/ 时，需同时覆盖拼接式调用并防止误伤前端 import 路径。

## 问题根因
- 直接写死字符串的接口路径与 moduleName+businessName 拼接式调用（如统一 request 封装按模块名拼 URL）是两种调用点，后者易残留旧前缀
- 全局字符串替换会把 import '@/views/maintenance/...' 这类前端页面路径误替换成 dataProperty，导致编译报错
- 接口前缀与前端目录名可能同名但含义完全不同

## 解决方案
- 批量迁移接口前缀时同时覆盖字面量 URL 与 moduleName/businessName 拼接点（可按 businessName 是否属于目标接口判定）
- 替换范围限定在接口路径上下文，替换后必须复查 @/views/ 等 import 路径是否被误伤并恢复
- 收尾用旧路径残留 grep 复查归零

## 验证与归属
- 验证证据：会话 2a1a3c5d，49 个文件替换后，发现并恢复 3 处被误改的 import '@/views/maintenance/...'
- 涉及文件：zhi2-web-admin/src/api/index.js；zhi2-web-admin/src/views/maintenance/facility/index.vue
- 所属项目：产品2.0；来源会话ID：2a1a3c5d-9f69-436a-93ed-f2b987edfc4a；代码基线：6cf33a8

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "api_prefix_migration",
  "source_extraction_id": "b458b054e1c74a3cbbd66c380cfde872",
  "version": 1,
  "memory_type": "entities"
}
-->