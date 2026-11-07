# 选项表决结论弹窗父组件刷新修复
园区公共收益项目修复 `MaintainResultDialog.vue` 提交成功后调用 `this.$parent.getList()` 报错的问题，改为事件通知父组件刷新。

## 问题根因
- `MaintainResultDialog.vue` 第 258 行提交成功后调用 `this.$parent.getList()`
- `$parent` 不稳定指向 `VotingItemsTable`（中间有 `Headline` 等组件），`getList` 不存在触发报错

## 修复方案
- `MaintainResultDialog.vue`：将 `this.$parent.getList()` 改为 `this.$emit('refresh')`
- `VotingItemsTable.vue`：添加 `@refresh="upDate"`，刷新表决项列表并向上通知详情页
- `detail.vue`：添加 `@refresh="getDetail"`，保持详情页数据同步

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 需重新点击「确认」提交表决结果，应能正常保存并刷新列表
- 涉及文件：`MaintainResultDialog.vue`、`VotingItemsTable.vue`、`detail.vue`
- 所属项目：园区公共收益；来源会话：efcad380-fb66-4184-a744-9ea41461ecde；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "maintainresultdialog_refresh",
  "source_extraction_id": "f06685698d72453c94065c8385271862",
  "version": 1,
  "memory_type": "entities"
}
-->