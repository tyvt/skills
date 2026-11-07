# leaseContract详情缺撤销终止续期功能
`leaseContract/detail.vue` 未实现合同撤销、终止与续期操作，需参照 `contract/detail.vue` 补充。

## 问题根因
- `leaseContract/detail.vue` 未实现合同撤销、终止与续期操作

## 修复方案
- 参照 `contract/detail.vue` 在 `operation-btn-group` 的「直接签约」后增按钮
- 按钮显示条件 `form.bizState == '2'`
- 绑定 `handleRevoke`/`handleTerminate`/`handleRenew`
- 补充 `renewDialogVisible`、`renewEndDate` 及 `confirmRenew` 续期逻辑

## 关联信息
- 验证证据：src=G/002.md
- 涉及文件：leaseContract/detail.vue ; contract/detail.vue
- 来源会话：7960c55c-7c3d-42e6-bf96-34c332d19e0a
- 代码基线：none

## 验证与归属
- 所属项目：G
- 验证证据：extracted source=cursor project=G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "leaseContract详情缺撤销续期",
  "source_extraction_id": "75f0358612c2410aac698945b39d18cb",
  "version": 1,
  "memory_type": "entities"
}
-->
