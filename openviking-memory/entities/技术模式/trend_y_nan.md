# 柱线混合趋势图自算 Y 轴刻度需先过滤非有限值
苏住房G 首页 RepairPanel.vue 趋势图用 Math.max(0, ...数组) 驱动显式 min/max 刻度，遇 null 整轴 NaN 失效。

## 问题根因
- buildTrendYScale 后用 Math.max(0, ...bar, ...doneLine, ...undoneLine) 驱动刻度
- spread 进 Math.max 后只要有一个 null/undefined/非数字结果即 NaN，传进显式 min/max/interval 的 yAxis 致整图崩
- 接口或映射偶发空值、非法数值时必现；显式 min/max 让问题从偶发脏点变整图失效

## 解决方案
- 先过滤再取最大值：reduce 里对 Number(v) 做 Number.isFinite 判断，或 map(Number).filter(Number.isFinite) 后 Math.max(0, ...)
- 保留 maxVal<=0 时回落 0–10 / interval 2 兜底，避免全零数据 max===min
- grid.left:8 依赖 containLabel:true，大数值仍可能裁切，改完须在目标分辨率截图确认；buildTrendYScale 放 script 顶层勿挪进 data

## 验证与归属
- 验证：会话 2caad9cb 审查 RepairPanel.vue 判出 Math.max 含 null 致 NaN 与 grid.left 裁切两条 MEDIUM
- 涉及文件：zhi2-web-admin/src/views/home/v2/components/RepairPanel.vue
- 所属项目：苏住房G；来源会话：2caad9cb-0616-4022-a3ba-01eadd581393；代码基线：9e5c499

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "trend_y_nan",
  "source_extraction_id": "e51aeec6c7bc4201bc8f7a1fbfce615b",
  "version": 1,
  "memory_type": "entities"
}
-->