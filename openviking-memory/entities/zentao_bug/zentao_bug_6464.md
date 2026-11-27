---
audit_status: valid
last_checked: 2026-11-27T23:13:58+08:00
verdict_note: AgencyPersonnelBasicInfoFormFields.vue/changeObjectMixins.js 命中；changeBadge/changeBadgeValue/normalizeChangeCompareValue/beforeForm 均命中，委托 mixin 修复属实。
---
# ZenTao Bug 6464
禅道缺陷 6464：经纪机构从业人员变更流程中，发起变更后尚未修改任何字段，页面即提前显示「变更标识/变更标记」。

## Description
- 模块：经纪机构从业人员变更流程 `companyChangeManage` → `institution/agencyPersonnel`（zhi2-web-admin 子模块）。
- 现象：点击「发起变更」后字段上的变更标记/红标即显示；该禅道缺陷无备注（comments 为空）。
- 回归由提交 `3389f6d91` 引入，且仅此组件使用原始比较。

## Root Cause
- `AgencyPersonnelBasicInfoFormFields.vue` 自定义 `changeBadge`（约 179-185 行）用原始 `!==` 比较 `this.form[field]` 与 `this.beforeForm[field]`。
- 兄弟变更详情页（LeasePersonnelDetail、AgencyBranchDetail、toB/personnelRecord/detail）均委托 `changeObjectMixins.js` 的 `changeBadgeValue`，用 `normalizeChangeCompareValue` 处理日期/时间、时区与类型强转。
- 本组件 `form` 与 `beforeForm` 类型/格式不一致，即便语义相等也被误判为不一致而触发红标。

## Fix
- 令 `changeBadge` 委托 `changeObjectMixins` 标准化 `changeBadgeValue`（引入混入，保留原有 `changeActive` 守卫），与兄弟页面一致。
- 仅改一个文件：`src/views/institution/agencyPersonnel/components/AgencyPersonnelBasicInfoFormFields.vue`，位于分支 develop/v3.0.0（主仓，非 worktree）。
- 该文件 eslint 通过（0 error；模板第 6/36 行 2 个 `<el-form-item>` 警告为存量、与本改动无关）。

## Resolution Status
- 2026-11-11：修复本地应用、eslint 验证通过；禅道回写经 DBX 事务化 `UPDATE zt_bug` + `INSERT zt_action` 完成：status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhunan（退回开单人）。
- 禅道元数据：openedBy=zhunan、product=7、project=200、execution=201。
- 构建验证未完整执行：HEAD 在无关模块 `company/companyManagement/components/AgencyBasicInfoDetail.vue` 因 `LEASE_CHANGE_FLOW_BUS_CODE` 在 `companyRecord.js` 缺失导出而编译中断（rolldown binding error），与本改动零交集、未改动该模块。
- 失败构建自动改动的 `version.json` 时间戳/hash 已还原以保持工作树干净（AGENTS.md 禁止提交）。
- 用户选择「提交并推送」，按固定子模块顺序（先提交子模块，再更新/推送父仓 gitlink，设 `GIT_EDITOR=true`）执行中。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6464",
  "source_extraction_id": "7a108257b753426c88730f45fa1e0dc8",
  "version": 4,
  "memory_type": "entities"
}
-->