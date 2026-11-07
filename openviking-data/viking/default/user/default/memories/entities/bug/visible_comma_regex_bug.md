# visible 逗号正则改坏致构建失败
苏州市房地产监测V3 前端为 contentInfo 批量补 visible 时正则误改约 55 处代码，导致 npm run build 失败，现已修复。

## 根因
- props / watch 里的 `visible: {` 被误写为 `visible: {,`（如 OrgTypeDialog.vue、MobileSimulator/index.vue 等，共约 55 处）
- contentInfo 里 visible 行末尾缺逗号，下一行是 dot:、type: 等时语法错误（如 building/unit/detail.vue）

## 修复方式
- 全局把错误的 `visible: {,` 改回 `visible: {`
- 在合法的 `visible: ...` 与后续属性之间补上缺失逗号（仅限表达式形式的 visible，不动 `visible: { type: ... }` 这类 prop 定义）
- Sass `@import` 的 deprecation 是原有警告，与本次无关

## 涉及文件
- OrgTypeDialog.vue、MobileSimulator/index.vue、building/unit/detail.vue
- zhi2-web-admin 下的 zs-dialog.vue、detail-template.vue 等

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：c9cf03c0-26f2-4824-930b-cef3b4dedcda；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "visible_comma_regex_bug",
  "source_extraction_id": "d465aecbeb4342b69de5b9a977f1992c",
  "version": 1,
  "memory_type": "entities"
}
-->