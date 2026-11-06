# 空物业管理区域不弹窗修复
园区公共收益项目修复 `zhi2-web-admin/src/layout/index.vue` 登录后无物业管理区域时弹出无法关闭选择弹窗的问题。

## 问题原因
- 登录后 `operableProjectList` 返回空数组时，`syncProjectDialogVisibility` 仍弹出无法关闭的项目选择弹窗

## 修复内容
- `syncProjectDialogVisibility`：列表为空时不弹窗（`if (!projectList || projectList.length === 0) { this.projectDialogVisible = false; return }`）
- `openProjectDialog`：手动切换且无可选区域时显示 warning 提示「暂无可用物业管理区域，请联系主管部门授权物业管理区域」且不打开弹窗

## 验证与归属
- 所属项目：园区公共收益；来源会话：7c3abcbc-5c9f-492d-b81b-9b709f37b81c；代码基线：none
- 涉及文件：`zhi2-web-admin/src/layout/index.vue`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "empty_area_no_dialog",
  "source_extraction_id": "f06685698d72453c94065c8385271862",
  "version": 1,
  "memory_type": "entities"
}
-->