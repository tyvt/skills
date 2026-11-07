# require运行时取图替换为静态引用
将 `require()` 运行时取图逻辑全量替换为静态引用，替换后须全局排查与构建检查。

## 问题描述
- `cardData.vue` 等文件使用 `require()` 运行时取图，存在构建与可维护性风险

## 解决方案
- 将 `require()` 运行时取图逻辑全量替换为静态引用（如 import 或静态路径）
- 替换后须全局 grep 排查遗漏的 `require(` 调用
- 执行 lint 或构建检查保障语法正确

## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 验证证据：src=2-0/012.md
- 涉及文件：cardData.vue
- 来源会话ID：7f3a94cb-db80-4ba1-862b-a2f18103f547；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "require_static_import_pattern",
  "source_extraction_id": "e1697a5b28f1459ca244bb8203dedf0c",
  "version": 1,
  "memory_type": "entities"
}
-->