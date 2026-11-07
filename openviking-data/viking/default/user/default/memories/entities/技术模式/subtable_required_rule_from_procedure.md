# 子表弹窗必填规则取自程序步骤配置
dataProperty 巡保记录（recordProcess）步骤子表弹窗中，「说明/照片」是否必填由所挂巡保程序（procedureId）的步骤配置决定，而非本单数据。

## 问题背景
- 同一程序不同版本下步骤要求不同，写死必填会与程序配置漂移
- 配置异步拉取，若只在弹窗打开时拉一次，详情接口晚返回时规则会对不上

## 解决方案
- 详情页透传 :procedure-id="form.procedureId"，子表组件再透传给弹窗
- 弹窗在 view/edit 态调 GET /dataProperty/procedureProcess/page（procedureId + pageNum:1 + pageSize:500），按 processSerial 匹配取 isExplain/isPicture（'1' 为必填）驱动 dynamicRules
- 无 procedureId、无步骤编号、请求失败或未匹配到行时，回退用 detailForm 上的 isExplain/isPicture 兜底
- 重写 detailCallback：合并详情数据后再拉一次配置同步规则，保证详情异步返回后校验仍对齐；弹窗打开先拉配置再 init()

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 4d8f8198 结论 detail.vue 传 :procedure-id，recordProcessStepDialog 新增 procedureId prop、view/edit 调 procedureProcess/page 按 processSerial 匹配取 isExplain/isPicture，detailCallback 重写为详情返回后再拉一次配置，失败兜底 detailForm
- 涉及文件：zhi2-web-admin/src/views/dataProperty/recordProcess/components/recordProcessStepDialog.vue、recordProcessStepTable.vue、zhi2-web-admin/src/mixins/subTableMixins.js
- 所属项目：产品2.0；来源会话：4d8f8198-d7b1-458f-891e-5a0c95b1090a；代码基线：76646e6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "subtable_required_rule_from_procedure",
  "source_extraction_id": "5bc1c57573344e21b65d5779775495df",
  "version": 1,
  "memory_type": "entities"
}
-->