# 共有资金查询明细自动滚动修复
无锡市区小程序嵌入H5修复共有资金点查询明细后页面不自动滚动到底部账户余额区域的问题。

## 根因
- 点击查询明细后银行流水区域（含账户余额）在页面下方展开，但外层scroll-view未自动滚动，用户停留原位置看似无变化

## 修复方案
- OverviewTab.vue为银行流水区域增加id="bank-section"，查询完成渲染后通过scroll-to-bank事件通知父页面滚动
- index.vue在scroll-view启用scroll-into-view和scroll-with-animation，收到事件后滚动目标设为bank-section带动画滚到账户余额
- 再次点击查询明细先清空再设置scrollIntoView，保证重复触发有效

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：fd9f5f4e-e4c8-42f5-a93d-27c3c6883bde；代码基线：none
- 涉及文件：src/pages_benefit/sharedFunds/components/OverviewTab.vue、src/pages_benefit/sharedFunds/index.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "shared_funds_scroll_fix",
  "source_extraction_id": "cf58481ce1b44a29b214f040fd405c89",
  "version": 1,
  "memory_type": "entities"
}
-->