# 未找到截图样式的发票页面；feeBills 是最接近的
仓库 产品2.0 没有与截图（包含成本/费率项目列和收款折扣选项卡）相对应的页面；最接近的模块是 feeBills。

## 问题
- 仓库 产品2.0 中没有页面与截图匹配（成本/费率项目列和收款折扣选项卡）。

## 定位
- 最接近的模块：物业费发票 (feeBills)。
- 主列表页面: property/bill/components/index.vue。
- 入口包括 property/bill/service/index.vue (type=1), property/feeDeclare2/index.vue, property/shareFee/index.vue。

## 文件和来源
- 涉及文件: property/bill/components/index.vue; property/bill/service/index.vue; property/feeDeclare2/index.vue; property/shareFee/index.vue; mixins/listMixins.js; mixins/table.js; property/declare/components/feeBindScopeTable.vue; property/bill/components/feeBindScopeTable.vue。
- 验证证据: cursor 会话 e57753a2-9e6d-4464-a761-3a7905b9034a。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bill_page_locator",
  "source_extraction_id": "9e5325997abb4bf8bfb4d64dabe6b2a1",
  "version": 1,
  "memory_type": "entities"
}
-->