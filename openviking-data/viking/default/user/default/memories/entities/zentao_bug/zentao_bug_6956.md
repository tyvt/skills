# 禅道 Bug 6956
禅道缺陷 6956：2026-11-25 处理 zhi2-mobile-query-h5-c 的 H5 多标签登录态互相覆盖问题，最终 resolved/fixed 并完成禅道回写与清理。

## 问题与根因
- 缺陷链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6956。
- 根因：H5 用 `uni.setStorageSync` 把 token 写入同源 `localStorage`，多标签间共享导致登录态互相覆盖；通过部署信息、截图与复现证据定位。
- `request.ts` 为 token 读写实现（`setToken`，token 存 `flood-token-v1`）；`utils/index.ts` 曾直接读取 token，后续同步修正。
- 修复方案：改用按标签隔离的 `sessionStorage`，实现统一 `authStorage`；修复计划人工确认并以 82/100 的 plan_review 通过，2026-11-25 用户确认实施、更新计划状态并开始实现。

## 验证过程
- 验收判定为双 context 证据、用户确认、提交与禅道回写；hop3 已完成用户验证门确认，hop4 目标为禅道回写 resolved + comment 附图 + 必要时 push。原 §4 待办包括 Playwright 双 context 取证并截图至 TEMP、验证门用户确认、git 提交 6956 相关、禅道回写附图，以及按 §9 跑 Playwright 后走验证门。
- 2026-11-25 验证中 localhost:8162 可访问；Playwright 浏览器未安装，后台安装并准备重跑，安装中改用 agent-browser 双会话验证并单次查询安装状态。
- 截图均为登录页，仅靠 sessionStorage 种子未让「我的」显示登录名；排查 `mine/index.vue` 登录态来源、路由守卫、`validateAndLoadUser` 是否清态及「我的」`onShow` 是否在无有效 token 时跳登录；决定为 E2E 增加 `getInfo` 拦截，随后运行含 mock 的 Playwright E2E 并在 Chromium 安装后单次重跑。

## 链式执行记录
- 链式续接 chain_id=zentao-bug6956、hop3（接续 hop2），当前 hop=4。
- hop1（2026-11-25）因会话等效成本 1.01M 超过 1.00M 自动交接档，按 session-handoff 交接并停手，本会话不再改代码或提交。
- hop1 已交付根因修复（authStorage.ts、request.ts、utils/index.ts）、单测 13 通过、build:h5 成功；交接文档 HANDOFF-CHAIN-zentao-bug6956-hop1-20261125-1402.md，排程 new_once 约 14:03（本地）开新会话接续，schedule-503026e6-…。
- 下一跳曾要求同浏览器两标签分别用不同账号登录（如 300007），在「我的」核对不串号、截图、用户确认、提交/回写；接续后按 §9 读交接文档做双标签验证，登录需验证码，先确认验证码接口再做带验证码登录，验证码 OCR 失败后改为页面登录并截取识别、刷新验证码继续，API 登录不稳定后改为双标签直接写入 sessionStorage 验证「我的」按标签隔离。

## 回写与收尾
- hop4 §4：DBX 回写（INSERT zt_action 备注含修复说明、UPDATE zt_bug resolved/fixed、上传/关联 verify 附图）、git push（若需远程同步）、后台 job 装完 Playwright 后跑 e2e（agent-browser 主证据、非阻断）、过程产物清零；禅道回写前不删 TEMP 验证原图。
- 按 §9 接续先做禅道回写，读取 DBX 细则并查得 bug 6956 仍 active、无历史备注；两张验证截图与 D 盘副本均在，归档副本 D:/禅道附件/bug/6956/verify-*.png 保留；定位回写脚本并确认 commit 5fb2f05 改动要点用于 comment，生成含附件 fileID 的 SQL 序列。
- 回写参数 product=9、project=141、execution=142、openedBy=lichandan；事务内 zt_bug 1 行、zt_action 1 行、zt_file 2 行写入成功，复核符合预期后提交事务并关闭 session。
- 最终 `zt_bug` 6956：status=resolved、resolution=fixed、resolvedBy=tiany、resolvedDate=2026-11-25 15:08:20、assignedTo 回退创建人 lichandan；事务内复核与 commit 后落库均确认。
- `zt_action` 新增 id=99582（actor=tiany、action=resolved、comment 1068 字，含根因/修复/验证和两张内嵌图，files=24369,24370）；`zt_file.objectType=bug`、`objectID=6956`；push 前 dev 分支 HEAD=5fb2f05、dirty=5，脏文件全为误生成过程产物，`@{u}..HEAD` 为空且 HEAD == origin/dev，无需推送；删除 4 个误生成空文件、`.task-state/`、TEMP 验证原图和 comment 临时文件后工作区干净；§4 清空、§5 达成，chain_id=zentao-bug6956 终止不再排下一跳。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6956",
  "source_extraction_id": "901eba87f12e40f5bea476673f6299d7",
  "version": 6,
  "memory_type": "entities"
}
-->