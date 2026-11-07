# bond/detail.vue SelectDialog 标签修复
苏州市房地产监测V3 项目修复 bond/detail.vue 中拆散的 SelectDialog 标签问题。

## 问题说明
- 原 SelectDialog 被分成两段：ProjectDialog 后只有 </SelectDialog>，文件底部只有开始标签
- InformationPush/detail.vue 存在相同问题待修复

## 修复改动
- 合并为完整组件块，放在 ProjectDialog 与 outletsTable 之间
- 移除错误拆分，保证 Vue SFC 标签闭合

## 验证结果
- ESLint 通过
- Vue SFC 解析通过（不再出现未闭合标签错误）
- 保存后 Vite 热更新恢复正常
- 新增/编辑点击「监管项目名称」弹出选择对话框，点击列表项目名称触发 handView 回填并关闭弹窗

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3
- 来源会话ID：c236f45d-1867-422f-aa31-f4acbb751ce8
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bond_detail_selectdialog_fix",
  "source_extraction_id": "d2241605997b4738a763da461ea5ccb9",
  "version": 1,
  "memory_type": "entities"
}
-->