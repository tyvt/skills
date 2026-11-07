- 小程序 canvas 渲染 ECharts 图例易缺色且饼图尺寸过大导致穿屏，需特殊处理。
- 将 `legend` 设为 `{show:false}` 并用 Vue 渲染彩色圆点替代默认图例。
- 饼图 `radius` 改为 `38%-58%`、`center` 改为 `50%,50%`。
- chart 容器加 `overflow:hidden` 防止穿屏。
- 同步加固 `echarts-uniapp` 组件。

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "小程序ECharts图例与饼图样式",
  "source_extraction_id": "75e2a66b692d45b087fc5f6610906d1c",
  "version": 1,
  "memory_type": "preferences"
}
-->