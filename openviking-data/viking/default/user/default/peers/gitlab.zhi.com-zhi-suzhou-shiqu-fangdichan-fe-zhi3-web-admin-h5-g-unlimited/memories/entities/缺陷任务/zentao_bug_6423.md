# 禅道Bug 6423 现售详情通用审批按钮未关闭
房产管理系统zhi2-web-admin中现售备案详情页（CashsaleDetail.vue）因未关闭通用审批，在审核中状态下多画出「审核」按钮，与当前节点「受理」按钮重复。

## 根因与定位
- 页面：现售备案详情页 presale/cashsale/components/CashsaleDetail.vue
- operation-btn-group 未传 :show-approval="false"，showApproval 默认 true
- 业务状态为审核中时，公共组件 zs-approval 仍渲染「审核」按钮；当前节点为受理，页面同时画出「受理」
- 预售许可详情早就关掉了通用审批，现售详情遗漏

## 修复方案
- CashsaleDetail.vue 的 operation-btn-group 增加 :show-approval="false"
- 审批只保留阶段按钮（受理页即「受理」），移除多余通用「审核」按钮
- 错误台账 docs/frontend/common-errors.md 补充 E-048

## 验证与交付
- 子模块 zhi2-web-admin 提交 ef0c31ceb，父仓库 gitlink 提交 a9bd4a3，均推送 origin/develop/v3.0.0
- 禅道回写：status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=zhunan（指回 zhunan）
- 错误台账补 E-048

## 未验证项
- 未执行 npm run build、未部署、客测站点未点击验收
- 需部署后确认「现售方案受理」详情页是否仅剩「受理」按钮

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6423",
  "source_extraction_id": "b651c0c9b3b74ff59466444853a2fae4",
  "version": 1,
  "memory_type": "entities"
}
-->