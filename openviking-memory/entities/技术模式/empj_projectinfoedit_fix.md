# Empj_ProjectInfoEdit.js对象闭合错
HousePresell-JH 项目 Empj_ProjectInfoEdit.js 中 Vue 实例配置对象 methods 后存在多余 `}` 及缩进错误，引发 JS 语法错误致 Vue 未挂载，页面显示 `{{oldProject.xxx}}` 原样文本。

## 问题根因
- Vue 实例配置对象的 methods 后存在错误 `}` 及缩进
- 引发 JS 语法错误，导致 Vue 未挂载、页面显示原始模板文本

## 修复方案
- 修正 methods、computed、components 的对象闭合结构以恢复脚本执行

## 验证与归属
- 验证证据：extracted source=cursor session=10be085b-be16-42e4-950c-50e2f442bf92
- 涉及文件：HousePresell-JH/src/main/webapp/js/admin/empj/Empj_ProjectInfoEdit.js
- 来源会话ID：10be085b-be16-42e4-950c-50e2f442bf92；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "empj_projectinfoedit_fix",
  "source_extraction_id": "70429609d7f44112b948f3d4f2290246",
  "version": 1,
  "memory_type": "entities"
}
-->