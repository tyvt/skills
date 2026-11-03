# 首页v2像素验收JPEG基线卡点
苏住房G首页v2按设计稿做e2e像素对比要求95%相似度，实测仅89.4%，瓶颈在基线本身是JPEG截图而非布局。

## 现象与根因
- 设计稿为JPEG截图，存在重采样模糊、DCT压缩块噪声、字体渲染跨机差异，与布局无关且无法靠改CSS消除
- 直接调CSS会白改一轮，diff热力图差异弥散在所有面板的字号/间距/图表几何微差上

## 对照实验与解法
- 把基线自身做一次JPEG往返再与自身比对，看相似度上限；若远低于目标说明目标不可达，应停止改样式
- 用diff热力图区分「弥散微差」与「集中偏移」，集中偏移才是布局bug
- 换等价基线：让UI提供设计稿原始PNG，或以评审通过的实现截图作为回归基线（只换baseline.png）
- 像素对比仅作回归门禁，不作「100%还原设计稿」验收标准；UI还原仍以设计稿逐条目视为准

## 顺带修复
- import.meta.env在e2e取值不可靠、路由拦截用glob而非字符串匹配、隐藏菜单元素不可点击

## 验证与归属
- 来源会话f0540a8f（2026-10-16，基线4aafec3）：首页index-v2按设计图重做并接e2e像素对比，产出actual/diff/baseline.png+report.json
- 涉及文件：zhi2-web-admin/src/views/home/index-v2.vue、tests/e2e/home-v2-mocks.js、views/home/v2/components/TodoPanel.vue
- 所属项目：苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v2_jpeg_baseline",
  "source_extraction_id": "52723b29124e479cbd6d860437d400c6",
  "version": 1,
  "memory_type": "entities"
}
-->