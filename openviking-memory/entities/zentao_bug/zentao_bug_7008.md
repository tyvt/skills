# 禅道 Bug 7008
禅道缺陷 7008「PC 端汛后检查整改与复盘五项必填校验」：首轮提交校验已闭环，2026-11-26 17:39 因"保存"仍可留空被重新激活，次轮保存校验修复已落地并实机验证，因用户未确认尚未提交/推送/回写。

## 基本信息与首轮闭环
- 禅道元数据：openedBy=lichandan、product=79、project=141、execution=142；chain_id=bug7008-pc-postcheck-required（hop2/max10，已终止），提交号 e7b9eb0、0f429f4。
- 首轮提交校验（技术实现见「汛后检查整改复盘五项提交必填校验修复」）：2026-11-26 完成 comment 双图回写与产物清零、status=resolved/fixed、链路终止；按「文档为准」处理 11:30 tiany 已 resolved（H5 那次）但 zt_action 无 commented 的冲突，补记 PC 端修复；用户 verify_gate2 确认回写、按「禅道任务免二次问」未二次 ask。
- 上传验证图 fileID：toast 24640（134KB）、编辑态 24641（230KB）；事务 session=mcp-session-c2f7b563-83a0-4386-8e84-26b71b7d840d：UPDATE assignedTo=lichandan、INSERT zt_action（内嵌两图、files=24640,24641）影响 1 行、挂附件影响 2 行；复核 resolvedDate=17:13:55、最新 action 100538，COMMIT 关 session。
- dry-run 确认 17 个文件全命中 `$TEMP/bug7008-*` 无嵌套目录，删除后复核 0 残留；P1 非阻塞边界（状态值 0/上传失败/重复提交）未做。

## 次轮保存校验修复
- 2026-11-26 17:39 lichandan 重新激活（tiany 此前两次 resolved）：PC 端"保存"时整改字段留空仍能存成功。
- 根因：`validatePostExtraForm` 只挂 `beforeSubmit`；"保存"走 `handleSave → saveFloodRecord(..., {allowBlankItems:true})`，内部仅 `validateFloodForms`+`validateFloodPayload`、从不调 `validatePostExtraForm`，故留空可存。
- 实机复现（test 8167）：记录 XHJC20261126000006（待提交，17:37 留空保存），formMode=edit/inspectionStage=4，整改四项留空点"保存"→跳列表 `?type=back` 成功、无拦截，已截图。
- 修复：`validatePostExtraForm()` 从只挂 `beforeSubmit` 扩展到也挂 `handleSave` 覆盖五项；plan_review 两轮 88→94 分、0 P0，用户已确认实施；sessionId=session-849090a5-da83-4408-a97d-2bcd1dba5089；`detail.vue` 在 handleSave 的 saveFloodRecord 前增挂并更新注释（删"草稿保存不受影响"旧表述），台账 E37 更新。
- 校验：单文件 ESLint exit 0；基线 build exit 0（gitHash 5c5afbafe 为改前 HEAD，watchdog 报 STALL）；改后 build exit 0、dist buildTime 17:58:31；站点 8167 root 指向本项目 dist、nginx 直读新文件。

## 实机验证与证据
- 校验顺序（detail.vue:1100-1104）：整改措施→整改期限→整改状态→整改责任人→现场照片；五项全留空命中"请输入整改措施"停留表单、填整改措施后命中"请选择整改期限"、五项填全保存成功跳 `?type=back`；汛前/汛中不触发（`if (!this.isPost) return ''`，:1098，未实机抽查、以代码守卫+汛后三场景为据）。
- 三张证据图落 `$env:TEMP/zentao-7008/`：v1-empty-after-20261126-181853.png、v2b-deadline-20261126-182113.png、v3-full-save-20261126-182424.png，已自检非空/内容正确/present/行内嵌；hop2 复检 v1/v3 用 analyze_image、v2b 用 read_image。
- 用户验证门多次请求确认均中断（含等待约 9335s 后 aborted、约 35 分钟 aborted），始终未明确确认；按 P0「未确认禁止提交/推送/回写」，提交、推送、禅道回写均未执行，截图按门控保留未删。

## 交接进展与待办
- 用户问"能否用表单自带校验"：助手据代码答复为能用但代价大——自带 rules 仅 eventId/checkDate/complexId 三字段（detail.vue:464-468），整改五项在自定义栅格 .result-table__row 无 prop（:154-179）rules 扫不到；handleSave（:1067-1076）走 saveFloodRecord 不调 `form.validate()`（即 bug 成因）；改用自带校验要改三处（五项改 el-form-item prop、加 5 条 rules、handleSave 调 validate()），面大于 14 行守卫且与 H5 口径不一致；当前 validatePostExtraForm（:1097-1109）为最小改动方案。
- 等效成本越 1.00M、本会话约 186k 触发硬交接：hop1 文档 HANDOFF-CHAIN-bug7008-pc-save-required-hop1-20261126-1812.md；hop2 文档 HANDOFF-CHAIN-bug7008-pc-save-required-hop2-20261126-1901.md（schedule-e66b1715-caa1-439b-baf1-9e5cc0c1504d，19:01:52 投递）；本会话生成 hop3 文档 HANDOFF-CHAIN-bug7008-pc-save-required-hop3-20261126-2233.md（第 8 节固化"自带校验"答复、下跳无需重调研），排程 hop4（22:34:23 投递、new_once）。
- 待下一跳（hop4）：重新取用户确认 → 确认后 submodule-commit 提交推送（仅 detail.vue + common-errors.md + 父仓 gitlink）→ 禅道 7008 回写（comment 内嵌三图）→ 清理；无需再动浏览器验证。
- 浏览器坑：会话名 `bug7008-e91695ee90b8`，反复 job_kill 会杀守护进程致页面丢失、需 daemon 保活，snapshot 易挂起。


<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_7008",
  "source_extraction_id": "1c6b17c29fe049d3b85161cbcedce44b",
  "version": 4,
  "memory_type": "entities"
}
-->