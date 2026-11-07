# 园区物管V0 饼图百分比合计归一化
园区物管V0 的表决饼图曾因各扇区单独四舍五入导致百分比合计略超 100%，已用最大余额法修复。

## 问题根因
- 各扇区单独四舍五入到两位小数，累加后可能略大于 100%（如 84.49% + 9.07% + 6.45% = 100.01%）
- 影响「表决户数占比」「表决面积占比」等 5 个饼图及 19 个含 drawPie 的 JS 文件

## 解决方案
- 新增 vote/component/piePercentUtil.js 提供统一归一化工具 PiePercentUtil
- 采用最大余额法：先向下取整，再把余量分配给余数最大的项，保证各项之和恰好为 100%
- 更新 vote/component/pieChartCom.js 修复 5 个饼图
- 批量更新 19 个含 drawPie 的 JS 文件（votePreview.js、ownerVote 预览、vote/mtpl/mfap 详情页）
- 更新 18 个 shtml 页面，在 pieChartCom.js 之前引入 piePercentUtil.js

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管V0
- 涉及文件：vote/component/piePercentUtil.js、vote/component/pieChartCom.js、votePreview.js 等
- 所属项目：园区物管V0；来源会话ID：be9616f8-0da6-4e20-a64e-2ae5ed979631

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "pie_percent_util",
  "source_extraction_id": "699078b4f19642a0bb7063574b980cd1",
  "version": 1,
  "memory_type": "entities"
}
-->