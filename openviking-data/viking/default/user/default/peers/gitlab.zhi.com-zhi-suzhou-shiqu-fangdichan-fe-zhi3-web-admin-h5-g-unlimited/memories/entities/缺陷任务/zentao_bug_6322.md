# 禅道Bug 6322 现售备案页面方案文案硬编码为预售
房产管理系统zhi2-web-admin中现售备案申请详情页（CashsaleDetail.vue）已传 plan-title="现售方案"，但方案说明仍硬编码显示「预售方案」。

## 根因与定位
- 页面：现售备案详情页 presale/cashsale/components/CashsaleDetail.vue 引入 PermitPlanPanel 并传 plan-title="现售方案"
- 子组件 PermitPlanPanel.vue（约71-72行）提示语硬编码为「预售方案需先在系统内…」，未使用传入的 planTitle
- 现象：现售备案申请页面方案说明段错误显示预售措辞，与标题不一致

## 修复方案
- 将 PermitPlanPanel.vue 中硬编码「预售方案」提示改为使用动态 prop `planTitle`，即 `{{ planTitle }}需先在系统内完成信息维护；…`
- 改动仅模板文案，最小且正确，与标题及现售入参一致
- 改动文件：src/views/presale/permit/components/PermitPlanPanel.vue（单文件，约2行核心改动）

## 验证与交付
- 子模块 zhi2-web-admin worktree `fix/bug-6322-cashsale-plan-hint`（路径 `D:\repository\苏州市房地产监测V3-wt-bug6322`）开发，已合并回主仓
- 子模块提交 `f830bcb97`（分支 develop/v3.0.0，已推送）
- 父仓库提交 `2095895`（chore(submodule): …，已推送 origin/develop/v3.0.0）
- npx eslint 该文件无问题；全仓 npm run lint 仍有历史基线告警/报错，非本次引入
- 禅道回写：bug 6322 → status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan，操作记录 id 88634（根因+修复+提交号）

## 未验证项
- 按项目约定未启 dev server，未在 nginx 部署站点上做浏览器验收
- 残留 worktree 仍存在，若不需要可执行 `git worktree remove "D:\repository\苏州市房地产监测V3-wt-bug6322"`
- 本地父仓仍有 env/.env 修改与 .tmp-bug6275-*.png，与本次无关

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6322",
  "source_extraction_id": "7925c7da844748abb10d4f1f4207f303",
  "version": 1,
  "memory_type": "entities"
}
-->