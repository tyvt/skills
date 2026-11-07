
# 弹窗表单详情优先、列表补空合并回显
点击表格行打开弹窗时，先把行数据塞进 form 即时回显，再请求详情接口覆盖，详情缺失时保留行值。
## 方案说明
- 点击表格行打开弹窗时，先把点击行 row 塞进 form 即时回显
- 再请求详情接口，详情字段覆盖到 form
- 详情为空/缺失时保留 row 的值，避免「列表有值弹窗空白」
## 验证与归属
- 010.md 会话 a5ae1f4d：operatingAssets 弹窗带入列表那一条合并展示
- 涉及文件：src/views/benefit/statisticsMap/operatingAssets.vue
- 来源会话ID：a5ae1f4d-8f55-452a-94db-c33e62acddb7；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "popup_form_row_detail_merge",
  "source_extraction_id": "7cb162820bf54c0cb79063c7eae44880",
  "version": 1,
  "memory_type": "entities"
}
-->