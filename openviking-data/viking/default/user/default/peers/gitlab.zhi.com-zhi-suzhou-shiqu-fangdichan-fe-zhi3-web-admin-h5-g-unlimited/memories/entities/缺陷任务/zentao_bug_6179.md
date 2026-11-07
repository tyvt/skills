# 禅道Bug 6179 现售备案电子签按钮隐藏
房产管理系统zhi2-web-admin中现售备案申请详情页（presale/cashsale/components/CashsaleDetail.vue）仍显示「电子签」按钮，产品确认现售备案不再需要电子签，需隐藏。

## 根因与定位
- 标题：现售备案-现售备案申请，详情页依然显示了电子签；zhunan 提交、指派 tiany
- 现象：现售备案申请详情页（查看态，路由 presaleCashalse/cashSaleApply/detail）按钮区红色箭头标注的「电子签」zs-button 仍渲染
- 根因：按钮由 showSignButton computed 控制（bizState=0 && signState!='2' 即显示），电子签功能已下线但按钮仍在
- showSubmitButton 原要求 signState==='2' 才显示，移除电子签后提交按钮需解除该门控，否则无电子签时无法提交

## 修复方案
- 移除模板中的「电子签」zs-button
- 删除 showSignButton computed、signBtnTestId computed、handleSign 方法（按钮移除后均成死代码）
- 提交按钮去掉 signState==='2' 门控，改为 bizState=0 即可显示提交（避免因无电子签而无法提交）
- 改动文件：src/views/presale/cashsale/components/CashsaleDetail.vue（单文件，约2行核心改动+清理死代码）

## 验证与交付
- 子模块 worktree zhi2-web-admin-wt-bug6179（分支 fix/bug6179-cashsale-hide-esign），依赖用 junction 指向子模块自身 node_modules（安全用法同 bug6155），npm run build 成功（仅 Sass 弃用告警）
- npx eslint 该文件 0 error/0 warning；整仓 npm run lint 为存量红基线（5804 errors 全仓），本文件未新增命中
- 产物 CashsaleDetail-CLtLJjLu.js 不含 presale/cashsale/sign/start、仍含 cashsale/submit；本地 nginx 8098 站点（root 指向 dist/）已加载新构建
- 提交：子模块 cfe2fb985（fast-forward 合 develop/v3.0.0 并推送）；父仓库 85d5d75（更新 gitlink 指向 cfe2fb985，已推送）；worktree 已清理
- 禅道回写：bug 6179 → status=resolved、resolution=fixed、resolvedBuild=trunk、resolvedBy=tiany、assignedTo=zhunan，action id 87159 已记录，事务已提交并复核

## 未验证项
- 客测环境 58.210.252.230:9002 无登录态，未目视确认按钮消失；本地构建产物已确认代码逻辑正确，建议客测环境部署后复审

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6179",
  "source_extraction_id": "4816b22310684a548f8a8d08be79913d",
  "version": 1,
  "memory_type": "entities"
}
-->