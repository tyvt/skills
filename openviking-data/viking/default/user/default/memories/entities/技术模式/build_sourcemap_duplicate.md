# vite.config.ts 中 build.sourcemap 重复定义触发警告
vite.config.ts 中 build.sourcemap 重复定义会触发 Duplicate key 警告，需合并为单一条件配置。

## 问题现象
- vite.config.ts 中 build.sourcemap 重复定义触发 Duplicate key 警告

## 解决方案
- 合并为单一 build.sourcemap 配置
- 根据 UNI_PLATFORM 条件赋值

## 验证与归属
- 验证证据：extracted source=cursor project=i-H5
- 验证证据：src=i-H5/001.md
- 涉及文件：vite.config.ts
- 所属项目：i-H5；代码基线 none；来源会话 fc61c1ee-9ad7-4ba4-9fe6-cff205ed2251

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "build_sourcemap_duplicate",
  "source_extraction_id": "7bf82be17f474ef1b475cb00d486216c",
  "version": 1,
  "memory_type": "entities"
}
-->