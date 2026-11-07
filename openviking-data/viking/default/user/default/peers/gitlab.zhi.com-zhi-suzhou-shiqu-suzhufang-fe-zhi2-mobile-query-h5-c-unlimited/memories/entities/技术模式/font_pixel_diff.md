# 参考站Figma字体未加载导致像素差
在 zhi2-mobile-shimin（苏住房C）移动端项目中，对比参考站截图发现字体、状态标签样式与标点符号存在差异；根因是参考站加载 Figma 字体而本端使用系统默认字体栈，两者渲染不同导致像素差（2026-11-06 决策放弃字体包、改用系统字体，像素差被接受）。

## 问题根因
- 参考站加载 Figma 字体，本端使用系统默认字体栈，两者渲染不同，文字像素差仍存在但属预期（2026-11-06 决策沿用系统字体）
- 差异还体现在状态标签样式与标点符号的呈现不一致

## 解决方案（2026-11-06 最新决策）
- 放弃 Figma 字体包，直接使用系统默认字体栈 `-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif`
- 移除 theme.css 全部 6 条 @font-face 规则，将 ref8443.css / theme.css 的自定义字族（'Noto Sans SC:*'、'Plus Jakarta Sans:*'）统一替换为系统字体栈
- 删除约 11MB 未引用的字体包文件 src/static/fonts/ref8443/
- 对照参考站 CSS 逐项修正，包括 header、筛选条等组件样式

## 验证与归属
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源：2026-11-06 会话（字体包移除实施见消息 [0]-[66]，早期像素差分析见消息 [3][20]）

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "font_pixel_diff",
  "source_extraction_id": "8b182577b71e485f9576722872861b8c",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->