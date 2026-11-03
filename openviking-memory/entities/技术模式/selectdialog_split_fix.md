# SelectDialog拆散致Vue SFC解析失败
苏州市房地产监测V3 中 bond/detail.vue 的 SelectDialog 标签被拆散，导致 Vue SFC 未闭合标签解析错误及 Vite 热更新中断，合并修复。

## 问题根因
- `bond/detail.vue` 中 SelectDialog 开始与结束标签被拆散，造成 Vue SFC 未闭合标签解析错误
- 该错误导致 Vite 热更新中断
- `InformationPush/detail.vue` 存在同类问题

## 解决方案
- 将 SelectDialog 合并为完整组件块，置于 ProjectDialog 与 outletsTable 之间

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/229.md
- 涉及文件：supervision/unblock/bond/detail.vue、views/components/SelectDialog.vue、supervision/unblock/InformationPush/detail.vue、supervision/unblock/usemoneyRevoke/detail.vue、supervision/deposit/notice/detail.vue、supervision/unblock/noticeChange/detail.vue、package.json
- 来源会话：c236f45d-1867-422f-aa31-f4acbb751ce8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "selectdialog_split_fix",
  "source_extraction_id": "4fe7174ff6a848f997b961c458a1194b",
  "version": 1,
  "memory_type": "entities"
}
-->