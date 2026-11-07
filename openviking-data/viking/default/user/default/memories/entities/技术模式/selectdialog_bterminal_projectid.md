# 同一接口 SelectDialog 同步补 B 端 projectId 隔离
园区物管2.0 同一接口被多处 SelectDialog 消费时，须同步补齐 B 端 projectId 隔离条件防止数据越权。

## 问题根因
- 需给 B 端用户的公共收益监管账户选择弹窗加项目隔离（查询条件追加 projectId）。
- 同一接口 /benefit/pubRegulatoryAccount/page 被多处 SelectDialog 消费，只改一处会出现 B 端部分弹窗能看到全部项目数据的数据越权。
- B 端当前项目存在全局 store，G 端 projectId 来自表单自身。

## 解决方案
- 以接口为线索全局检索所有 SelectDialog 调用点（本次 5 处）逐处补齐，不能只改提出问题的页面。
- B 端判定用 isBTerminal/terminalType，projectId 一律取 this.$store.getters.currentProjectId（当前所选项目），G 端保持原 form.projectId 不动。
- 两个端别条件并存时注意 B 端取全局上下文、G 端取表单值的分流写法。

## 验证与归属
- 验证：pubRegulatoryAgreement 会话最终结论表格列出 5 处 SelectDialog（含 pubBankReceiptApply 的 B/G 分流），统一逻辑为 B 端用 $store.getters.currentProjectId、G 端不变。
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRegulatoryAgreement/detail.vue、pubRegulatoryStopAgreement/detail.vue、pubManualBookkeeping/detail.vue、pubBankReceiptApply/detail.vue；所属项目：园区物管2.0；来源会话：3f0ee1c5-4542-423d-b899-f75e4c942d75；代码基线：177bc3ce4。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "selectdialog_bterminal_projectid",
  "source_extraction_id": "5ed8cff3af8a4f5db9f4d3e49a2b2037",
  "version": 1,
  "memory_type": "entities"
}
-->