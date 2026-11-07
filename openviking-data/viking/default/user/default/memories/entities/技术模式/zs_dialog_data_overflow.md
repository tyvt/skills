# 数据量不可控的 zs-dialog 弹窗溢出
当详情页打开承载多个数据区块的 zs-dialog 弹窗时，数据量超出视口会将标题栏和关闭按钮顶出屏幕外，导致无法关闭。
## 问题根因
- zs-dialog 默认按内容自动计算高度且不设上限，内容高度不受视口约束。
- 数据量不可控的弹窗（如综合查询弹窗同时展示开发企业、物业企业、物管会、业委会）必须自行兜底。
## 解决方案
- 在弹窗组件自身样式（非调用方 detail.vue）加整体 max-height（如 88vh）。
- 内容区 .dialog-box 设 overflow-y:auto，超长内容在弹窗内滚动。
- 标题栏固定顶部，关闭按钮始终可见。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 fe6a9c71 物业管理区域备案详情页综合查询弹窗过长无法关闭。
- 修复文件：zhi2-web-admin/src/views/property/complex/components/StatisticsDialog.vue、zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue。
- 所属项目：产品2.0；来源会话ID：fe6a9c71-d8dc-4321-9d4d-34e4729e5e46；代码基线：a357f32。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_data_overflow",
  "source_extraction_id": "95867fed974048d29a326f877b61667d",
  "version": 1,
  "memory_type": "entities"
}
-->