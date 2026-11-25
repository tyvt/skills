# 禅道 Bug 6899
禅道缺陷 6899：2026-11-25 复活修复防汛大屏「现场险情实时速报」hover 详情卡显示全量检查项；台账、npm test、实机出图确认、禅道 resolved/fixed 附图回写、双仓推送与清理全部完成，链路终止。

## 问题与待办
- chain_id=bug6899-hover全量检查项，hop=2（文档第5节写 hop=1、定时提醒写 hop=2，按调度取 hop=2，上限10）；第5节实为「关键决策与约束」小节。
- 目标：hover 详情卡显示全部检查项（含填报值「无」的项），滚动/隐藏不回归；实机截图经用户确认后回写禅道附图+提交推送。
- 第4节待办全完成：补 docs/flood/common-errors.md 台账、npm test、agent-browser 实机出图并让用户确认、回写+免二次问提交推送、清理 $env:TEMP\zentao-6899-state\。
- 不重跑：禅道取证与根因定位、计划两轮审核通过并人工确认、index.vue 8 处改动（388/390/570 行命中，他人改动未触碰）、ESLint exit 0、附件判读、后端 controller 全仓检索。

## 修复与验证
- 台账已有 11-24 的 6899 条目，本次追加复活记录；日志目录缺失致后台命令先失败，建目录后重启 npm test，exit 0（仅 Sass @import 告警）。
- 登录排障：kill 会话会随守护进程关闭，改不 kill/不管道常驻；识别脚本静默改视觉 MCP 读码；按钮被页脚 span 遮挡（headless 视口）用 DOM 触发；验证码过期改「取码→识别→立即提交」闭环；网关脚本 404 后仍用视觉 MCP，成功进 /index。
- 路由由后端菜单动态下发，点顶部「数据大屏」进防汛大屏；预警列表无「新增检查类型」，改查事件 ID 险情接口，选「预警名称测试20261102001」（2 条、带 inspectionId）。

## 证据与差异
- hover「苏州高尔夫花园」：后端 patrol/realtime 该行 items:[]（riskItemNum=0），详情卡渲染 4444:2、5555:1发 两项+填报人，证明 getInspection 按 inspectionId 补拉全量生效（改动前为空）。
- 截图 C:/Users/Administrator/AppData/Local/Temp/zentao-6899-hover-20261125-192940.png（1256×581，详情卡2项清晰）自检有效并经用户确认。
- 原 bug 单据（双桥小区/事件 2123337863714168833）当前测试环境已不存在，预警下拉与接口均无该事件；可用检查单最多3项且无「无」值样例，「含『无』值项」未能实机复现，仅验证补拉链路与空接口兜底。

## 回写与收尾
- 免二次问执行：上传截图拿 fileID、生成事务序列（附件 24482.png 嵌入 comment）；禅道 resolved/fixed（action 99931，fileID 24482）。
- 子模块只改本任务两个文件、不动他人改动；两端提交推送完成并核对远端 SHA；清理过程产物与后台会话。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6899",
  "source_extraction_id": "1e6af7d599b349ca9698f95011247cdb",
  "version": 1,
  "memory_type": "entities"
}
-->