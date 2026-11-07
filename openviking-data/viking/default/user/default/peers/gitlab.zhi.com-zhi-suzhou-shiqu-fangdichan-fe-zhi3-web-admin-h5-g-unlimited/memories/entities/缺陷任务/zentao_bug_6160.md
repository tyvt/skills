# 禅道Bug 6160 预售许可受理详情页重复审核按钮
房产管理系统zhi2-web-admin中预售许可受理详情页同时显示蓝色「审核」与橙色「受理」两个按钮，预期仅显示「受理」。

## 根因与定位
- 页面：预售许可受理详情页 presale/permit/accept/detail.vue 复用共享详情组件 components/detail.vue，业务状态审核中时两按钮并存
- 截图确认：蓝色「审核」(primary) + 橙色「受理」(warning)
- 根因：共享组件 operation-btn-group 未关闭通用流程审批按钮（showApproval 默认 true），流程引擎 isApprovalAuth 返回 true 时经 zs-approval 组件额外渲染蓝色「审核」按钮
- 同时页面自定义 visibleAdminNodes 按 currentNode=taskAccept 渲染橙色「受理」按钮，两按钮并存

## 修复方案
- 在共享详情组件 operation-btn-group 加 :show-approval="false"（detail.vue 第12行附近）
- 主管部门各节点审批（受理/初审/复审/终审等 6 节点：taskAccept、taskFirstAudit、taskReview1、taskReview2、taskNoticeResult、taskFinalAudit）由自定义节点按钮走 PermitApprovalDialog 承担，覆盖全部流程节点，通用「审核」属重复入口
- 企业端申请详情（nodeType=''）无审批权限、不受影响

## 验证与交付
- npx eslint 目标文件通过（exit 0）；npm run build 通过（exit 0，仅存量 Sass @import 弃用告警）
- 构建产物 dist/assets/detail-aYayPPKr.js 含 "show-approval":!1；nginx 站点 http://127.0.0.1:8098/ 已加载新构建（入口 index-DyErLsQb.js）
- 提交推送：子模块 zhi2-web-admin 8510f1e96（含 version.json 构建元数据）推 develop/v3.0.0；父仓库 gitlink fdcfcf6 推 develop/v3.0.0
- 未触碰他人遗留 bug6159*.png 等临时文件，未新增/改动其他 worktree

## 禅道回写
- DBX 事务化回写并提交：status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan（指派回提交人），新增 action 87036（含根因/修复/验证 HTML），提交后复核已落库

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6160",
  "source_extraction_id": "39d72689b3ed4f71857b2cb6f4e7791b",
  "version": 1,
  "memory_type": "entities"
}
-->