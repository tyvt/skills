# 苏住房防汛模块
苏住房前端(zhi2-web-admin)防汛/应急预案前端模块；代码位于 worktree `bug5897`（分支 `develop/v2.6.2-suzhufang-li`）与 `bug6369`（分支 `fix/bug6369-flood-plan-download`），主checkout不含。

## 代码与文件
- 页面：src/views/flood/ 下应急预案详情页 detail.vue、积水原因复盘 cause/index.vue
- 下载：src/components/detail-template/detail-template.vue（466-485行）；上传：zs-file-upload.vue（url=res.data.fileSite 存 planFileUrl）
- 下载链：detail.vue 用 DetailTemplate(type:'image',download:true)→getAttachmentFullUrl→resolvePublicAssetUrl→resolveServerAssetUrl（依 pathname 重建URL，viteBase="./"）

## 数据存储
- 业务库：苏住房测试(达梦 Dameng)，schema `SERVICE_EXPAND`，表 `T_FLOOD_PLAN`
- `PLAN_FILE_URL` 存同源根相对路径，如 `/zhi2-dev/2026/9/e/2/<uuid>.docx`

## 工作约束
- 修改前必读 flood skill + flood docs，修改后更新 `common-errors.md`
- 重度构建/lint 走 `orchestrate`，主模型只读摘要

## 关联缺陷
- Bug 6369（产品79 G端安全管理）：应急预案上传后打不开。根因 DetailTemplate.downloadAttachmentFile 裸 fetch 无 token→401→<a>导航/login；修复(2026-11-10)改用鉴权 downloadGet，失败 reject→window.open 降级；三 download:true 调用方均防汛详情页。ESLint 通过、common-errors.md 增 E21。禅道 resolved/fixed。合并：fix 提交 7675b3197，子模块 suzhufang-li ff 推送，父仓库 苏住房G 提交 22b3a02 提升 gitlink，bug5897 同步；git 身份 ty。
- Bug 6401：防台防汛页单据编号/提交时间列被省略号截断。根因 CheckPage.vue 与 cause/index.vue 列宽170/160不足（业务库单据号18位/时间19位）。修复(2026-11-10)列宽改200/190px，ESLint 通过，提交 f86a6b9cc 推送 suzhufang-li，common-errors.md 增条目(909cae311)。禅道 resolved/fixed/resolvedBy=tiany/assignedTo=lichandan。
- Bug 6402（2026-11-10）：积水原因复盘需校验必填。根因 cause 表格复盘内容(reviewContent)为空保存仍成功，validateFloodPayload 未校验。修复：bug5897 worktree(分支 develop/v2.6.2-suzhufang-li) 扩展 validateFloodPayload 要求每行复盘内容必填；ESLint 通过；common-errors.md 增 E23/F23(原E22与远端冲突后重编号)。Git：子模块 suzhufang-li 5d7ef8921→合并回 suzhufang 7cfeb00ee；父仓库 苏住房G gitlink→7cfeb00ee，suzhufang-li 2dec77d→合并回 suzhufang f6018fb。禅道回写：active→resolved/fixed、resolvedBy=tiany、resolvedBuild=trunk、assignedTo=lichandan(退回报告人)、zt_action id 90455(extra=fixed，备注含提交号5d7ef8921→7cfeb00ee)。注：本会话 npm test 环境挂起未跑构建，联调待补。
- Bug 6435（2026-11-10，产品79 G端安全管理）：汛前检查统计汇总详情页优化。需求：统计汇总(detail.vue)日期列未默认今日且未冻结前两列。修复：bug5897 worktree(分支 develop/v2.6.2-suzhufang-li) 在 resetSummary 默认日期为今日自动统计今日、冻结序号+区域两列并移除日期列、更新合计行映射；ESLint 通过、npm test 构建通过。Git：子模块 suzhufang-li 5d7ef8921→1e4f697cd 推送；父仓库 苏住房G gitlink→1e4f697cd 提升并推送。禅道回写：准备中(execution=142、openedBy=lichandan、resolvedBy=tiany、assignedTo=lichandan)，事务会话待开启。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "suzhufang_flood_module",
  "source_extraction_id": "be307e27384c4577ad7d8a3af378b4f4",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "version": 9,
  "memory_type": "entities"
}
-->