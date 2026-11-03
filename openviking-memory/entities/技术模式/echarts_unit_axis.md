# ECharts右侧单位不附刻度的孪生Y轴
苏住房G首页仪表盘图表需求右侧补单位「（件）」而不要第二套刻度，借隐藏刻度标签的孪生Y轴用axis name承载单位。
## 误做与正解
- 常见误做再画完整yAxis导致右轴多刻度数字与横线，或把单位拼进左轴name致左边拥挤
- 正解：造专用放文字的轴，右轴做成不可视数据轴，只用name当单位标签
## 配置要点
- 两yAxis：左轴原样含刻度/轴标签/splitLine；右轴name:'（件）'、nameLocation:'end'、nameGap:12，关掉axisLine/axisTick/axisLabel/splitLine（全show:false）
- 数据系列显式yAxisIndex:0绑左轴
- grid.right由16调为28承接文字，否则name被画布右缘裁掉
## 验证与归属
- 预览环境图表容器高度0会看起来没生效，需在真实数据本地环境核对
- 与小程序端ECharts经验不同（涉及定制裁剪包/同层渲染），Web端纯配置技巧
- 涉及文件：home/v2/components/RepairPanel.vue、tests/e2e/home-v2.spec.mjs
- 所属项目：苏住房G；来源会话：2cbdebe1-6e3a-4685-97c1-159d222e3131；代码基线：9e5c499

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_unit_axis",
  "source_extraction_id": "dcd170cd1ed947ccac43a5f904fd01c7",
  "version": 1,
  "memory_type": "entities"
}
-->