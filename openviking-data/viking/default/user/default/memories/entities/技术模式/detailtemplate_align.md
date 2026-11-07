# DetailTemplate 详情页字段对齐规范
详情页 DetailTemplate 只读态字段行须垂直居中、横向左对齐，任何字段禁止单独 align:'center'。

## 规范内容
- 垂直方向：标签与值在同一行内垂直居中（标签区与值区用 display:flex + align-items:center）
- 横向方向：一律左对齐，标签、文本、金额均左对齐；带操作按钮时文字在左、按钮在右
- 任何字段不得单独 align:'center' 或 labelAlign:'center'，否则与同行其他字段错位

## 解决方案
- 页面侧移除字段配置里的 align:'center'/labelAlign:'center'，金额字段统一 align:'left'
- 组件侧在 detail-template.vue 把行内单元格 align-items 改为 stretch 保证同行等高
- 改公共组件一处，所有详情页同时生效；字典标签在值区内也垂直居中

## 验证与归属
- 验证证据：会话 b7d66167，pubPaymentNotice/detail.vue 移除 center 配置，detail-template.vue 行内单元格改 stretch + flex 垂直居中
- 涉及文件：zhi2-web-admin/src/components/detail-template/detail-template.vue；zhi2-web-admin/src/views/benefit/pubPaymentNotice/detail.vue
- 所属项目：产品2.0；来源会话ID：b7d66167-3cc1-4c4a-8a14-79f95779a579；代码基线：49a7aa3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detailtemplate_align",
  "source_extraction_id": "b458b054e1c74a3cbbd66c380cfde872",
  "version": 1,
  "memory_type": "entities"
}
-->