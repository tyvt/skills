# 禅道Bug 6209 已办事项仍显示在待办
房产管理系统zhi2-web-admin中「待办事项」页已审核单据仍显示，根因为账户开户提交按钮误走审批流创建挂起任务。

## 根因
- 待办页 src/views/flowable/todo.vue 纯渲染后端 /flowable/task/todoTaskList，该查询直接取 ACT_RU_TASK 活动任务
- 账户开户详情页 supervision/agreement/account/detail.vue（菜单 busCode 070401）的通用 ZsSubmit 提交走审批流配置，调用 /prefund/regulatoryAccount/submit 起流程生成「审批」待办
- 开户单据实际通过「备案」openAccountRecord 直接完结，流程任务永不完成 → 滞留待办
- DB 佐证：SYS_FLOW_CONFIG 中 070401 配 submitApi=/prefund/regulatoryAccount/submit，V1 直调 openAccountSubmit 仅改状态不起流程（备注 87989 方向）

## 修复方案
- 按用户指示「按备注改前端」：detail.vue 中 ACCOUNT_OPEN 隐藏通用流程提交(:show-submit="isBank")
- 新增「提交」按钮直接调用 auditAccount → /prefund/regulatoryAccount/openAccountSubmit，仅置单据为已提交，不再建流程实例
- 销户(ACCOUNT_CLOSE)银行流程等行为不变

## 验证与交付
- eslint 0 error（13 条为原文件 el-form-item 存量告警）
- npm run test 构建 EXIT=0 通过（仅 Sass deprecation 告警）
- 子模块 zhi2-web-admin develop/v3.0.0 提交 1d58176dd（含合并远端），已推送
- 父仓库 develop/v3.0.0 提交 f8bf4f8（gitlink 更新），已推送，两仓与 origin 同步
- worktree zhi2-web-admin-wt-bug6209 合并后删除

## 禅道回写与未验证
- bug 6209 status=resolved, resolution=fixed, resolvedBuild=trunk, resolvedBy=tiany, assignedTo=lichandan
- DBX 事务补 resolved action 含根因/修复/证据，内外复核一致
- 未验证：未启动 dev server，无测试站点登录态，未浏览器点选复现；env/.env 改动为会话前既有非本次提交


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6209",
  "source_extraction_id": "3fa18db9490d40edb8cfce6f011e8649",
  "version": 1,
  "memory_type": "entities"
}
-->