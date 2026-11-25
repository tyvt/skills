# 禅道 Bug 6969
禅道缺陷 6969「历史页全部工单计数骨架长期不消失」：2026-11-25 在 zhi2-mobile-query-h5-c 完成根因定位、修复、构建与实机验证并获用户确认；同日禅道带图回写 resolved/fixed，但 git push 仍失败待凭据配置。chain_id=bug6969-suzhufang 第 3 跳。

## 问题与根因
- 提单 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6969，部署 key「防汛C端」；历史页「全部工单」计数 Skeleton 长期不消失，禅道截图证实，对比管理端 APP 约 1s 内显示数字。
- 根因：`refreshCounts` 用单一 `countsLoading` 等 `Promise.all` 最慢一路（历史页并发 4 路计数 + 列表多路分页）；汛前/汛后仍拉非必要 `rescue`（UI 不展示）；`onShow` 与 z-paging 首屏 `query` 抢带宽。

## 修复与构建
- `src/pages/history/index.vue`：`refreshCounts` 按 `all`/`rescue`/`submitted` 分路拉数并各自解除 Skeleton；汛前/汛后不再请求 rescue；首屏计数延后到 `nextTick`。
- 用户 2026-11-25 确认后改；`npm run build` 通过，hop3 又后台跑基线 exit 0；全仓 `typecheck` 既有报错与本次无关。
- 计划 `D:/plan/苏住房防汛C端/bug6969-history-counts.md`（plan_review 曾报 state 异常，用户已人工确认实施）。

## 验证、回写与遗留
- `agent-browser` 图形验证码登录两次未过（算术验证码停在登录页）；改算式验证码登录苏住房 G（8101）成功，完成 G 端登录验证。
- 单次 `eval` + 宿主机轮询 DOM 量化「进历史页 → 全部工单 (N) 出数字（非 Skeleton）」耗时，多帧截图留证；核对 `countHistory` 请求路径、`localhost:8162` 直读最新 `dist`、token 注入后快照取证。
- 实机：注入 token 打开防台防汛「历史记录」页约 0.3s 出「全部工单 (47)」数字（非 Skeleton）；自检截图后用户 2026-11-25 确认通过。
- hop3 禅道回写完成：resolved/fixed，附图 fileID=24359（先 `zentao_upload.py` 上传，再 DBX 事务按 openedBy=lichandan 及产品/项目/执行 ID 按序 UPDATE/INSERT/commit）。
- `git push origin dev` 仍失败：HTTP 无 credential-manager、SSH `Permission denied`；dev 仍 ahead 2（c35a626、87d84b0），工作区另有未提交脏文件勿一并提交。
- hop3 不重做代码与已通过验证；交接文档 `D:/plan/苏住房防汛C端/HANDOFF-CHAIN-bug6969-suzhufang-hop3-20261125-1442.md`（9 节），下一跳 `schedule-5b2c8916…`。
- 遗留：①用户在可访问 `gitlab.zhi.com` 的环境配置 Personal Access Token / credential helper 或 SSH key 后执行 `git push origin dev`；②可选 G 8101；③清理 TEMP（图可删）。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6969",
  "source_extraction_id": "ab143aae343c40679d87b3c14ded1702",
  "version": 4,
  "memory_type": "entities"
}
-->