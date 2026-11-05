# 门户 flow-step 单元格 CSS 审查结论
门户首页 flow-step 相关 CSS 改动方向正确，但存在窄屏对齐与 key 稳定性隐患。

## 审查结论
- 针对「标签挤进下一格」的 `min-width: max(…, min-content)` + `flex-shrink: 0` 方向正确，结论为 Warning 可合并
- 箭头固定 `12px` 而 `padding-right` 用 `dw(14)` 在窄屏可能不对齐
- 窄屏整行可能横向溢出
- 模板步骤 `:key="si"` 建议改为稳定业务键

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue
- 所属项目：门户；来源会话ID：d6e2d37c-78bf-4548-8cba-1179801832f4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "flow_step_cell_css_review",
  "source_extraction_id": "d234bc9ccd6643378e099501fc46712e",
  "version": 1,
  "memory_type": "entities"
}
-->