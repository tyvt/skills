# ZenTao Bug 6464
禅道缺陷 6464：经纪机构从业人员变更流程中，发起变更后尚未修改任何字段，页面即提前显示「变更标识/变更标记」。

## Description
- 模块：经纪机构（agency）从业人员变更流程，`companyChangeManage` → `institution/agencyPersonnel`（zhi2-web-admin 子模块）。
- 现象：点击「发起变更」后，字段上的变更标记/红标（change badge）在用户未做任何编辑时就已显示。
- 禅道缺陷无备注（comments/备注为空）。

## Root Cause
- 表单模式下的变更标记来自 `AgencyPersonnelBasicInfoFormFields.vue`，其自定义 `changeBadge` 方法（约 179-185 行）用原始 `!==` 比较 `this.form[field]` 与 `this.beforeForm[field]`。
- 其它同类变更详情页均委托给 `changeObjectMixins.js` 中的标准化 `changeBadgeValue`，该方法使用 `normalizeChangeCompareValue`（处理日期/时间与时区及类型强转）。
- 因 `form` 与 `beforeForm` 在类型/格式上不完全一致（即便语义相等），原始 `!==` 误判为不一致而触发红标。
- 回归由提交 `3389f6d91` 引入；仅此组件使用原始比较（LeasePersonnelDetail、AgencyBranchDetail、toB/personnelRecord/detail 均委托标准化混入）。

## Fix
- 使 `AgencyPersonnelBasicInfoFormFields.vue` 的 `changeBadge` 委托给 `changeObjectMixins` 的标准化 `changeBadgeValue`（引入 `changeObjectMixins`，保留原有 `changeActive` 守卫），与兄弟页面一致。
- 对该文件 eslint 通过（0 error；模板第 6/36 行 2 个 `<el-form-item>` 警告为预存在、与本改动无关）。

## Resolution Status
- 截至 2026-11-11 会话：修复已本地应用、eslint 验证通过（0 error / 0 新增 warning，2 条 el-form-item 存量 warning 无关）；禅道回写已完成。
- 禅道回写（2026-11-11）：通过 DBX 事务化 UPDATE zt_bug + INSERT zt_action 完成。bug 6464 → status=resolved, resolution=fixed, resolvedBy=tiany, assignedTo=zhunan（退回开单人）。
- 禅道元数据：openedBy=zhunan, product=7, project=200, execution=201。
- 构建验证未完整执行：当前 HEAD 在无关模块 company/companyManagement/components/AgencyBasicInfoDetail.vue 因 LEASE_CHANGE_FLOW_BUS_CODE 在 companyRecord.js 缺失导出而编译中断（rolldown binding error），与本次改动零交集、不在本 bug 范围，未改动该模块。
- 改动仅一个文件：src/views/institution/agencyPersonnel/components/AgencyPersonnelBasicInfoFormFields.vue，位于分支 develop/v3.0.0（主仓，非 worktree）。version.json 因失败构建自动改时间戳/hash，已还原以保持工作树干净（AGENTS.md 禁止提交）。
- 用户选择「提交并推送」，助手按固定子模块提交顺序（先提交子模块→再更新/推送父仓 gitlink，设 GIT_EDITOR=true 自动化）执行中。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6464",
  "source_extraction_id": "6b22be1af5724556b45c355958221d0f",
  "version": 2,
  "memory_type": "entities"
}
-->