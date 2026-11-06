# RepairPanel环形图零数据渲染修复（苏住房G）
苏住房G 项目首页报事报修卡片在合计为0时环形图不渲染的问题已修复。

## 问题根因
- RepairPanel.vue 中 donutOption 在报修+报事合计为0时直接返回 null，导致右侧环形图整块不渲染。

## 修复内容
- 合计为0时外环用等分占位扇区，中心显示「合计 0」。
- 加载完成后始终渲染环图，mini 缺失时左侧 mini 统计仍用 0 / - 展示。
- 报事扇区颜色改为 #068a17，与左侧「报事工单」一致。
- 增加对 data.mini 的监听与 chartKey，数据更新后图表重绘。

## 验证与归属
- 验证：刷新首页，在「报事报修 → 当月数据」下确认数据为0时显示双色环图和中心「合计 0」。
- 所属项目：苏住房G；来源会话：924b8810-8efe-480c-aa95-850668e480b6；验证证据：extracted source=cursor project=苏住房G
- 涉及文件：src/views/home/v2/components/RepairPanel.vue、src/views/home/v2/components/PublicBenefit.vue

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "repair_panel_donut",
  "source_extraction_id": "279471c0bd4d496fa41824438d6b5de4",
  "version": 1,
  "memory_type": "entities"
}
-->