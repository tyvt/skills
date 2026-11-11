# 禅道 Bug 6452
禅道缺陷 6452 为苏住房防汛C端移动查询H5「防汛检查表单填报日期默认值与选择项预选值」问题，2026-11-11 由助手分析、修复、提交推送并回写禅道为已解决。

## Description
- 问题：C端H5防汛检查表单（汛前检查/汛中巡检/汛后检查，部署测试构建走 Ref8443Inspection.vue 路径）存在两处问题：
  1. 填报日期显示"请选择日期"无默认值，代码硬编码 `date = ref('2026-10-24')`（Ref8443Inspection.vue:62），应默认今天。
  2. 选择项（是/否开关、正常/异常选项）默认预选了值（`toggles=[0,0,0]`、`choices=[0,...]`、`postPicked ?? 0`），但检查员应主动选择，不需要预填。
- 附截图 22341.png、22340.png 展示表单 UI。

## 根因与改动
- Ref8443Inspection.vue 硬编码日期 '2026-10-24' 且选择项默认预选首个选项（本地 .env 为 VITE_DATA_MODE=remote，但截图显示 Ref8443 UI，即部署测试构建走 Ref8443 路径）。
- 修复：Ref8443Inspection.vue 填报日期改为 `today()`（默认当天），`toggles`/`choices` 默认值统一改为 `-1`（不预选，强制现场人员主动勾选），`postPicked` 的 `?? 0` 改为 `?? -1`；index.vue remote 路径「填报日期」也统一默认当天，保持一致（demo 路径本就经 `initialValues` 默认当天）。
- 两文件改动，构建通过（uni build exit 0）。

## 处理时间线
- 助手加载 zentao-analyzer skill，读取 bug 详情、zt_action（无评论）、步骤，下载并 vision 分析截图，定位 Ref8443Inspection.vue 与 index.vue。
- 应用编辑，后台运行 uni build 验证通过（exit 0，DONE Build complete），git status 确认仅两文件改动。
- 用户选择 commit & push + 回写禅道；助手加载 repo-safety 与 submodule-commit skill，确认本地 dev（HEAD 72bc8cf）与 origin/dev 同步（0/0），提交 `0c0d61e`（两文件改动：Ref8443Inspection.vue、src/pages/inspection/index.vue）并推送到 `dev`（`72bc8cf..0c0d61e`）。
- 经 DBX 事务回写禅道：bug 置 resolved/fixed，`resolvedBy=tiany`，`assignedTo` 退回 `lichandan`，写入含根因+修复+验证的 comment（事务已 commit、session 已关闭）。

## 当前状态
- 禅道 6452 为 resolved/fixed，`resolvedBy=tiany`，`assignedTo` 退回 `lichandan`（禅道元数据：`openedBy=lichandan`，`product=79`，`project=141`，`execution=142`）。
- 代码已提交 `0c0d61e` 并推送到 `origin/dev`；构建验证通过（`uni build --outDir ./dist` exit 0），未跑全量 Playwright 真机联调（8095 端口验证）。
- 工作区仅多出不相关 `.tmp-bug6456/`（他人遗留，未触碰），临时截图目录 `.tmp-bug6452/` 已清理。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6452",
  "source_extraction_id": "f9a57b8a059a4722abe42579e8cf4af3",
  "version": 2,
  "memory_type": "entities"
}
-->