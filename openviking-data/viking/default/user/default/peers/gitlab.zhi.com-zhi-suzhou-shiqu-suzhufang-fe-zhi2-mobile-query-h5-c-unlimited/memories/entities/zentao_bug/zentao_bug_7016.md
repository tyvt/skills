# 禅道 Bug 7016
禅道缺陷 7016：管理 APP 首页待办副标题尾部多余的「：全局」已移除；2026-11-26 完成计划过审、代码修复、实机截图验证、提交推送与禅道 resolved/fixed 附图回写，链路终止、无待定项。

## 工单与现象
- 禅道链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=7016
- 缺陷：管理 APP 首页待办行显示「路南苑信用检查记录:WYJC20261126002: 全局」，尾部「: 全局」需删除，属前端 UI 文本改动。
- 数据：taskTitle=路南苑信用检查记录、编号 WYJC20261126002；curl 侧 todoNum=4952 与截图一致。

## 根因与修复
- 根因：src/utils/portalData.ts:179-180（178-180）把 `${taskLocation}` 拼进待办副标题；taskLocation 取自 startDeptName，值为「全局」，形成「：全局」后缀。
- 修复：在 portalData.ts:179-180 过滤 taskLocation==='全局' 时先置空再拼接，丢弃「：全局」后缀；实机 `.todo-sub` 渲染为 `路南苑信用检查记录:WYJC20261126002`，无「全局」。

## 验证与构建
- 4 段式计划经 plan_review 通过（verdict=pass，approved_sha256=623dbe42…f7056），3 条 P1 建议在实现与验证阶段落实，人工确认后改码。
- 后端 /todoTaskList 仍 502（浏览器「连接服务器超时」）；按审核建议用 agent-browser 网络路由注入 mock 响应（startDeptName='全局'）实机渲染验证。
- 证据图 C:/Users/Administrator/AppData/Local/Temp/bug7016-verify-20261126-142951.png 自检有效、副标题无「全局」，已内嵌并经用户确认。
- 构建 npm run build:h5 exit 0（DONE Build complete）；lint 未执行——项目无 eslint.config.* 且无 lint 脚本。
- 环境：站点 http://localhost:8150/ 可达；经 API 登录（AES 加密口令 + 视觉验证码）成功，JWT 存于 localStorage['flood-token-v1'] 支持 token 注入；凭据 deploy_env.fangxun-c.dev.admin 用于防汛 C 端 dev 环境。

## 回写与收尾
- commit 838a6f7 已推送 origin/dev；禅道 7016 status=resolved / resolution=fixed，comment 附图 fileID=24585 已落库。
- chain_id=bug7016-todoGlobalSuffix，成本 1.02M 越过 1.00M 档位触发 handoff-required P0；交接文档 D:/plan/苏住房防汛C端/HANDOFF-CHAIN-bug7016-todoGlobalSuffix-hop1-20261126-142356.md（9 节完整）；下一跳 schedule-ea4fa5c1-19d6-41d8-b659-fef810f0419d（hop2/10，14:24:49 new_once）即本跳。
- 本跳 hop=2（文档 33/65 行写 hop=1 为撰写时快照，按排程提醒取 hop=2）；第 4 节待办清空、链路终止，不排下一跳；已清 $env:TEMP 过程产物、停后台任务。
- 待定项：无；工作区另有 src/pages/project-check/form/index.vue 既有未提交改动，非本任务产生，未触碰。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7016",
  "source_extraction_id": "ca49760883c74ae2aa3ee81895502a31",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->