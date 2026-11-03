# SelectDialog 拆散致 Vite 解析失败
苏州市房地产监测V3 的 bond/detail.vue 中 SelectDialog 标签被拆散分离导致 Vue SFC 解析失败及 Vite 热更新报错。

## 问题根因
- bond/detail.vue 中 SelectDialog 标签被拆散分离
- 导致 Vue SFC 解析失败及 Vite 热更新报错

## 解决方案
- 将 SelectDialog 合并为完整组件块置于 ProjectDialog 与 outletsTable 之间以通过解析
- InformationPush/detail.vue 存在相同未闭合标签问题待处理

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-leftover/028.md
- 涉及文件：views/supervision/unblock/bond/detail.vue、views/components/SelectDialog.vue、views/supervision/unblock/InformationPush/detail.vue、views/supervision/unblock/usemoneyRevoke/detail.vue、views/supervision/deposit/notice/detail.vue、views/supervision/unblock/noticeChange/detail.vue、package.json
- 所属项目：苏州市房地产监测V3；来源会话：c236f45d-1867-422f-aa31-f4acbb751ce8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "selectdialog_split_vite",
  "source_extraction_id": "c16e59fc81ec457286441b3da25ad8e7",
  "version": 1,
  "memory_type": "entities"
}
-->