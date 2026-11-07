
- `zsDialog` 仅支持 `mini`（616px × 60% 视口高）和 `medium` 两种尺寸，不支持 `small`；使用时必须指定 `zs-size="mini"` 或 `zs-size="medium"`。
- 导入失败弹窗（zsImport）始终使用 `zs-size="mini"` 保持 616px 宽度；失败时通过 `custom-class="zs-import-error-dialog"` 将高度改为按内容自适应（`height: auto`，最高 70vh），错误列表区域限制在 `max-height: 320px` 内滚动。
- 涉及文件：src/components/zsImport/index.vue、projectinfo/components/table.vue、utils/index.js。
- 适用于兴化物管 zhi1-web-admin 项目。


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "zsDialog尺寸约定",
  "source_extraction_id": "adc485e9091141abb2f104e13b56d0c6",
  "version": 1,
  "memory_type": "preferences"
}
-->