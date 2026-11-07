# 工单统计图表穿屏与空白修复
泰兴小程序统计概览-工单统计图表因旧版 canvas 渲染与日期格式化问题显示异常，已修复并出包。
## 问题根因
- 旧版 `<canvas canvas-id>` + `ctx.draw()` 渲染导致图表穿屏与工单趋势空白。
- `ZsMonthRangeCalendar` 的 `formatMonth` 使用 `new Date('2...')` 在 iOS 存在兼容问题。
- 多图表并发初始化未串行化导致串台。
## 解决方案
- `echarts-uniapp.vue` 改用 `<canvas type="2d">` 同层渲染，节点查询 `fields({node,size})` + dpr 缩放。
- 模块级 Promise 队列串行化 init，尺寸重试 20×100ms。
- `ZsMonthRangeCalendar.vue` 的 `formatMonth` 改用 `dayjs().year(y).month(m-1).date(1).format(...)`。
## 验证与归属
- 验证证据：src=泰兴小程序
- 涉及文件：src/staff/pages/components/echarts-uniapp/echarts-uniapp.vue、src/staff/components/ZsMonthRangeCalendar/ZsMonthRangeCalendar.vue、src/pages/staff/statistics/index.vue
- 来源会话ID：ad70e25f-8d4b-4189-a874-e4ee471ab959
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_render_fix",
  "source_extraction_id": "631ebc59479242c29a9efec9b009a2b7",
  "version": 1,
  "memory_type": "entities"
}
-->