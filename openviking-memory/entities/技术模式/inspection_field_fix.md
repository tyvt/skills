
# 巡检详情巡检人与电话展示修复
泰兴小程序设施巡检记录详情页修复巡检人、联系电话在巡检结果下方不展示及页面异常拉长问题。

## 问题原因
- 字段顺序：详情页「巡检人」「联系电话」排在「巡检结果」上方，滚动后易以为下面没有这两项。
- 页面异常拉长：步骤数据为空时错误调用 getRecordPage（查记录列表非步骤），最多渲染 50 条。
- 字段可能为空：app 详情接口有时不带 inspectPerson/inspectPhone，页面显示空白。

## 修复内容
- detail.vue：调整顺序为程序→频次→日期→巡检结果→巡检人→联系电话；去掉错误 getRecordPage 回退；缺字段回退 getRecordDetail 补全；空值显示 `-`。
- add.vue：限制「巡检结果」输入框最高 320rpx，避免顶出下方巡检人、联系电话。

## 验证与归属
- 验证：extracted source=cursor session=b9405f2a-0ee5-4810-86af-5e99506d88f3
- 涉及文件：d:/repository/泰兴小程序/src/staff/pages_facility/record/detail.vue、add.vue、src/pages_facility/record-detail.vue、src/staff/api/maintenance.ts、src/staff/api/maintenance.js
- 所属项目：泰兴小程序；来源会话：b9405f2a-0ee5-4810-86af-5e99506d88f3；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_field_fix",
  "source_extraction_id": "930aeb202b4947b390d651ba7a9adf06",
  "version": 1,
  "memory_type": "entities"
}
-->