# Summary
On 2026-11-13, during a login investigation using the zsbase test account, the frontend defect in zhi2-web-admin detail.vue (benefit/pubAllotNotice) was confirmed: the contentInfo computed property (L705-737) in the displayAsWithContract branch pushes 8 fields but misses noticeAmount, and getDetail() (L888-905) overwrites the form without fallback for haveWithdrawAmount/remainWithdrawAmount, causing rows to disappear and amounts to show '-'. The same two defects exist in 苏住房 develop/v2.6.2-suzhufang (task 2393 porting source). No code changes made yet.
# 2026-11-13 (Friday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: zsbase
ZS001Aa!
...
**assistant [peer=gitlab.zhi.com-zhi-wuxi-huishan-product-fe-zhi2-web-admin-h5-g-unlimited]**: ...## 结论

### 前端缺陷已确认（核心交付）

**根因**：[detail.vue](zhi2-web-admin/src/views/benefit/pubAllotNotice/detail.vue) 查看态的 `contentInfo` 计算属性（L705–737）在 `displayAsWithContract` 分支中 push 了 8 个字段，但**漏了 `noticeAmount`（本次支取合同金额）**。编辑态模板（L75–79）有这个字段，因此保存后从编辑态切到查看态时，该行整行消失。

**次要问题**：`haveWithdrawAmount` / `remainWithdrawAmount` 只在 `openExpenditureContractDialog` 选合同时赋值（L1106–1107），而 `getDetail()`（L888–905）用 `response.data` 整体覆盖表单，没有兜底，导致两个金额显示为 `-`。

**苏住房** `develop/v2.6.2-suzhufang` 同名文件存在完全相同的两处缺失（task 2393 移植来源）。...

<!-- MEMORY_FIELDS
{
  "event_name": "allot_notice_defect",
  "goal": "Record frontend defect",
  "summary": "On 2026-11-13, during a login investigation using the zsbase test account, the frontend defect in zhi2-web-admin detail.vue (benefit/pubAllotNotice) was confirmed: the contentInfo computed property (L705-737) in the displayAsWithContract branch pushes 8 fields but misses noticeAmount, and getDetail() (L888-905) overwrites the form without fallback for haveWithdrawAmount/remainWithdrawAmount, causing rows to disappear and amounts to show '-'. The same two defects exist in 苏住房 develop/v2.6.2-suzhufang (task 2393 porting source). No code changes made yet.",
  "ranges": "0,158-161",
  "source_extraction_id": "deacda6b2c4a4afbbcbafe7be3231424",
  "version": 1,
  "memory_type": "events"
}
-->