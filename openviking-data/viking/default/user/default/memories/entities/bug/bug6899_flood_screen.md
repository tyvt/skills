---
status: suspect
needs_review: true
confidence: 0.3
gov_checked_at: 2026-11-25
gov_note: 高频 bug 实体·batch3·仅标记
---
# 禅道 6899：防汛大屏险情速报卡片滚动与状态显示缺陷
苏住房前端 zhi2-web-admin 防汛应急指挥大屏「现场险情实时速报」禅道缺陷，2026-11-24 完成修复、提交推送与链路收口。

## 问题与根因
- 现象：左侧险情详情弹窗滚动到第 7 条之后消失，第 8 条起不可见；「险情是否解除」状态显示与真实数据相反；禅道取数为 bugID=6899，附两张测试环境 image.png 截图。
- 滚动根因：`.live-detail-card` 设 `pointer-events:none`（index.vue:598，`max-height:420px; overflow:auto`）收不到滚轮事件；`@mouseleave`（index.vue:53 → LiveReportPanel.vue:5）触发 `reportHover=null`，鼠标从行移向卡片即隐藏。
- 状态根因：`status: r.statusLabel`（index.vue:531）直接用后端 label，语义与 `UNSOLVED_FLAG` 反向；screen-api.md:197 与 detail.vue:809 显示 `unsolvedFlag=1`→已解除，而测试库 17:57:51 记录 `UNSOLVED_FLAG=0` 才显示已解除。

## 修复与验证
- index.vue 共 6 处改动（index.vue:53/61/161/229/381-390/613 与 526-554）：hover 改 200ms 延时隐藏（新增定时器字段、调度/取消/隐藏方法、beforeDestroy 清理）；CSS 改 `pointer-events:auto`；adaptLive 用 `String()` 比较 `unsolvedFlag` 兜底推导状态。
- plan_review 82 分、无 P0 阻断，提 3 条 P1（`String()` 统一类型比较、补状态映射单测、明确 v-if 渲染）；用户确认两项问题一起修复。
- 静态检查：ESLint `src/views/flood/screen` exit 0，`npm test`（test 模式构建）exit 0（52s，dist 更新于 09:27:41）；状态映射单测尚未补齐。
- 数据取证：dev 库无对应记录，改查「苏住房测试」连接，确认里双桥小区两条记录仅 `UNSOLVED_FLAG` 不同。

## 实机验证阻碍
- 大屏页面已打开、登录态正常，但默认下拉 6 个预警事项现场险情 liveReport=0，目标事件不在前端下拉列表；`T_FLOOD_INSPECTION` 中里双桥小区 2026-11-24 17:55:58 `UNSOLVED_FLAG=1` 已解除、17:57:51 `UNSOLVED_FLAG=0` 处置中，与 PC 端一致，属事件 2123337863714168833（新增检查类型，STAGE=4/BIZ_STATE=2/APPROVE_STATE=2，符合列表标准）。
- 下拉 6 项在 `T_FLOOD_EVENT`、`T_FLOOD_EVENT_CHANGE` 里都查不到，说明下拉并非直查该表，`/event/list` 真实数据来源待确认。
- agent-browser 每模型回合 12 次调用门限，hop2 多次触发 verify-loop 门禁（13/12、14>12、15>12），改为 DBX 直连后端接口复现并从代码侧确认 API 前缀与 token 来源；OpenViking 查历史无同类排查结论。

## 交接与收口
- hop1 交接文档：D:\plan\苏住房G\HANDOFF-CHAIN-禅道6899-防汛大屏险情速报-hop1-20261124-0920.md，hop2 于 2026-11-24 09:26 触发；hop2 剩余步骤：确认下拉数据来源 → 选中目标事件 → hover 里双桥条目验证卡片滚动与状态显示 → 截图取证 → present 确认 → 更新错误台账 → 禅道回写 → 提交决策与清理。
- hop5 收口：子模块 `develop/v2.6.2-suzhufang` 提交 `ce9b34955`（仅含 `src/views/flood/screen/index.vue` 与 `docs/flood/common-errors.md`）已推送；父仓同分支提交 `2adb355ec43ac2814e43657a500ed553d90c9ab6` 已推送且 gitlink 指向 `ce9b34955`。
- 他人改动 ScreenHeader.vue、particles.js、HeatMapPanel.vue、_review.json、env/.env 未纳入提交；过程产物已清理，链路终止。

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "bug6899_flood_screen",
  "source_extraction_id": "ea1e646a42ea4607b9574fa2d2ca1744",
  "version": 4,
  "memory_type": "entities"
}
-->