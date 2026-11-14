# 禅道 Bug 6559
zhi2-web-admin 受益分配通知单（pubAllotNotice）detail.vue 查看态字段缺失与金额兜底缺陷；2026-11-13 完成前端根因定位，计划待人工确认，代码尚未改动。

## 前端缺陷（2026-11-13 确认）
- 根因文件：zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue
- contentInfo 计算属性（L705–737）displayAsWithContract 分支 push 8 个字段但漏 noticeAmount（本次支取合同金额）；编辑态模板（L75–79）有该字段，致保存后切查看态整行消失
- 次要：haveWithdrawAmount/remainWithdrawAmount 仅在 openExpenditureContractDialog（L1106–1107）赋值，getDetail()（L888–905）用 response.data 整体覆盖表单无兜底，致两金额显示 '-'
- 苏住房 develop/v2.6.2-suzhufang 同名文件存在完全相同两处缺失（task 2393 移植来源）

## 数据库发现
- 惠山门户 Dameng 表 ZHISHU_PREFUND.T_JG_ALLOT_NOTICE 无 CONTRACT_FLAG/HAVE_WITHDRAW_AMOUNT/REMAIN_WITHDRAW_AMOUNT/REMAIN_EXCLUDE_SELF/EXPENDITURE_CONTRACT_CODE
- 苏住房测试表 ZHISHU_BENEFIT.PUB_ALLOT_NOTICE 有 CONTRACT_FLAG/HAVE_WITHDRAW_AMOUNT
- 推断：惠山后端可能未实现 task 2393 服务端部分，补 noticeAmount 后能否显示 500 取决于后端返回

## 计划与状态
- 计划：.plan/bug6559.md，2026-11-13 通过高级模型审核（PASS，72 分，0 个 P0），按 3 条 P1 意见修正
- 临时脚本：.tmp-bug6559/（未提交，收尾需清理）
- 代码尚未改动任何一行；下一步二选一：(a) 确认计划后落地两仓前端修复 + eslint 验证 + 回写禅道标注后端待确认；(b) 先解决惠山 dev 后端 1300 再补接口实测

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6559",
  "source_extraction_id": "deacda6b2c4a4afbbcbafe7be3231424",
  "version": 1,
  "memory_type": "entities"
}
-->