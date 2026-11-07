# UnoCSS 类名需加 display- 前缀
项目 UnoCSS 经 uno.config.ts 生成 display-inline-block 而非 inline-block，标签类名需改为 display-inline-block 以自适应宽度。

## 问题根因
- 项目 UnoCSS 经 uno.config.ts 生成 display-inline-block 而非 inline-block 类名

## 解决方案
- 在 src/pages_owner/decision/index.vue 将标签类名改为 display-inline-block 以自适应宽度

## 验证与归属
- 所属项目：H5
- 验证证据：extracted source=cursor project=H5
- 验证证据：src=H5/001.md
- 涉及文件：uno.config.ts、src/pages_owner/decision/index.vue
- 来源会话：f8bfc1e1-de62-4572-bfc7-20b21efe668e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "unocss_display_prefix",
  "source_extraction_id": "4912fc41379d43e8b448ed8171c58129",
  "version": 1,
  "memory_type": "entities"
}
-->