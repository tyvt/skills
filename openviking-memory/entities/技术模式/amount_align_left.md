# type amount 使用 align left
全局范围内，type: 'amount' 使用 align: 'right' 应改为 align: 'left'。

## 规则
- 在所有 type: 'amount' 中将 align: 'right' 替换为 align: 'left'
- 覆盖收入、财产等模块。

## 验证
- 通过 regex type: 'amount' ... align: 'right' 的二次检查返回 0 处匹配
- 验证证据: src=bugfix/001.md
- 涉及文件: localPropertyWin/detail.vue
- 会话: 9d21af84-c650-421a-bfb6-02ee07eee6e0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_align_left",
  "source_extraction_id": "abc711535aaf4dbeace7d2af079c5c75",
  "version": 1,
  "memory_type": "entities"
}
-->