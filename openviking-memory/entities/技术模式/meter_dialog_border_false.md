# 仪表记录弹窗误设 border 致详情无边框
园区物管2.0 仪表记录明细弹窗详情表单因误设 :border="false" 而无边框。

## 问题根因
- complexMeterRecordDialog.vue 中给详情表单误设 :border="false"，导致仪表记录明细弹窗详情表单无边框。

## 解决方案
- 移除该 :border="false" 属性即可恢复边框。
- 分支已合并于 zhi2-web-admin 子模块 develop/v2.6.2-yulin（未推送远程）。

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/property/complexMeter/components/complexMeterRecordDialog.vue、src/components/detail-template/detail-template.vue、complexMeterRecordTable.vue
- 所属项目：园区物管2.0；来源会话：2b1c5e5a-7dde-40bf-813c-d73384eee27f；代码基线：042.md

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "meter_dialog_border_false",
  "source_extraction_id": "07a3250ce4124e9d9656ace09511a2c2",
  "version": 1,
  "memory_type": "entities"
}
-->
