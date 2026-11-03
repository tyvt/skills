# 详情页外层 el-col 挤压表单
园区公共收益项目详情页为对齐子表宽度在 zs-form 外再包 el-col，会把整页挤到左侧约四成。

## 问题根因
- 在已有 el-row 下给整块 zs-form 再套一层 el-col，触发 Element 横向 flex
- el-col 只占默认栅格宽度，表单区被压到左侧、右侧大面积留白
- 会话结论：页面被挤到左侧是上次为对齐表格宽度在外层加 el-col 引起的

## 解决方案
- 去掉外层包裹用的 el-col，保持与同模块详情页一致
- zs-form 直接作为 el-row 子节点占满整行
- 子表宽度用表单内块级 width:100% 或子表容器样式微调，不要用额外 el-col 包整表

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/benefit/pubPaymentNotice/detail.vue、zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue、zhi2-web-admin/src/components/detail-template/detail-template.vue
- 所属项目：园区公共收益；来源会话ID：f53fddf6-9d9b-42a6-9a58-e51a3a7f7298；代码基线：7cc1625

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_elcol_bug",
  "source_extraction_id": "265d1891016b4a6484b2371a245ed467",
  "version": 1,
  "memory_type": "entities"
}
-->