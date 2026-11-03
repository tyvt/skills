# 编辑态选择弹窗回写不得覆盖详情接口分类字段
园区物管2.0 核销回单编辑态下，选择弹窗回写时不得覆盖详情接口已落库的 relBusinessType 字段。

## 问题背景
- 核销回单（benefit/pubVerificationReceipts）编辑态下，用户从合同选择弹窗回写时，relBusinessType 被合同行 contractType 覆盖，与详情接口返回值不一致。
- 详情接口 GET /benefit/pubReceiptVerificationDetail/{id} 返回的 relBusinessType 是该单据已落库的权威值。

## 解决方案
- 回写逻辑按模式分流：新增态用合同行 relBusinessType 或 contractType，编辑态保留详情接口返回的 relBusinessType 不覆盖。
- 通用套路：凡详情接口已返回的业务分类字段，编辑态回写弹窗数据以 originForm（详情快照）为优先级最高。
- 提交时收入类显式带 relBusinessType（优先 form、其次 originForm 中的详情值），支出类与后端约定可不传则不传。

## 验证与归属
- 验证：detailCallback 读详情值写入 form/originForm、fillFromContract 编辑态不覆盖、buildSubmitPayload 收入类显式带 relBusinessType 支出类不传。
- 涉及文件：detail.vue、VerificationReceiptDetailDialog.vue、VerificationReceiptDetailTable.vue。
- 所属项目：园区物管2.0；来源会话 0e0a7bb5-9688-4dd7-8f3f-0e1f75dc3d94；代码基线 3965548b6。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "edit_popup_relbusinesstype",
  "source_extraction_id": "2079698ec51f42c99af5e0a35fcac0da",
  "version": 1,
  "memory_type": "entities"
}
-->