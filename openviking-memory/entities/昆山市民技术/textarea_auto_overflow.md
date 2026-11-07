# auto-height 致文本域撑出边框溢出
昆山市民审批弹框中 textarea 使用 auto-height 自动增高导致文字溢出固定高度容器边框，需改为固定高度内部滚动。

## 问题根因
- `textarea` 使用 `auto-height` 自动增高，撑出 `.textarea-box` 固定高度（176rpx）导致文字溢出边框。

## 解决方案
- 移除 `auto-height`，容器增设 `overflow: hidden` 与 `box-sizing: border-box`。
- `textarea` 固定高度 `136rpx` 实现内部滚动。

## 验证与归属
- 所属项目：昆山市民
- 验证证据：extracted source=cursor project=昆山市民
- 涉及文件：d:/repository/昆山市民/src/pages_examine/components/approveDialog.vue
- 来源会话ID：4185ad11-fbc7-4260-b251-a68babfff42a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "textarea_auto_overflow",
  "source_extraction_id": "9f5ed67ac35144b098b3ed9d8f44d21c",
  "version": 1,
  "memory_type": "entities"
}
-->