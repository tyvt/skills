# 保险立项审核后页面未刷新
昆山市民小程序从消息通知再次进入保险立项详情时，审批成功后按钮与详情未刷新，再点审核报单据已被处理。

## 问题根因
- 页面复用未刷新：再次进入详情页只触发 onShow 不触发 onLoad，详情与按钮状态仍旧
- 审批成功后未更新按钮：operationBtn 的 watch 只监听 busCode/dataId，审批后两值不变不重校验
- 审批成功只返回上一页：updateBtn 仅 navigateBack，无刷新

## 修复方案
- examineDetail.vue 增加 onShow 重新拉取详情，并增 refreshKey 递增通知子组件重校验
- operationBtn.vue watch 增加 refreshKey，审批/指派成功后先 updateDetail 再 await init() 再返回

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 涉及文件：src/pages_examine/examineDetail.vue、examineList.vue、components/operationBtn.vue、api/modules/examine.js、components/approveDialog.vue、request/index.js
- 所属项目：昆山市民；来源会话ID：73a8f90b-b76b-4c0a-817c-91bc79c7d47c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "examine_no_refresh",
  "source_extraction_id": "a93b55d09bbe4c6588e6a370b98e3c85",
  "version": 1,
  "memory_type": "entities"
}
-->