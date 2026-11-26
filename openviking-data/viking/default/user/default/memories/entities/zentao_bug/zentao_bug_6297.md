# 禅道 Bug 6297
【苏州房产客测环境】预售许可-预售许可申请，已维护工程进度的看不到附件；2026-11-06 修复并回写禅道 resolved/fixed。

## 问题与根因
- 「工程形象进度查看」弹窗 `src/views/presale/permit/components/PresaleProgressDialog.vue` 只读态只渲染「已上传/未上传」静态文本，从不渲染附件文件名/链接。
- `loadExistingAttachments()` 已按 busId `2117880517711921153` + busCode `PRESALE_PROGRESS_FILE` 拉到附件列表（接口返回 3 个文件：A.png、A.png、客测项目…pdf，字段 fileName/fileSite/fileThumbnailSite/fileType），但代码只保留布尔值 hasFiles，用户看到「已上传」却无法查看/下载。

## 代码改动
- 数据模型 `uploadedSnapshotIds`（布尔集合）改为 `snapshotFiles`（busId → 附件列表映射）。
- 只读态按文件名渲染可点击链接，点击复用项目已有 `downloadServerAssetFile(fileSite, fileName)` 下载/查看；维护态上传成功后同步更新映射；`hasAttachment` 改为基于列表判断。

## 验证与交付
- eslint 0 error（仅存量 el-form-item→zs-form-item 警告）；vite test 构建成功（gitHash d925273）；自检脚本 check-dialog-form-layout / check-vue-option-shorthand / check-no-label-position-left 通过，check-dialog-picker-suffix-icon 为已知存量红线（5 处陈旧命中，与本次无关）。
- 子模块提交 d925273f9（develop/v3.0.0），父仓 gitlink ac7b2cd（develop/v3.0.0），均已推送且远端 0/0 对齐。
- 禅道 active → resolved/fixed，resolvedBy=tiany，指派回原提交人 zhunan，resolvedDate=2026-11-06 15:19:27；action 88468 记录根因+修复+验证并复核落库。
- worktree szfc-v3-sub-wt-bug6297 已删除；eslint 依赖 hoist 在根 node_modules，worktree 需 junction 到根 node_modules；public/version.json 为构建产物已还原未提交；其他并行任务未提交改动（env/.env、permit/detail.vue、permitExtend/detail.vue）未触碰。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6297",
  "source_extraction_id": "955314ce34404803aed611d61c869231",
  "version": 1,
  "memory_type": "entities"
}
-->