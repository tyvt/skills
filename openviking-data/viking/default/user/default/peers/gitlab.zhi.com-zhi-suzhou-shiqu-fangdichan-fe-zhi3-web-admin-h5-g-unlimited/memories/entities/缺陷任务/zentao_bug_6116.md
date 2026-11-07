# 禅道Bug 6116 监管标准管理控制百分比字段缺失
房产管理系统预售资金银行监管→监管协议→监管标准管理页保存报「控制百分比必须大于0」，根因是苏州环境「控制百分比」表单项被误删。

## 根因
- 后端校验字段为 `controlRation`（控制百分比），而非 `percentage`（预售价格百分比）
- 提交 `74820a8dfb` 去掉 `isSuzhouzhizai` 分支时，误删「控制百分比」表单项，仅保留 `percentage`
- 提交 payload 中 `controlRation` 为 `undefined`，触发后端 `RegulatoryStandardVersionServiceImpl.validateRegulatoryPrice` 报错

## 修复方案
- 在 `supervision/agreement/version/detail.vue` 恢复表单项「控制百分比」→ `form.controlRation`（`regulatoryType=='1'` 时禁用）
- 校验、`contentInfo` 查看态、`changeSelect` 清空、`checkControlRation` 与产品/建湖分支对齐

## 验证与交付
- 该文件 `npx eslint` 0 error；`npm run build` 通过
- nginx 8098 已 reload，产物含 `控制百分比` / `controlRation`
- 客测真机保存未验证（无登录态）
- 台账记 `docs/frontend/common-errors.md` 的 E-031
- 子模块提交 `73942b370`、父仓库 `d1f538e`，均合入并推送 `develop/v3.0.0`
- 禅道回写 status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhunan
- worktree 苏州市房地产监测V3-wt-bug6116 已删除；并行 wt-bug6105 未动

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6116",
  "source_extraction_id": "d88651a22c7146dfa4727e6250a958b3",
  "version": 1,
  "memory_type": "entities"
}
-->