# 禅道#1152项目结算预警前端对接
惠山二期G zhi2-web-admin 禅道 #1152 项目结算预警前端对接，修改集中在 completion/detail.vue、final/index.vue、final/detail.vue。

## 竣工验收页改动
- 「维修预算金额」改为「预算维修费(元)」仍绑定 maintainFeeAmountY，新增必填「施工结算总额(元)」(constructionSettleAmount) 带 tooltip 与校验
- 查看态 contentInfo 同步展示施工结算总额，切换维修项目时同步 constructionSettleAmount（有则回填无则清空）避免残留

## 结算列表与详情
- final/index.vue「维修费(元)」列 settleWarnFlag === true 时金额标红并显示 el-icon-warning-outline，tooltip 为 settleWarnMsg
- 预警逻辑仅依赖后端字段，前端不自行计算比例；final/detail.vue 同步展示预警信息

## 已知风险
- settleWarnFlag 若后端返回字符串 '0'/'1'，v-if="settleWarnFlag" 真值判断令 '0' 为真，致无预警记录误显示红色金额与警告图标（LOGIC_BUG high）
- 应改为 == '1' 显式比较，与仓库其他标志位一致

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期G
- 所属项目：惠山二期G；代码基线：none
- 涉及文件：completion/detail.vue、final/index.vue、final/detail.vue
- 来源会话：f0f44bcf-e5d4-4079-aec7-a44a6efb9381、7fd96eae-ff4a-4cde-8f71-536de88bfa82

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "settle_warn_frontend",
  "source_extraction_id": "6508cb16c06649c5a7ea27869898d265",
  "version": 1,
  "memory_type": "entities"
}
-->