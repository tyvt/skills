# OpenViking 历史导入进度
2026-11-05 至 2026-11-06 多轮后台 job 驱动本地历史导入，进入全量扫尾与路径修正收尾阶段。

## 各源与早期阶段
- 全量 Cursor pass（pwsh-be983e783496464d）2026-11-06 09:32:20Z 结束：exit 1，68/99 成功，约 1348 条；OpenCode/zcode ✅ 2/2 约 29 条；WorkBuddy ✅ 16/22 约 135 条
- 全量 pass 因 preflight 队列过深被拒 4 项目：产品2.0（剩4）、苏住房G（剩4）、园区物管2.0（剩~29）、苏州市房地产监测V3（剩48）

## 补跑与扫尾 job
- 4 项目补跑 pwsh-47882c32f740435f 完成（exit 0）：产品2.0 269/282（含 write:0 失败批）、苏住房G 251/261、园区物管2.0 193/211、苏州市房地产监测V3 586/669；12 批中 4 批 failed write:0
- 全量扫尾 pwsh-da0d05cf8a72404f（running）：99 个 distill 项目逐个 import-to-ov --skip-preflight
- 新补上：2-0（101）、门户（76）、园区公共收益（128）、太仓G（47）、泰兴小程序（78）、无锡市区小程序嵌入H5（63）、苏住房C（382）；2-0-worktree/views/苏住房iOS/建湖G/通州V0 因 knownTitles 去重跳过 0 条

## 提交队列与待办
- 37 个 dsh-session-* 为真实线上 Web 会话（非导入残留），每次 ~200s 串行 ≈ 123 分钟；ov-drain-commit-queue.mjs 清不掉（403 ROOT may not cancel）
- 导入占满 commit 单通道致线上会话排在后面，解释「实时会话抽不出记忆 / peer 抽取为 0」
- 待办：扫尾闭环（failed write:0）→ 调整 preflight 门禁 → 队列回落后再 snapshot（暂勿 snapshot）

## 午间路径修正与 SWEEP FIX
- 原 sweep 在靖江物管G 失败：$d.FullName 未展开被当「靖江物管G.FullName」致 ENOENT；园区物管2.0 旧日志 [7] 提交超时（task f117635e）中止
- 用户确认「按你的建议执行」修正并重跑；ov-cancel-stuck-commit-tasks scanned 840 cancelled 42；OV_MAX_COMMIT_QUEUE=64 通过（queue 42）
- SWEEP FIX（pwsh-b2d419e0f5e942a0，completed exit 0）：99 目录 Join-Path $root $p 作 --src、--gap=12000、--skip-preflight；靖江物管G 等不再 ENOENT；大量「断点续跑…本次 0 条」说明标题基本对齐
- 补上：2-0 7/7 批写完；产品2.0 282/282 无待导；小程序 补 4 条；G 补 3 条；园区公共收益 128 全齐

## 遗留问题与建议
- BOM 问题：Set-Content -Encoding UTF8 写空 [] 带 BOM，import-to-ov.mjs JSON.parse 报 Unexpected token；空 [] 新建的 done-ov-cursor-*.json 扫到即整条失败（锡山物管V0 等），真实 JSON 文件不受影响
- 失败批次 write:0：i淮安公版 1 批失败 4 条未进 done；园区物管2.0 第1批失败、第2批成功，约 4 条仍缺（distill 211 对比 done 约 203+4 待核对）
- 建议：①去 BOM（重写 done 文件为无 BOM UTF-8；代码层 import-to-ov.mjs 读 SKIP_FILE/DONE_FILE 时 replace(/^\uFEFF/, '')）②园区物管2.0/i淮安公版 小范围重跑 --skip-preflight③可选 import-local-sources.mjs --skip-extract --sources=cursor --skip-distill-if-ready 刷 state④大导入前继续 ov-cancel-stuck-commit-tasks

## 状态确认（多次核查）
- 2026-11-06 12:58 用户询问导入是否仍在运行；核查 job_list 中所有导入相关任务均为 completed，含 SWEEP FIX（pwsh-b2d419e0f5e942a0），无 status: running 的导入 job
- 批量导入这条线从 job 角度看已收尾（concluded）；12:58 时系统残留 1 个命令行带 import-to-ov / import-local-sources 的 node（pid 16636），疑为刚结束未完全退出或属其他会话
- 2026-11-06 21:10/21:40/22:10/22:40 四次复查：pwsh-4597d7e5c5ca406c 不在 job_list，所有导入相关 pwsh 均 completed，命令行带 import-to-ov.mjs / import-local-sources.mjs 的 node 进程数=0（已完全退出）；import-local-sources-state.json 仍记 Cursor 68/99、约 1348 条（finishedAt 2026-11-06 09:32:20.326Z，后续 import-to-ov 不自动改）；i淮安公版 仍有 completed 但 write:0 edit:0 未记 done 批次（差 4 条），锡山物管V0 distill 0 条无待导入；结论仍为未全部收口、暂不建议全量 snapshot
- 2026-11-07 01:10/01:40/02:10/06:40/07:10/07:40 六次复查状态同上：pwsh-4597d7e5c5ca406c 不在 job_list，node 进程数=0，state 68/99，i淮安公版零写入批次未收口，暂不建议全量 snapshot
- 2026-11-07 01:43（北京时间09:42）定时复查（schedule-1dc49c3b）：pwsh-62bbf38e08b14bcf（全量续跑）、pwsh-03f3c34be4a345e2（单独补V3）均 completed，无 running；OV healthy，preflight(64) ok，commit_queue 40/max 64（OV_MAX_COMMIT_QUEUE=64）；state finishedAt 2026-11-06T23:43:14Z，Cursor 99/imported 68/memories 2086；resume.log 尾部仍停在 V3 43>12 preflight 失败小结未反映补跑成功。4项仍有缺口（done-ov-cursor 与 distill 对照）：苏州市房地产监测V3 distill 669/done 602/差67、i淮安公版 distill 13/done 9/差4、iHome2.0小程序 distill 1/done 0/差1、d-repository distill 2/done 0/差2；大项目断点已对齐（本次待导入0条），导入不会自动续跑，需手动补跑（尤其V3剩67条），可用修复后 import-to-ov + OV_MAX_COMMIT_QUEUE=64 或 --skip-preflight 小批重试；40个 commit_queue 多为 agent harness 线上会话 session_commit 排队非导入脚本续跑。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "openviking_import_progress",
  "source_extraction_id": "ac2126de415d41e2b748602784b660fc",
  "peer_id": "deepseek-harness-default-workspace",
  "version": 16,
  "memory_type": "entities"
}
-->