# 银行网点弹窗列链接化修复
苏州市房地产监测V3 中修复 BranchOneDialog 与 YhwdDialog 弹窗无法选择网点的问题，将列改为可点击链接。

## 问题原因
- BranchOneDialog.vue 默认「网点名称」列使用 `:index="handlePick"` 导致无法触发选择
- YhwdDialog.vue 「联行名称」「联行号」列同样不可点击，可选区域小

## 修复内容
- BranchOneDialog.vue 列改为 `type="link" :function="handlePick"`
- YhwdDialog.vue 「联行名称」「联行号」列改为 `type="link" :function="setBank"`
- BranchOneDialog `onOpen()` 先设 `defalutStr` 再调 `getList()`，避免首次缺银行编码

## 使用说明
- 刷新后进入 详情-承办银行→网点列表→新增/编辑，打开弹窗点蓝色链接「联行号」或「联行名称」选中回填
- 序号列蓝色但不可点击，勿点

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：BranchOneDialog.vue、YhwdDialog.vue
- 来源会话ID：a2fde687-3089-488b-83f1-704448411d98

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "branch_dialog_link_fix",
  "source_extraction_id": "76d1d541f8e54cc298fc91be29bc6250",
  "version": 1,
  "memory_type": "entities"
}
-->