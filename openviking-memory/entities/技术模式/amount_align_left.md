# type amount 使用 align left
全局范围内，type: 'amount' 使用 align: 'right' 应改为 align: 'left'。

## 规则
- 在 zhi2-web-admin/src/views 下所有 type: 'amount' 中将 align: 'right' 替换为 align: 'left'
- 覆盖收益、物业、维修、评估、公司、楼栋、自治等模块的弹窗/详情文件

## 验证
- 使用多行正则 type: 'amount' ... align: 'right' 二次全局校验，返回 0 处匹配
- 涉及文件包含 localPropertyWin/detail.vue 等已统一检查
- 验证证据: src=bugfix/001.md
- 会话: 9d21af84-c650-421a-bfb6-02ee07eee6e0
- 所属项目: bugfix

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_align_left",
  "source_extraction_id": "13c17fa23675494eb513637d319d8231",
  "version": 2,
  "memory_type": "entities"
}
-->