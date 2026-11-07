# 详情表单中 gap 与 padding 的重叠
在 Suzhou Real Estate Monitoring V3 项目中，详情表单的垂直间距因 padding-bottom 与 row-gap 的重叠而不均匀。

## 问题根因
- 原始的垂直间距来自于 .el-form-item 中的 padding-bottom 加上 row-gap，导致不一致。

## 解决方案
- 在 variables.css 中，--detail-block-gap 改为 24px。
- 在 detail-form.scss 中，表单项的 padding-bottom 设为 0，间距由 gap 负责。
- 仅在没有堆叠 el-row 的 .el-dialog__body 上使用 padding-bottom，以避免与 zs-form 的 row-gap 重叠。

## 文件与验证
- 涉及文件: variables.css, detail-form.scss, vite.config.js, index.scss, element-ui.scss, detail.vue, zs-dialog.vue.
- 验证证据: src=苏州市房地产监测V3-rest/056.md; session 14ac23b1-f562-46c6-80d9-d8e3b7a96870.

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：14ac23b1-f562-46c6-80d9-d8e3b7a96870


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "detail_form_gap_padding",
  "source_extraction_id": "ab08f4474f3d4570b5cc83bd74d094a3",
  "version": 1,
  "memory_type": "entities"
}
-->
