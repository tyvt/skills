# 查询明细展开银行流水区外层滚动失效
OverviewTab.vue 展开银行流水区时，index.vue 外层 scroll-view 未自动滚动，导致页面看似无变化，已通过锚点滚动修复。

## 问题现象
- 查询明细展开银行流水区后，外层容器未滚动至新增区域
- 用户感知页面无变化，实际内容已渲染

## 根因
- index.vue 外层 scroll-view 未绑定 scroll-into-view 目标
- OverviewTab.vue 展开时未通知父组件滚动

## 修复方案
- OverviewTab.vue 增加 id="bank-section" 并发 scroll-to-bank 事件
- index.vue 启用 scroll-into-view 及 scroll-with-animation 滚动至该区
- 先清空再设目标值，确保重复展开可再次触发滚动

## 验证与归属
- 验证证据：无锡市区小程序嵌入H5/015.md
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/sharedFunds/components/OverviewTab.vue、src/pages_benefit/sharedFunds/index.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：fd9f5f4e-e4c8-42f5-a93d-27c3c6883bde；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "overviewtab_bank_scroll",
  "source_extraction_id": "eff8d90abd104a4a8d65d75af3d6c80f",
  "version": 1,
  "memory_type": "entities"
}
-->