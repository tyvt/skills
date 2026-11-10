# 禅道Bug 6424 现售审批按钮隐藏
房产管理系统zhi2-web-admin中现售备案详情页因误用预售流程编码，导致受理、踏勘、审核按钮均不显示，代码已修改、提交推送并回写禅道。

## 根因与定位
- 现售详情判断能否出受理/踏勘/审核时，误用预售许可流程编码 `ysxksq`
- 现售单据实际挂在 `xsbasq` 上（流程配置提交、审批指向 `/presale/cashsale/`）
- 流程对不上，审批人校验失败，按钮在权限判断前被隐藏
- 菜单权限正确：受理 `presale:cashsale:accept`，踏勘/审核 `presale:cashsale:approval`

## 修复方案
- `cashsaleConstants.js` 增加现售流程编码 `xsbasq`
- `CashsaleDetail.vue` 直报现售审批按钮改用 `xsbasq`；转现售仍走 `yszxs`
- 错误台账 `docs/frontend/common-errors.md` 补充 E-049
- 两文件 eslint 已通过

## 验证与交付
- 代码已改完，子模块提交 e647ae3fe、父仓库提交 20a74e7 均在 develop/v3.0.0，已推送并回写禅道
- 未构建、未部署，客测站点未点击验收
- 禅道 #6424 已解决（fixed，trunk），指回 zhunan
- 需部署后用市住建账号确认「现售备案受理」详情出现「受理」，踏勘/审核页同理

<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6424",
  "source_extraction_id": "03af843954c54fb3b2410cbe7cbac421",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->