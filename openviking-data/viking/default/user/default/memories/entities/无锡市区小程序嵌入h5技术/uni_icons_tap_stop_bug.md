# 共有资金明细日期图标@tap.stop报错修复
无锡市区小程序嵌入H5中，共有资金-明细页选日期区间时点击查询时间图标报错，已修复。

## 问题现象
- 共有资金-明细中日期区间选当季/当年/自定义日期等，点击查询时间图标报错

## 根因
- uni-icons在H5下触发的不是标准DOM事件，使用@tap.stop时Vue会调用event.stopPropagation()
- 但event为undefined，因此报错

## 修复方案
- 将查询时间图标的@tap.stop改为@tap，与同页其他提示图标（共有资金余额、账户余额）保持一致

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 需刷新后再试点击图标
- 涉及文件：src/pages_benefit/sharedFunds/components/DetailsTab.vue、src/api/sharedFunds.js
- 所属项目：无锡市区小程序嵌入H5；来源会话：26ca4c09-5707-4402-a54f-9c9491ec3455；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "uni_icons_tap_stop_bug",
  "source_extraction_id": "913058b2466f4d2ea7d6880e88c6a947",
  "version": 1,
  "memory_type": "entities"
}
-->