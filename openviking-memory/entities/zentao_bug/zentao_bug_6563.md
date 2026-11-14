# ZenTao Bug 6563
禅道缺陷 6563：经纪机构「机构基本信息」页点「变更」后编辑表单缺少「机构类型」字段，无法修改机构类型。
## Description
- 模块：经纪机构管理 → 机构基本信息（菜单「机构入网认证 > 机构基本信息」），组件 `AgencyBasicInfoForm.vue`（zhi2-web-admin 子模块 `src/views/company/companyManagement/components/`）。
- 现象：查看态能看到「机构类型=有限责任公司」，点「变更」进入编辑表单后基本信息区整段无「机构类型」，无法修改；禅道缺陷无备注。
- 禅道元数据：openedBy=zhunan, product=7, project=200, execution=201。
## Root Cause
- 查看与编辑由同一组件渲染：查看态走 `contentInfo`（含机构类型项），编辑态 `section-form` 逐项手写 `section-field` 漏写机构类型。
- 数据链路已就绪：`companyType` 在表单默认值与变更保存体 `buildCompanyRecordChangeSavePayload` 中，`company_type` 字典驱动 `companyTypeOptions` 已加载，仅缺 UI 字段。
- 字段名区分：`organType` 指机构类别（agency/develop/lease），`companyType` 才是「机构类型」（有限责任公司等），二者不同。
## Fix
- 在 `AgencyBasicInfoForm.vue` 编辑态「机构简称」后补「机构类型」`zs-select`：绑定 `form.companyType`、选项 `companyTypeOptions`、`v-if="!omitCompanyType"`（注销页不展示）、`:disabled="isQxtLocked('companyType')"`（企信通提取后锁定，对齐开发商「企业类型」写法）。
- 仅改此一个文件，未动校验规则/接口/其它流程；eslint 0 error（仅存量 `prefer-zs-components` warning）。
## Resolution Status
- 2026-11-13 会话：修复本地应用、eslint 与 `npm run build`（exit 0/17s）均通过，与基线（exit 0/18s）一致。
- 禅道回写（2026-11-13）经 DBX 事务化 `UPDATE zt_bug` + `INSERT zt_action`：bug 6563 → status=resolved, resolution=fixed, resolvedBy=tiany, assignedTo=zhunan, resolvedBuild=trunk；新增 resolved 动作（action id=93076，含根因+修复+验证），事务提交复核通过。
- 改动落在子模块 zhi2-web-admin（`git status` 显示 `M AgencyBasicInfoForm.vue`，未提交、未构建产物入库）；用户待确认仅提交/提交并推送/暂不处理。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6563",
  "source_extraction_id": "a0fe8b67460d47859a92ceae83a43c1f",
  "version": 1,
  "memory_type": "entities"
}
-->