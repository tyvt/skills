# DetailsTab日期选择器WebView越界修复
DetailsTab.vue 原用原生 picker mode=date，H5/WebView 中 :start 限制失效致滚轮显 3 年前年份并静默校正。

## 问题根因
- 原生 picker 的 :start 限制在 H5/WebView 环境失效
- 用户可滚动到 3 年前年份，组件静默校正造成体验异常

## 解决方案
- 改用 uv-datetime-picker，以 minDate/maxDate 时间戳限制可选范围
- 补充提示文案与校验逻辑

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：804ea010-6379-4dfd-818f-a78d3c273994；代码基线：none
- 涉及文件：src/pages_benefit/sharedFunds/components/DetailsTab.vue、src/pages_benefit/fundPublicity/components/benefitRange.vue、src/components/ZsDatePicker/ZsDatePicker.vue、src/components/ZsDateRangePicker/ZsDateRangePicker.vue、package.json、src/pages_owner/committee/application/index.vue、src/pages_benefit/budget/index.vue、src/pages_property/rcService/daily.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "details_tab_datepicker",
  "source_extraction_id": "dc39a6e5b671492c87b68671b8c83d92",
  "version": 1,
  "memory_type": "entities"
}
-->