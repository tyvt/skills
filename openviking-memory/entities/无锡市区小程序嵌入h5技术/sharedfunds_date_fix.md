# 共有资金明细自定义日期选择优化
共有资金明细页自定义时间选 3 年前会被静默校正，替换为 uv-datetime-picker 在滚轮层限制范围。

## 问题原因
- 原 uni-app 原生 picker mode=date 设 :start=minDate，但 H5/小程序 WebView 滚轮仍显示 3 年前年份，选中后被静默校正到 2023，用户误以为故障

## 解决方案
- 替换为项目已有 uv-datetime-picker，用 minDate/maxDate（时间戳）限制：开始日期最小 3 年前、结束日期最大今天
- 提示文案「仅支持查询近3年数据」；确定时再次校验范围并 Toast
- 结束日期不晚于今天；打开选择器前自动校正越界历史数据

## 验证与归属
- 涉及文件：DetailsTab.vue、benefitRange.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：804ea010-6379-4dfd-818f-a78d3c273994

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sharedfunds_date_fix",
  "source_extraction_id": "8aea2040c35a436fbdbb96856e9b42ea",
  "version": 1,
  "memory_type": "entities"
}
-->