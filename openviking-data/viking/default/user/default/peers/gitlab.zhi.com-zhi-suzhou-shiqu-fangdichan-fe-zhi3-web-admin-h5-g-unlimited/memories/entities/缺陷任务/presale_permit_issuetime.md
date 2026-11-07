# 预售许可列表发证时间字段取值修复
房产管理系统zhi2-web-admin中预售许可申请列表「发证时间」列因兜底链误将申请时间显示为发证时间，并按nodeType分支修复使申请页显申请时间、发证页显发证时间。

## 根因与定位
- 页面：预售许可共用列表组件 presale/permit/components/index.vue 的 columns 中「发证时间」列
- 原 formatter: (row) => row.permitIssueTime || row.applyTime || row.createTime || '' 形成兜底链
- 审核中记录无 permitIssueTime 时退到 applyTime，导致「发证时间」列显示申请时间（如 2026-11-05 09:57:38）
- 所有预售许可菜单（申请/受理/踏勘/审核/预公告/发证）共用该组件，靠 nodeType prop 区分；申请页 nodeType=''，发证页 nodeType='taskIssue'

## 修复方案
- 按 nodeType 分支：taskIssue 显示「发证时间」取 permitIssueTime，无值留空；其余显示「申请时间」取 applyTime
- 改动文件：src/views/presale/permit/components/index.vue 第131-144行
- 不同菜单 prop 持久化键不同，分支中 prop 分别用 permitIssueTime / applyTime 互不影响

## 验证与交付
- 在子模块独立 worktree zhi2-web-admin-wt-permit-issuetime（分支 fix/permit-apply-issue-time）开发
- eslint 目标文件 0 报错；@babel/parser 校验 script 语法通过
- npm run build 因本机 vite 版本不一致（5.4.11 vs 声明8.3.5）被拦，未做真实浏览器渲染验证
- worktree 提交 55e2a7d2c，合并回 develop/v3.0.0 得合并提交 d96a4a75b，随后删除 worktree 与分支
- 父仓库 gitlink 未更新（子模块本地提交未推送）

## 字段语义
- permitIssueTime = 真实发证时间（detail.vue 独立字段）
- applyTime = 申请时间
- createTime = 创建时间

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "presale_permit_issuetime",
  "source_extraction_id": "8454e590f81d4109ad3eed00d6242ec7",
  "version": 1,
  "memory_type": "entities"
}
-->