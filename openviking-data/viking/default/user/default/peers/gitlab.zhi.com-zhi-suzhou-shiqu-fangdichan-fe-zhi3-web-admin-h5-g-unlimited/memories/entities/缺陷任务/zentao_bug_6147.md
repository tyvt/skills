# 禅道Bug 6147 预售许可退回后无需电子签
房产管理系统zhi2-web-admin中预售许可申请详情页（presale/permit/components/detail.vue）退回（驳回）后重新打开仍显示「电子签」按钮且无「提交」按钮，产品确认退回受理不需要电子签功能。

## 根因与定位
- 标题：预售许可：退回的预售许可受理，要先执行电子签，不需要电子签功能
- 后端 2026-10-20 已取消预售许可电子签环节（保存即置 signState=SIGNED，submitPresale 不再校验签章）
- 但驳回时后端将单据回写为 bizState=0（待提交）+ approveState=3 + signState=0（SaleRecordServiceImpl 约1608/1696行）
- 前端 showSignButton（bizState=0 && signState!='2' 显示电子签）、showSubmitButton（signState==='2' 才显示提交）按 signState 门控 → 退回单据 signState 归零重现「电子签」且看不到「提交」

## 修复方案
- 与现售 CashsaleDetail.vue 既有先例对齐：删除「电子签」按钮及 showSignButton / handleSign 方法
- showSubmitButton 去掉签章前置，改为「查看态 + bizState==='0' + 已保存」即可提交（formMode==='view' 口径，由 bug6180 提交 de6ee70bb 同步收紧）
- e2e 同步移除签章步骤（presale-permit-real-api-flow.spec.js、presale-permit-helpers.js）
- 改动文件：src/views/presale/permit/components/detail.vue

## 验证与交付
- 子模块 worktree zhi2-web-admin-wt-bug6147（分支 fix/bug6147-permit-return-no-esign），依赖 junction 指向子模块自身 node_modules（安全用法），npm run build 成功
- npx eslint 3 个改动文件 0 error；整仓 npm run lint 为存量红基线
- 产物 detail-*.js 实测：presale-permit-sign-btn 0 处、presale-permit-submit-btn 保留
- 合并回 develop/v3.0.0（99cf5f75f，与 bug6180 的 de6ee70bb 改 formMode==='view' 手工解冲突共存）；父仓库 d8ad5b0（gitlink + 常见错误台账 E-036）；worktree 已清理
- 禅道回写：bug 6147 → status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=lichandan

## 未验证项
- 客测环境无登录态，未目视确认按钮消失；本地构建产物已确认代码逻辑正确


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6147",
  "source_extraction_id": "f2c17354de564ab79c32f38e3d9f320c",
  "version": 1,
  "memory_type": "entities"
}
-->