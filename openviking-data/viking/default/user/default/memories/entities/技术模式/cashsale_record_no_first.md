# 现售备案详情基本信息首位展示修复
苏州市房地产监测V3 调整了现售备案详情基本信息与顶栏，使「现售备案编号」作为基本信息第一项展示。

## 修复要点
- `CashsaleInfoPanel.vue` 在 `infoView` 中 `unshift`「现售备案编号」（`form.recordNo || '-'`）作为基本信息第一项；预售转现售用 `splice(1, 0, …)` 把「预售许可证号」放第二项
- `CashsaleDetail.vue` 从 `headTitleList` 去掉条件展示的「现售备案编号」，顶栏只保留申请编号、业务状态、创建时间
- E2E `cashsale-apply-helpers.js` 新增 `assertCashsaleBasicInfoRecordNoFirst`（首项标签 + 顶栏不重复）

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：苏州市房地产监测V3
- 涉及文件：`CashsaleInfoPanel.vue`、`CashsaleDetail.vue`、`cashsale-apply-helpers.js`、`cashsale-apply-real-api-flow.spec.js`
- 来源会话：88abd213-0e65-43a2-9a47-f93417d5524d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_record_no_first",
  "source_extraction_id": "1b78f2ac900543eeacc8a52008582c1e",
  "version": 1,
  "memory_type": "entities"
}
-->