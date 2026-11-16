# 导航栏标题字号与激活边框宽度修复
苏住房G（zhi2-web-admin）Navbar 重构后系统名称字号与菜单激活边框宽度不一致，2026-11-16 改为对齐苏州市房地产监测V3 的实现。

## 问题根因
- `.title` 被重构为 24px/700/行高 30，比 V3 `.navbar__title` 的 21px/600 偏大，即「系统名称字号不一致」。
- 激活边框用固定 144px×72px 的 `.nav-item::before`，而 `.nav-item` 基准宽 118px、激活 `flex-basis:144px`；长标题「公共信息查询」文字顶到边框甚至溢出，短标题「工作中心」留白过大，即「每个菜单项激活的边框宽度不一致」。
- 附带跳动：激活项撑宽 26px、激活文字 14px→16px。

## 修复方案
- `.title` 改 21px/600/行高 28，与 V3 `.navbar__title` 完全对齐；菜单文字统一 14px，去掉激活 16px。
- `.nav-item` 改内容自适应 `flex:0 0 auto; min-width:96px; padding:0 16px`，移除激活 `flex-basis:144px` 撑宽。
- `.nav-item::before` 由固定 144px 改为 `left:0; width:100%`（父级已 position:relative），框宽随内容、内边距一致。
- 只改 `zhi2-web-admin/src/layout/components/Navbar.vue` 的 scoped CSS，不动模板/逻辑。

## V3 参考实现
- V3 Navbar.vue（2026-11-13 版本）标题 `font-size:21px`、weight 600；`.nav-item` `flex:0 0 auto; min-width:96px; padding:0 16px; border:1px solid transparent`，gap 4px。
- V3 激活框是单个滑动指示器 `.navbar__nav-indicator`（absolute、height 64px、border 1px solid rgba(255,255,255,.5)、圆角 13px），JS 用 `activeEl.offsetWidth/offsetLeft` 设宽与 translateX；本次只对齐「框随内容宽」原则，未整体移植指示器。

## 验证与提交
- 实测：标题 21px/600/行高 28；激活框宽=该项宽（4 字 96px、「公共信息查询」116px），均 72px 高、1px 边框。
- ESLint exit 0；`npm run build` 通过；`e2e/home-v2/navbar-visual.spec.mjs` 视觉相似度 100%，溢出滚动/空权限通过，像素基准 `navbar-reference.png` 已重生成。
- 子模块 zhi2-web-admin 提交 `0b586047c`、父仓 `820eaa4`，均推送 develop/v2.6.2-suzhufang，本地与远端 SHA 一致。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_restyle_fix",
  "source_extraction_id": "3cc1b156953c4529983798f41f2ebca3",
  "version": 1,
  "memory_type": "entities"
}
-->