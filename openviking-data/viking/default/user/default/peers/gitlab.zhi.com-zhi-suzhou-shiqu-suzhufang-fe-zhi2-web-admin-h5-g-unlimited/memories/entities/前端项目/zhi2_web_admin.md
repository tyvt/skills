# zhi2_web_admin
苏住房后台管理前端项目（仓库路径 zhi2-web-admin），顶栏等布局组件集中在 src/layout/components 下。

## 布局结构
- 顶栏组件为 `src/layout/components/Navbar.vue`。
- 品牌区变量 `--navbar-brand-width: 442px`（L772）；`.top-nav-container` 以 `padding-left: 442px` 起排（L915），左侧箭头槽 40px 起于 442（L928-936）。
- `.navbar-left` 为绝对定位、仅设 `max-width: 442px`（L810-821），不强制铺满品牌区。
- `.title-logo` 为 `flex: 0 1 auto` 内容自适应（L825-833），实测 372.55×110（logo 78px + 标题约 294px）。

## 背景与像素事实
- 372–442px 段无任何元素覆盖，只剩 `.navbar::after` 的图片+渐变底（L786-798）。
- `navbar-bg.png` 在 x≈400 处为亮蓝 (18,110,177)，叠加渐变后实测 (27,94,155)。
- 442px 品牌区布局来自 2026-11-15 的 restyle 提交 `9ba4ccc0d`。

## 标题滚动机制
- 标题滚动链路：模板绑定 L11-18、computed L285-292、测量逻辑 L496-530、ResizeObserver L745-754、CSS 动画 L866-905。
- 移动端断点覆盖规则位于 L1423。

## 协作约定
- 计划文件写入仓库 `.plan` 目录后送编排器审核；门禁要求先列 todo，grep 需走编排器。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "前端项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "c598c3cf3c054534a36d03c8d300730c",
  "version": 1,
  "memory_type": "entities"
}
-->