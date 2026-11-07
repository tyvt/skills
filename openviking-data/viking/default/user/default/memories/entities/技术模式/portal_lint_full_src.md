# 门户 npm run lint 仍扫描整个 src
门户项目执行 `npm run lint` 会扫描整个 `src/**/*.{vue,js}`，并非仅查指定文件。

## 行为
- `npm run lint` 仍会扫整个 `src/**/*.{vue,js}`，未只查 `index-new.vue` 或 `portalTheme.js` 等
- 全项目约 3506 条 ESLint 问题（多为 `semi` / `quotes` 等风格项），不能据此判断单次改动单独有问题
- 未对本次 CSS 或配色改动做针对性 eslint 结论

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：zhi2-web-admin/package.json
- 所属项目：门户；来源会话ID：d6e2d37c-78bf-4548-8cba-1179801832f4 与 b642c935-7aec-4bc3-b375-5091c39f01f7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_lint_full_src",
  "source_extraction_id": "d234bc9ccd6643378e099501fc46712e",
  "version": 1,
  "memory_type": "entities"
}
-->