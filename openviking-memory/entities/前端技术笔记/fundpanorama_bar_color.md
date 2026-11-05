
# 资金全景支出柱图需传 uniformBarColor
园区物管2.0 资金全景各类支出分布柱图与收入图共用 renderCategoryBar，未传第三参 uniformBarColor 会回落 mock 配色。

## 问题根因
- dataSandbox/fundPanorama 中「各类支出分布」与收入图共用 renderCategoryBar
- 未传第三个参数 uniformBarColor 时，柱体使用 mock.js 里 expenseByCategory.colors 逐柱配色，偏离设计稿单色要求

## 解决方案
- 若设计稿要求整图单色（如 #FFA94D），应在 initCharts 中与收入图一致传入第三参
- 具体调用形式：this.renderCategoryBar(this.$refs.expenseBarRef, expenseByCategory, '#FFA94D')，四根柱子都会是 #FFA94D
- mock 内 colors 可与展示解耦单独维护；若希望 mock.js 里的 colors 也与展示一致可再改

## 验证与归属
- 验证：会话 418857f1 用户要求各类支出分布柱体全部 #FFA94D，结论指出未传 uniformBarColor 根因及 index.vue 修改行（参考 园区物管2.0/061.md）
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/index.vue、zhi2-web-admin/src/views/benefit/dataSandbox/fundPanorama/mock.js
- 所属项目：园区物管2.0；来源会话：418857f1-8122-4137-97aa-db7576f9cb72；代码基线：f00310232


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "fundpanorama_bar_color",
  "source_extraction_id": "b738ee7b0ab3417382b2153d311bb087",
  "version": 2,
  "memory_type": "entities"
}
-->