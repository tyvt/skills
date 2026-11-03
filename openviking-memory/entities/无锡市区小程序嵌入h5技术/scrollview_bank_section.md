# 共有资金查询明细展开下方区域scroll-view滚动修复
总览页点查询明细后银行流水与账户余额在下方展开，但外层scroll-view不滚动，用户误以为页面没变化，需用scroll-into-view带动画滚到bank-section。

## 问题根因
- 总览页点「查询明细」后银行流水与账户余额在下方展开，但外层scroll-view不滚动，用户仍停在原位置

## 解决方案
- 子组件为展开区设固定id（如bank-section），查询完成并渲染后$emit('scroll-to-bank')
- 父页scroll-view开启scroll-into-view与scroll-with-animation，收到事件后将目标设为该id
- 重复点击时需先清空scrollIntoView再赋值，否则同一id无法再次触发滚动

## 验证与归属
- 验证会话：fd9f5f4e-e4c8-42f5-a93d-27c3c6883bde（基线6aeee0b），用户要求自动滑到底显示账户余额
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/pages_benefit/sharedFunds/components/OverviewTab.vue、src/pages_benefit/sharedFunds/index.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "scrollview_bank_section",
  "source_extraction_id": "bbb7f3378b7b486988e7b7bf5524a595",
  "version": 1,
  "memory_type": "entities"
}
-->