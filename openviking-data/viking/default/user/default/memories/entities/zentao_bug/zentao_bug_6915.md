# 禅道 Bug 6915
苏住房G（zhi2-web-admin）防汛应急指挥大屏热力图悬浮卡片显隐与图例排版缺陷；2026-11-24 完成首轮修复与子模块提交，2026-11-26 因物业管理区域悬浮卡片再现被 lichandan 重新激活，当日二轮彻底移除详情卡、实机验证通过并提交推送、禅道 resolve+附图结案。

## 问题与根因
- 现象：热力点悬浮即弹出顶部详情卡，需求要求去掉悬浮卡、只保留点击下钻；图例项带 `(无险情 · 0)` 类括号，项多时换两排。
- 定位：`src/views/flood/screen/components/HeatMapPanel.vue`，`:122` ECharts `mouseover` 绑 `onMouseOver`→`showPoint()`（:263-265）设 `hoverItem` 触发 `:27-43` 顶部卡；点击下钻 `:271-274`；图例括号 `:19` 的 `({{ lv.label }} · {{ lv.count }})`；图例容器 `:8` 用 `flex-wrap`。
- 歧义：截图图例实为 5 项（0:无、1:轻度、2:中度、3:重度、4:严重），需求写「四个等级放一排」，用户确认按 5 项排一行。

## 首轮修复与验证（2026-11-24）
- 移除 `mouseover` 与 `onMouseOver` 死代码、保留 click 下钻；显式关 ECharts 原生 tooltip 兜底其它悬浮源；图例删括号、强制一行，补 `title`/数量可访问性（`aria-label`「灾情等级 X… 点击筛选」）与窄屏 gap 兜底；三处均在 `HeatMapPanel.vue`。
- 计划 plan_review 审核 86 分、0 P0，3 条 P1 建议（关 tooltip、图例可访问性、窄屏 gap）全纳入。
- ESLint 窄范围 exit 0；`npm test`（test 模式 Vite 构建）exit 0，dist 更新于 2026-11-24 11:48:01；首次构建因临时目录不存在日志写入失败，建目录后重跑成功。
- 本机 nginx 8101（root=D:/repository/苏住房G/dist）agent-browser 实测：图例 5 项一行无括号、仅剩 click 监听且 `hoverItem=null`、点区县 tab 联动 `activeDistrict=320508` 与预警范围下拉正常，证据图经用户肉眼确认。
- 测试部署域名 https/http 不通、部署注册表无苏住房G项目，改用本机 nginx 8101 验证。
- 子模块 `develop/v2.6.2-suzhufang` 提交 `d9ed05cc7` 已推送（ahead/behind=0）；他人改动 `ScreenHeader.vue`、`particles.js` 未纳入；父仓 gitlink 未对齐。
- 验证截图上传禅道 fileID 24104；交接时带图回写 comment 尚未执行、父仓 gitlink 对齐与过程产物清理列为待办。
- 等效成本越过 1.00M 触发 P0 硬交接：文档 `D:\plan\苏住房G\HANDOFF-CHAIN-禅道6915-热力图卡片图例-hop1-20261124-1157.md`，下一跳 11:58:07 启动。
- OpenViking 记录 2026-11-24 已回写 resolved。

## 二轮复现与修复（2026-11-26）
- 2026-11-26 lichandan 重新激活：热力图上物业管理区域悬浮仍显示卡片；禅道库 status=active，与记忆中 resolved 不一致。
- 本地浏览器复现缺陷、拉取禅道截图对齐现象；确认首轮修复已在当前分支，排查激活后是否仍有悬浮触发路径。
- 复现悬停仍弹出「和美家园」详情卡；源码已去 `mouseover`，但模板仍有 `v-if="hoverItem"`（`:27-43`）且 `onClick` 仍会赋值；`dist` 已不含 `mouseover` 但模板仍保留 `hoverItem` 浮层，点击仍弹出。
- `index.vue` 未监听 `point-click`；复测端可能仍是旧包，或需彻底去掉悬停/误触展示。
- 决定彻底移除详情卡、仅留点击下钻并加固；已更新计划状态并修改 `HeatMapPanel.vue`；一条命令误用错误工作目录。
- 登录卡点解决：`/code` 实返 base64 图 + uuid（非明文 captcha，这是前跳登录失败根因）；改走 Playwright 实时抓图 → 视觉网关 `auto/hy4flash` 识别 → 同会话登录，一次通过。
- 实机验证通过：`http://localhost:8165/#/safety/flood/floodScreen` 热力图 `.hm-chart` canvas 渲染正常，热点悬停 5s+ 无详情卡；证据图 `verify-6915-20261126-032509.png`（1920×1080）内嵌会话并经用户确认；命中的「物业管理区域」是顶部常驻统计卡（463）、「和美家园（锦月新居）」是 ECharts label，均非弹卡。
- 二轮改动：`HeatMapPanel.vue`（7+/30-）删 `hoverItem` 详情卡 DOM（`暂无检查事项明细`/下钻按钮）、`showPoint` hover 改 `regionFromParams`（仅点击下钻）、`emphasis.focus:'none'`；eslint exit 0，`npm test` exit 0（仅 Sass 弃用警告），`version.json.gitHash=f684191bf` 对齐。

## 提交回写与结案（2026-11-26）
- 提交推送：stash 他人脏文件后 rebase（behind=1，远端仅改 propertyContract/detail.vue 无冲突）再 pop；子模块 `develop/v2.6.2-suzhufang` 提交 `f684191bf`（代码）+ `ab6c77bdb`（common-errors.md 追加 6915 条目）已推送、远端一致。
- 禅道回写结案：先读 zt_action comment、上传证据图 fileID=24559（再激活截图 24528）；UPDATE zt_bug + INSERT zt_action + 挂附件，事务复核后提交；status=resolved/fixed、resolvedBy=tiany、assignedTo=回创建人 lichandan（product=79/project=141/execution=142/openedBy=lichandan）。
- 收尾：父仓 gitlink 未更新（主检出有他人脏文件、授权仅子模块，与历史一致）；`$env:TEMP/zentao-6915` 与证据图清零、后台任务结束；链路终止不排下一跳，交接第4节待办全部清空。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6915",
  "source_extraction_id": "b2f1c0d798504b0b8394c110b8658453",
  "version": 3,
  "memory_type": "entities"
}
-->