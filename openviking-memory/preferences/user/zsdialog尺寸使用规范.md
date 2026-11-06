- 兴化物管 zhi1-web-admin 的 `zsDialog` 组件仅支持 `mini`（616px 宽 × 60% 视口高）和 `medium` 两种尺寸，没有 `small`。
- 导入失败等场景应始终使用 `zs-size="mini"`（616px 宽），并通过 `custom-class="zs-import-error-dialog"` 将高度改为按内容自适应（`height: auto`，最高 70vh），错误列表区域限 `max-height: 320px` 内滚动。
- 误用不存在的 `small` 尺寸会使弹窗失去宽高限制被撑满屏幕。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "zsDialog尺寸使用规范",
  "source_extraction_id": "9769ae46963547e4a96d7182fff41b5e",
  "version": 1,
  "memory_type": "preferences"
}
-->