# 空物业管理区域列表不弹窗改提示
operableProjectList 返回空数组时原强制弹无法关闭选择弹窗，改为置否且不打开并给 warning 提示。

## 问题描述
- operableProjectList 返回空数组时原逻辑强制弹出无法关闭的选择弹窗

## 解决方案
- layout/index.vue 的 syncProjectDialogVisibility 于列表空时置 projectDialogVisible = false
- openProjectDialog 于 bProjectData 空时调用 $message.warning 且不打开弹窗

## 涉及文件
- zhi2-web-admin/src/layout/index.vue
- zhi2-web-admin/src/views/home/bProjectDialog.vue

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证证据：园区公共收益/035.md
- 来源会话：7c3abcbc-5c9f-492d-b81b-9b709f37b81c；代码基线：none
- 所属项目：园区公共收益

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "empty_project_dialog",
  "source_extraction_id": "6c92fed8893d4123a7051e661689f0c0",
  "version": 1,
  "memory_type": "entities"
}
-->