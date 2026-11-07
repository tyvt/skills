- 团队安装方式保持单一 npm，避免 `node_modules` 布局漂移。
- 本机有 bun 时以 `bun run dev` 运行，`bun run` 可直读 npm 装的 `node_modules` 与 `.bin` shim，无需 `bun install`。
- 涉及文件：D:/repository/门户/package.json、D:/repository/门户/zhi2-web-admin/package.json、D:/repository/门户/zhi2-web-admin/README.md、D:/repository/门户/scripts/pm.mjs、D:/repository/门户/zhi2-web-admin/scripts/vite-build.mjs；验证 src=门户/026.md；来源会话 46380d5c-0a95-41db-8cf9-6ee63ac106ed

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "npm与bun运行规范",
  "source_extraction_id": "f9b649115aff4669b617dcea75122b02",
  "version": 2,
  "memory_type": "preferences"
}
-->