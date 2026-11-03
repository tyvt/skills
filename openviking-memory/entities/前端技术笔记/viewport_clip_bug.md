# 数据大屏固定视口布局裁切与滚动三坑
数据沙箱类大屏页采用固定视口+transform 缩放时，stage 锁高与 overflow:hidden 会裁掉坐标轴并导致留白横跳。

## 现象
- 大屏/全景仪表盘页（assetPanorama）要常规显示器不纵向滚动，压缩后出现 X 轴看不见、下方留白、横向留白反复横跳。

## 根因
- ECharts 横向条形图 grid.bottom 仅 4px 且 xAxis.axisLine.show:false，数值轴刻度无空间。
- stage 用 flex:1 + height:100% + overflow:hidden 锁高，内容撑不出滚动条，设计区写死 height 让 scrollHeight 与可视不一致。
- 外层 scale-clip 与 .chart-block__canvas 默认 overflow:hidden 裁掉贴边坐标轴。

## 修复做法
- grid.bottom 给到 32 左右并画浅灰轴线；scale-clip 改 overflow-x:hidden + overflow-y:visible，高度按 effectiveDesignH*scale 取整多留 16px。
- stage 改 flex:0 0 auto + min-height:100% + height:auto，纵向溢出交最外层 overflow-y:auto 滚动；设计区去掉固定 height 只留 minHeight + transform；图表 canvas 提高选择器优先级改 overflow:visible。
- 通用原则：大屏自适应布局中固定视口+transform 缩放时，滚动权必须唯一归属最外层容器，中间层一律 visible。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/benefit/dataSandbox/assetPanorama/index.vue；所属项目：园区物管2.0；来源会话 ID：d9192f5b-c2bf-4f01-ba6a-ecefdcde18d0；代码基线：f00310232。
- 验证：会话列出 grid.bottom=4px、stage flex:1+overflow:hidden、scale-clip overflow:hidden 三类根因及逐项修改。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "viewport_clip_bug",
  "source_extraction_id": "ac7ed565a11941f68e3ba3d720da30ae",
  "version": 1,
  "memory_type": "entities"
}
-->