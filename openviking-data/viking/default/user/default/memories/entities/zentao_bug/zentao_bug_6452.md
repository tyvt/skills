# 禅道 Bug 6452
苏住房防汛C端移动查询H5「防汛检查表单填报日期默认值与选择项预选值」缺陷，2026-11-11 由助手分析、修复、提交推送并回写禅道为已解决。

## Description
- 缺陷一：C端H5防汛检查表单（汛前检查/汛中巡检/汛后检查）填报日期显示「请选择日期」、无默认值，硬编码 `date = ref('2026-10-24')`（Ref8443Inspection.vue:62），应默认今天。
- 缺陷二：是/否开关、正常/异常选项默认预选（`toggles=[0,0,0]`、`choices=[0,...]`、`postPicked ?? 0`），应由检查员主动勾选、无需预填。
- 附截图 22341.png、22340.png 展示表单 UI。

## 根因与改动
- 根因：Ref8443Inspection.vue 硬编码日期并默认预选首项；本地 .env 为 VITE_DATA_MODE=remote，截图显示 Ref8443 UI，即部署测试构建走该文件路径。
- 修复：该文件填报日期改 `today()`（默认当天），`toggles`/`choices` 默认统一改 `-1`（强制主动勾选），`postPicked` 的 `?? 0` 改 `?? -1`；src/pages/inspection/index.vue 的 remote 路径「填报日期」也默认当天（demo 路径经 `initialValues` 本就默认当天）。
- 仅两文件改动（git status 确认），后台 `uni build --outDir ./dist` 构建通过（exit 0，DONE Build complete）。

## 处理与当前状态
- 助手加载 zentao-analyzer skill，读 bug 详情、zt_action（无评论）与步骤，下载并 vision 分析截图，定位 Ref8443Inspection.vue 与 index.vue；用户选择 commit & push 并回写禅道。
- 按 repo-safety、submodule-commit skill 确认本地 dev（HEAD 72bc8cf）与 origin/dev 同步（0/0），提交两文件 `0c0d61e` 推送 `dev`（`72bc8cf..0c0d61e`），再经 DBX 事务回写禅道：置 resolved/fixed 并写入含根因+修复+验证的 comment（事务已 commit、session 已关闭）。
- 禅道 6452 现为 resolved/fixed，`resolvedBy=tiany`，`assignedTo` 退回 `lichandan`（`openedBy=lichandan`，`product=79`，`project=141`，`execution=142`）。
- 代码已在 `origin/dev`（`0c0d61e`），未跑全量 Playwright 真机联调（8095 端口验证）；工作区仅多出 `.tmp-bug6456/`（他人遗留，未触碰），临时截图目录 `.tmp-bug6452/` 已清理。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6452",
  "source_extraction_id": "24a63e67f92040c9a27eaab3d156301b",
  "version": 7,
  "memory_type": "entities"
}
-->