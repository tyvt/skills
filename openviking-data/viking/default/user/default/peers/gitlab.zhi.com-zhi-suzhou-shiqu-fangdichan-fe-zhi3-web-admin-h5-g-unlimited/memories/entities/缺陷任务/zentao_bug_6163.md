# 禅道Bug 6163 预售许可申请详情页提交后残留保存按钮
房产管理系统zhi2-web-admin中预售许可申请详情页提交成功后仍显示蓝色「保存」按钮，预期显示「返回 / 流程信息」。

## 根因与定位
- 页面：预售许可申请详情页 presale/permit/components/detail.vue 的 handleSubmit（约971行）
- 提交成功后业务状态=审核中（bizState=1），但 handleSubmit 仅调用 getDetail() 刷新数据，页面仍停留在编辑态（formMode=edit）
- OperationBtnGroup 依据 formMode !== 'view'（即 !isFormDisabled）继续渲染「保存」按钮
- 再次进入查看态（formMode=view）时只显示「返回 / 流程信息」，符合预期

## 修复方案
- 将 handleSubmit 成功处理由 this.getDetail() 改为 this.changeFormState('view', this.form.presalePermitId || this.getId())
- 切换查看态后隐藏「保存」、展示「返回 / 流程信息」，与再次进入查看一致
- 此模式与项目内其他模块保存/提交后 changeFormState('view') 既有约定一致

## 验证与交付
- npx eslint 目标文件通过；npm run build 成功（version 2.6.1，buildTime 2026/11/4 15:58:41，gitHash 886b9e437）
- 构建产物落入父仓库 dist/，本地 nginx 站点 苏州市房地产监测V3（listen 8098）已加载新构建
- 子模块 zhi2-web-admin 提交 bf1dde633 推送 origin/develop/v3.0.0（886b9e437..bf1dde633）
- 父仓库 gitlink 提交 a7840ef 推送 origin/develop/v3.0.0（82fb987..a7840ef）
- 在子模块独立 worktree zhi2-web-admin-wt-bug6163（分支 bugfix/6163-apply-submit-view）开发，ff 合并回 develop/v3.0.0 后删除

## 禅道回写
- DBX 事务化回写并提交：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan，新增 action 87068（含根因/修复/验证说明），提交后已复核落库

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6163",
  "source_extraction_id": "e4c3580d5389475d91a7f1dd3ba4bbc5",
  "version": 1,
  "memory_type": "entities"
}
-->