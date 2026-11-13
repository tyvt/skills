# 首页 V2 布局空白收紧
苏住房G 首页 V2 已多轮收紧关键数据导航与首页第一行的多余空白，最新一轮补全 flex 样式链消除卡片底部留白。

## 修改内容
- 关键数据导航卡片主体下内边距由 `47px` 改为 `24px`，与上内边距一致
- 首页第一行去掉固定高度 `245px` 改为 `auto`，高度随内容收缩
- 可选：将第一行与第二行间 `gap: 14px` 略减需改 `index-v2.vue` 的 `.home-v2` / `.home-v2__row`

## 2026-11-13 补充修复
- 根因：index-v2.vue 第一行 `grid-auto-rows: 416px` 将 SectionCard 拉满 416px；KeyDataNav 内容链（.sc__bd-inner → .kd → 三块内容）全为自动高度且无 flex 伸展，内容总高小于可用高度，空间漏在卡片底部
- SectionCard.vue:146 的 `.sc__bd-inner` 补 `flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column`
- KeyDataNav.vue 中排加 `kd__row--grow` 修饰类；`.kd` 补 `flex: 1 1 auto; min-height: 0`；`.kd__row--grow` 吸收剩余高度，行内卡片内容 `justify-content: center` 纵向居中
- 企业卡显式 `flex: 0 0 auto` 保持内容高度；改动仅限两处 scoped 样式与一处模板类名，无逻辑与依赖变动

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G；待办：需用户在 1280/1440/1920 三档宽度及 ≤575px 窄屏目测确认底部不留白、中排卡不出现双滚动条或裁切
- 历史验证：刷新首页即可观察效果（来源会话 4f3ff57b）；本轮 eslint 通过（exit 0），构建未重跑
- 涉及文件：index-v2.vue、KeyDataNav.vue、SectionCard.vue（路径前缀 zhi2-web-admin/src/views/home）
- 所属项目：苏住房G；来源会话：4f3ff57b-fe22-4530-b9b8-625675a308b8 与 2026-11-13 会话

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "home_v2_spacing_fix",
  "source_extraction_id": "a7bccbc5e7dd4d63ad4e23809ffd73f3",
  "version": 2,
  "memory_type": "entities"
}
-->