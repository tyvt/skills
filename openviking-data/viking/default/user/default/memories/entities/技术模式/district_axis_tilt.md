# 监管账户横坐标动态留白倾斜
苏住房G监管账户(mapOverview)图表按区县数量动态调整x轴留白与标签倾斜，避免标签遮挡。

## 问题背景
- 原grid.containLabel为false且底部留白固定34，区县较多时横坐标标签相互遮挡

## 解法要点
- chartOptions.js的buildDistrictManageOption设grid.containLabel:true
- 底部留白：区县数>6时为64，否则为52
- 区县数>6时x轴标签35°倾斜、align:right、margin:12、fontSize:13、interval:0
- index.vue图表容器加chart-box--district-count类，padding-bottom:10px

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 来源会话：725e800e-590a-4121-bcda-f06988a87527
- 来源：苏住房G/044.md；会话725e800e-590a-4121-bcda-f06988a87527
- 涉及文件：benefit/mapOverview/chartOptions.js、benefit/mapOverview/index.vue、components/Panel.vue、mock.js、package.json
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "district_axis_tilt",
  "source_extraction_id": "bbef648410d54c61896564bae729c765",
  "version": 1,
  "memory_type": "entities"
}
-->