# [苏房] 删除子表行后本次核销金额不归零
公共收益-回单核销等详情页删除子表行后，表头汇总「本次核销金额」未随子表刷新而归零，列表与表头不一致。

## 问题现象
- 公共收益-回单核销 / 物业收入类账单详情页，删除单据后子表列表刷新，但基本信息「本次核销金额」仍是旧值
- 主线、无锡三资同样存在该问题，造成列表与表头汇总数据不一致

## 根因
- 详情页 detail.vue 写了 @refresh="getDetail" 期望子表操作后重拉详情
- 删除走 table.js 混入的公共 handleDelete，成功后只调子表 getList()，未 $emit('refresh') 也未调父页刷新
- 父页详情接口未被重请求，汇总字段不变
- 与 #548（OperationBtnGroup emit refresh）不同：本条是「子表行删除」独立链路，根因是通用 handleDelete 与父页 refresh 约定缺挂钩

## 解决方案
- 子表组件补 deleteSuccessCallback(){ this.$emit('refresh') }，table.js 的 handleDelete 会调用此可选钩子
- 父页 detail.vue 的 @refresh="getDetail" 不变
- 物业模块 billDetailSubTable 在 getList()+clearSelection()+msgSuccess 后手动补 this.$emit('refresh')
- 改动 cherry-pick 到多分支时逐分支确认子表是否都补了钩子

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证会话 5bdbdabe（064.md 会话 5bdbdabe）：删除单据后基本信息「本次核销金额」不归零，根因 handleDelete 只调 getList 未触发 refresh
- 修复为 VerificationReceiptDetailTable.vue 增加 deleteSuccessCallback 发 refresh，billDetailSubTable.vue 补 $emit('refresh')
- 已 cherry-pick 到 develop/v2.6.1 (a7ed8c1db)、develop/v2.6.2 (bcf3d9fba)、develop/v2.6.2-suzhufang (ed0acf3c0+dcf7a6c80)、develop/v2.6.2-yulin (7b57d355d 等)
- 涉及文件：benefit/pubVerificationReceipts/detail.vue、VerificationReceiptDetailTable.vue、property/propertyVerificationReceipts/components/billDetailSubTable.vue、mixins/table.js
- 所属项目：苏住房G；代码基线：fb3e960；来源会话ID：5bdbdabe-84ea-4974-b2f7-6db72c21377d

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "subtable_delete_refresh",
  "source_extraction_id": "9e279c11c0ff4cb281cd315baecbe44b",
  "version": 2,
  "memory_type": "entities"
}
-->