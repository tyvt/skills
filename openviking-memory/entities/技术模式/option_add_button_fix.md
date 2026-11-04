# 选项表决新增页底部多余按钮修复
太仓G端选项表决详情页在新增模式下底部多出业务操作按钮，根因是 v-hasPermi 覆盖 v-show 隐藏效果，已改用 v-if 修复。

## 问题根因
- `optionDecision/detail.vue` 中 7 个业务操作按钮同时使用了 `v-show` 和 `v-hasPermi`
- `v-hasPermi` 在权限校验通过时执行 `el.style.display = ''`，覆盖了 `v-show` 设置的 `display: none`
- 新增模式（`formMode == 'add'`）下这些按钮仍被显示

## 修复方案
- 将 7 个业务操作按钮的 `v-show` 改为 `v-if`，条件为 false 时元素不渲染
- 新增页面底部仅保留「保存」按钮
- 「表决状态更新」「撤销」「延期」等按钮仅在已提交（`bizState == '2'`）的查看模式显示

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 涉及文件：optionDecision/detail.vue、src/components/OperationContainer/index.vue、src/mixins/detailMixins.js
- 所属项目：太仓G；来源会话：d78da6c5-2f67-48d6-9fd2-d7742debc541

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_add_button_fix",
  "source_extraction_id": "d961989966bf414fa4cdf5a06897d486",
  "version": 1,
  "memory_type": "entities"
}
-->