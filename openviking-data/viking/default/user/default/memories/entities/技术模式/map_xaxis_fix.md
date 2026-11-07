# 监管账户数量横坐标显示修复（苏住房G）
苏住房G 数据分析-数据可视化页「监管账户数量」横坐标修复，区县多时标签不再被截断。

## 改动文件
- `zhi2-web-admin/src/views/benefit/mapOverview/chartOptions.js`：buildDistrictManageOption 设 grid.containLabel: true，底部留白随区县数调整（>6 个为 64，否则 52，原为 34 且 false）；区县 >6 时 x 轴标签 35° 倾斜，设 align:'right'、margin:12、fontSize:13、interval:0 保证全部区县名显示
- `zhi2-web-admin/src/views/benefit/mapOverview/index.vue`：图表容器增加 chart-box--district-count，padding-bottom:10px 避免倾斜标签贴 panel 内缘

## 项目归属
- 所属项目：苏住房G（zhi2-web-admin）
- 验证：extracted source=cursor project=苏住房G；来源会话ID 725e800e-590a-4121-bcda-f06988a87527

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "map_xaxis_fix",
  "source_extraction_id": "b2f3d9a5d671411b9686578f48730eea",
  "version": 1,
  "memory_type": "entities"
}
-->