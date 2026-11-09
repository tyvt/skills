# 禅道#6372 开发企业变更审核后误显提交按钮
开发企业管理模块企业变更详情页在审核通过后错误显示提交按钮的缺陷与修复记录。

## 问题根因
- 后端详情接口 `getByCompanyRecordChangeId` 用 `BeanUtil.toBean` 转 VO 且从未 `setDisplayStatus`，该字段为 `CompanyRecordChangeVo` 瞬态字段恒为 null
- 权威状态是 `BaseApprovalDO.bizState`（0 待提交 / 1 审核中 / 2 已备案），来自 DB `BIZ_STATE` 列
- 旧前端 `resolveAgencyChangeToolbarBizState` 依赖 `displayStatus`，为 null 时被误判为草稿 '0' → 提交按钮显示
- 以真实载荷 `{bizState:'2', displayStatus:undefined}` 跑旧逻辑返回 '0'，与报告截图一致

## 修复方案
- 提交 `c4c8f2e6b`（分支 `fix/bug-6372-developer-change-submit-btn`）：`showSubmitBtn`/`showChangeEditBtn` 仅 `changeBizState === '0'` 才显示
- 涉及文件：zhi2-web-admin kfqy 模块企业信息变更备案 detail.vue

## 完整E2E验证
- 构建 worktree 部署 nginx 站点 `http://127.0.0.1:8099`，build-info = 提交 c4c8f2e6b，`/api/v3.0` 代理开发后端（需保留 /api 前缀）
- 管理端 `zsbase` 登录 → 企业变更管理打开已备案单 `2119732114756820994`，工具栏仅 `["返回","流程查看"]`，submit/edit 按钮 count=0 → 1 passed
- 两位 agent 独立验证结论一致

## 合入与回写
- 子模块 zhi2-web-admin fix 合入 `develop/v3.0.0` 推送，远程 develop = `ecce85068`（含修复）
- 父仓库更新 gitlink → `ecce85068` 推送，远程 develop = `15706fd`
- 禅道 #6372 回写 resolved/fixed/resolvedBy=tiany/resolvedBuild=trunk/assignedTo=lichandan

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "bug6372_change_submit_btn",
  "source_extraction_id": "30eb496106394729aa22743f8d914fba",
  "version": 1,
  "memory_type": "entities"
}
-->