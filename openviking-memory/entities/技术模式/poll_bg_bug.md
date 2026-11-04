# pages_poll 中因使用 ../.. 导致的背景图片故障
文件 `src/pages_poll/result.vue` 和 `form.vue` 错误地使用了 `../../static/images/bg_szf.png`，解析到了不存在的 static 目录；已使用别名路径修正。

## 问题根因
- `src/pages_poll/result.vue` 和 `form.vue` 使用了相对路径 `../../static/images/bg_szf.png`
- 该路径解析到了不存在的 static 根目录，导致加载失败

## 解决方案
- 替换为别名路径 `url("@/static/images/bg_szf.png")` 以修正引用

## 验证与归属
- 验证证据: extracted source=cursor session=1b86fe06-0678-4ce4-b9df-fbd51273d5c6
- 涉及文件: src/pages_poll/result.vue, src/pages_poll/form.vue
- 所属项目: Huishan Fase 2 H5; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "poll_bg_bug",
  "source_extraction_id": "17091e7715aa4ddb9e280040c40385ed",
  "version": 1,
  "memory_type": "entities"
}
-->