# 弹窗表格宽度测量坑
苏州市房地产监测V3 中弹窗表格在开场缩放动画中因宽度量错导致表格未撑满、布局错乱的根因与修复要点。

## 根因
- `zs-dialog` 开场动画为 CSS `transform: scale()`，`getBoundingClientRect()` 返回变换后的视觉矩形而非布局宽度（clientWidth 从第一帧起即终值）
- Playwright 采样：t=153ms 时 getBoundingClientRect width=167 而 clientWidth=1240，t=464ms 才一致
- `extra ≤ 0` 时约定为「基础宽度已超出容器」放弃拉伸，导致误判不撑满
- `ResizeObserver` 不感知 transform 变化，无第二次修正机会

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/components/zs-select-dialog/SKILL.md、zhi2-web-admin/src/views/commercialHousingSales/presale/exchangeContract/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：56089445-c88b-4040-b19b-eb28da60279d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_scale_width",
  "source_extraction_id": "f45b2d9001e245ccb9ed80599939ed23",
  "version": 1,
  "memory_type": "entities"
}
-->