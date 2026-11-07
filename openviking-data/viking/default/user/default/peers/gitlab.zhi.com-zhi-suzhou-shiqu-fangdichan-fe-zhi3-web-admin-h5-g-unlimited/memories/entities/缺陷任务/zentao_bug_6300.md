# 禅道Bug 6300 预售许可延期申请详情页多了审核按钮
房产管理系统zhi2-web-admin中预售许可延期申请详情页（审核中状态）多出一个通用「审核」按钮，点击报“服务器异常/审批操作失败”。

## 根因与定位
- 页面：预售许可延期详情页 presale/permitExtend/detail.vue
- 页面自带基于审批节点的 visibleAuditNodes（渲染「初审审批/复审审批」）+ 自有 ApprovalDialog
- 但未给 operation-btn-group 传 :show-approval="false"，showApproval 默认 true
- bizState=1（审核中）时通用 zs-approval 额外渲染「审核」按钮，其审批链路未配置导致报错
- 截图右侧三按钮：「审核」(多余)、「初审审批」(应有)、「流程查看」(应有)

## 修复方案
- detail.vue 的 operation-btn-group 增加 :show-approval="false"
- 移除多余通用「审核」按钮，保留页面自有初审/复审审批与流程查看
- 改动仅1行模板属性，最小且正确

## 验证与交付
- 独立 worktree（bugfix/zentao-6300-extra-audit-btn，基于父仓库 gitlink 89abeddec）开发，合并回 develop/v3.0.0 后删除
- npm run build 通过（exit 0）；环境 node_modules 中 consola 版本不一致导致改前构建已失败，已 --no-save 修复 consola@3 后基线及含修复构建均 exit 0
- 子模块 zhi2-web-admin 提交 33ed9528d（fix）+ 68809bf1f（merge），已推送 origin/develop/v3.0.0
- 父仓库 gitlink 提交 e97fe7f，已推送 origin/develop/v3.0.0
- 禅道 DBX 事务回写：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=lichandan，附根因+修复+验证备注（action 88483），提交后复核一致

## 未验证项
- 未在浏览器实机登录点击复测（项目约定不启动本地 dev server）
- 已通过构建+逻辑/截图核对确认按钮来源与修复点；构建产出 dist 已刷新

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6300",
  "source_extraction_id": "a4b3f04549734449a4a914f2efc17547",
  "version": 1,
  "memory_type": "entities"
}
-->