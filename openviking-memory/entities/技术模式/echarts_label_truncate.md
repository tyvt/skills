# ECharts 环形图外侧标签截断
home/v2 首页「报事报修→当月数据」环形图外侧标签被截成「...」，同页公共收益饼图显示正常。

## 问题根因
- 环形图圆心与 radius 占满容器宽度，两侧无 guide label 横向空间
- series.label 默认 overflow:'truncate' 且可分配宽度不足时截断文本为「...」
- 非数据或字号问题，而是「几何布局未留位」+「label 默认截断」两默认值叠加

## 修复方案
- 饼图整体左移/右移或缩小 radius，使圆心居中并显式留左右留白
- 显式设置 series.label 的 formatter:'{b}'（只显系列名）与 overflow:'none'（不截断）
- 标签仍偏出则收 labelLine 长度/加 labelLayout，而非调小字号
- 改造同类图表优先「照抄同页已正常的那张图的 option」

## 验证与归属
- 验证证据：会话 1f0561f1（2026-09-22，基线 15e201a）用户贴图反馈 label 不清，改动仅 RepairPanel.vue 的 donutOption
- 验证通道：node preview/serve.mjs 8199 打开 home-v2-preview.html 目视确认，或写 preview/probe-donut.mjs 探测
- 涉及文件：home/v2/components/RepairPanel.vue、PublicBenefit.vue、EChartsBox.vue、preview/probe-donut.mjs、vite.preview.config.js
- 所属项目：苏住房G；来源会话：1f0561f1-d84f-4c28-877d-7a24819a2672；代码基线：15e201a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_label_truncate",
  "source_extraction_id": "294a6804316941388d16116e511fd383",
  "version": 1,
  "memory_type": "entities"
}
-->