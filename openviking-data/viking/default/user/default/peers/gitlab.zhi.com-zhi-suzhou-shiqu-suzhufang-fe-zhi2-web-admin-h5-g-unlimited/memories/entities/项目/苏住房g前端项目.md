# 苏住房G前端项目
苏住房G 是禅道任务 6941 隐患处置按钮修复所在的前端项目，主仓库为 zhi2-web-admin。

## 概况
- 前端主仓库为 zhi2-web-admin，构建产物输出到 dist 目录。
- 隐患处置页面文件路径：zhi2-web-admin/src/views/electrocar/hazard/index.vue。
- 提交前需过前端验证门：先用 agent-browser 实机验证并出图并入会话，再由用户确认。

## Access
- Real-machine URL is `http://localhost:8101/#/safety/electrocar/hazard`; port 8100 hosts 无锡市惠山住建局维修基金管理系统, a different application.
- Property account 601117997 (李翠萍) logs in on 8101 successfully, but its menu has no hazard/electrocar/电动车/隐患处置 route and direct access redirects to index.
- Admin account zsbase has `*:*:*` permissions and is the workable path to the hazard page; password is in `%TEMP%\e2e_pass.txt` (see bug 6835 handoff).
- Login captcha is an arithmetic-question image embedded as a base64 data URL; OCR scripts misread it repeatedly, so decode the DOM data URL and read it with a vision model.

## 关键事实
- 2026-11-24 该页面的编辑/删除按钮 disabled 改由 canEdit/canDelete 决定，以覆盖 mixin 的 bizState 置灰逻辑。
- 同次改动移除列表中的反馈进度与处置完成展示，并更新相关注释。
- 实施计划已审核并获用户确认（approved_sha256 已回填），eslint 与 npm test 均 exit 0。
- dist 于 2026-11-24 16:00:02 重建，已包含该修复。
- 2026-11-24 hop2 real-machine verification was not completed: captcha kept failing when switching to admin zsbase, no screenshot was produced, so commit/push, 禅道 writeback and cleanup were all left undone.
- hop2 wrote the 9-section P0 handoff `D:\plan\苏住房G\HANDOFF-CHAIN-禅道6941-隐患处置按钮-hop2-20261124-1618.md` (chain_id=`chain-20261124-zentao6941-hazard-buttons`, hop=2, maxHops=10) and scheduled hop3 `schedule-e1256b2b-a8f7-4d73-82fd-d33776222d50` to start 2026-11-24 16:22:16.
- Code fix and static verification (eslint / npm test exit 0) were finished in hop1 and must not be re-run.

## 交付流程
- 提交推送涉及子模块与父仓两级仓库，需分别提交。
- 禅道 6941 回写要求附带实机验证截图。
- 站点可通过 curl.exe 访问 127.0.0.1 返回 HTTP 200；Invoke-WebRequest 失败不代表站点不可达。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "苏住房G前端项目",
  "source_extraction_id": "b264f29f13c442be959a7c52d1304e4d",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->