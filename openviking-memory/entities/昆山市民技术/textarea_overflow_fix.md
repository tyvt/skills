# 意见说明输入框溢出边框修复
意见说明输入框内容超出时做内部滚动，原文字溢出边框问题已修复。

## 问题原因
- `textarea` 使用 `auto-height`，内容增多时自动增高并撑出 `.textarea-box` 固定高度（176rpx）

## 修改内容
- 移除 `auto-height`：输入框高度固定，超出部分内部滚动
- 容器加 `overflow: hidden` 和 `box-sizing: border-box`：防止内容溢出边框
- textarea 设固定高度 `136rpx`（176rpx 减上下各 20rpx 内边距），与容器对齐

## 验证与归属
- 所属项目：昆山市民；来源会话ID：4185ad11-fbc7-4260-b251-a68babfff42a；代码基线：none
- 涉及文件：pages_examine/components/approveDialog.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "textarea_overflow_fix",
  "source_extraction_id": "6cbdc70be8eb43dc9c57c1104ea75c4c",
  "version": 1,
  "memory_type": "entities"
}
-->