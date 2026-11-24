# 禅道 Bug 6915
苏住房G（zhi2-web-admin）防汛应急指挥大屏热力图悬浮卡片显隐与图例排版缺陷，2026-11-24 完成代码修复、实机验证与子模块提交推送，禅道带图回写尚未执行（已交接下一跳）。

## 问题与根因
- 现象：地图热力点悬浮即弹出顶部详情卡片，需求要求去掉悬浮卡片、只保留点击下钻；图例项带 `(无险情 · 0)` 类括号内容，且项多时换成两排。
- 代码定位：`src/views/flood/screen/components/HeatMapPanel.vue`，`:122` ECharts `mouseover` 绑 `onMouseOver`→`showPoint()`（:263-265）设 `hoverItem`，触发 `:27-43` 顶部卡片；点击下钻在 `:271-274`；图例括号在 `:19` 的 `({{ lv.label }} · {{ lv.count }})`；图例容器 `:8` 用了 `flex-wrap`。
- 歧义：截图图例实为 5 项（0:无、1:轻度、2:中度、3:重度、4:严重），需求写「四个等级放一排」，用户确认后按 5 项排一行处理。

## 修复方案
- 移除 `mouseover` 触发并删除 `onMouseOver` 等死代码，保留 click 下钻链路；显式关闭 ECharts 原生 tooltip，兜底其它悬浮触发源。
- 图例删括号文字、强制一行，补 `title`/数量提示可访问性（`aria-label` 变为「灾情等级 X… 点击筛选」）与窄屏收窄 gap 兜底；三处改动均在 `HeatMapPanel.vue`。
- 计划经 plan_review 审核 86 分、0 个 P0 阻断，3 条 P1 建议（关闭 ECharts tooltip、图例 title/数量可访问性、窄屏 gap 兜底）全部纳入。

## 验证与提交
- ESLint 窄范围 exit 0；`npm test`（test 模式 Vite 构建）exit 0，产物 dist 更新于 2026-11-24 11:48:01；首次构建因临时目录不存在日志写入失败，建目录后重跑成功。
- 本地 nginx 8101（root=D:/repository/苏住房G/dist）用 agent-browser 实测：图例 5 项排一行无括号、组件仅剩 click 监听且 `hoverItem=null`、点击区县 tab 联动 `activeDistrict=320508` 与预警范围下拉正常，证据图经用户肉眼确认。
- 测试部署域名 https/http 均不通、部署注册表无苏住房G项目，故改用本机 nginx 8101 验证。
- 子模块 `develop/v2.6.2-suzhufang` 提交 `d9ed05cc7` 已推送，推送后 ahead/behind=0；他人既有改动 `ScreenHeader.vue`、`particles.js` 未纳入提交；父仓 gitlink 未对齐。

## 后续交接
- 验证截图已上传禅道（fileID 24104），带图回写 comment 尚未执行。
- 因等效成本越过 1.00M 触发 P0 硬交接：交接文档 `D:\plan\苏住房G\HANDOFF-CHAIN-禅道6915-热力图卡片图例-hop1-20261124-1157.md`，下一跳排程 11:58:07 启动。
- 剩余事项：禅道带图回写、父仓 gitlink 对齐推送、过程产物清理。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6915",
  "source_extraction_id": "ea1e646a42ea4607b9574fa2d2ca1744",
  "version": 1,
  "memory_type": "entities"
}
-->