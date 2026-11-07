# ZsDatePicker日期下限静默回滚问题
业务仅允许查询近 N 年明细时，日期组件若把早于下限的年份静默滚回边界年（如 2023），用户会误以为系统故障。

## Description
- 涉及组件：ZsDatePicker、ZsDateRangePicker（位于 zhi2-mobile-admin-h5-c-unlimited/src/components）
- 现象：自定义时间选 3 年以前会自动回到 2023，用户不知是不让选还是 bug
- 期望：超限日期置灰不可选，或明确文案说明不可选范围，而非无反馈改显示年份

## 解决方案
- 在 ZsDatePicker/ZsDateRangePicker 层使用 minDate（或等价）让超限日期置灰不可选
- 或提供清晰文案提示不可选范围，避免静默 clamp

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 所属项目：无锡市区小程序嵌入H5
- 来源会话：26ca4c09-5707-4402-a54f-9c9491ec3455
- 代码基线：a951bf3
- 涉及文件：ZsDateRangePicker.vue、ZsDatePicker.vue

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "zs_datepicker_clamp",
  "source_extraction_id": "d81982be12fb49649927c1f09cdc1a12",
  "version": 1,
  "memory_type": "entities"
}
-->