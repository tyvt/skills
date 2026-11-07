# v-hasPermi指令inserted钩子缺失缺陷
太仓G端hasPermi.js若仅在update钩子改display，首屏权限校验会失效。

## 问题根因
- hasPermi.js仅update钩子修改display，首屏不隐藏无权限元素
- 无权限隐藏后权限变更时可能无法恢复display
- 表决模块曾因与hasPerm()混用出现「有权限看不到/无权限误显示」不一致

## 修复约定
- 指令同时实现inserted与update钩子
- 有权限时显式恢复display
- 与「空div包v-hasPermi撑gap」的DOM结构问题区分，本条是指令生命周期

## 验证与归属
- 验证证据：extracted source=cursor project=太仓G
- 验证：会话6bb25673修改hasPermi.js增inserted、有权限恢复display；bundle 008讨论hasPermi改动与*:*:*放行
- 涉及文件：zhi1-web-admin/src/directives/permission/hasPermi.js、zhi1-web-admin/src/main.js
- 所属项目：太仓G；来源会话：6bb25673-a3f0-4f17-9c69-8943d17f4cb8；代码基线：e177dad

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "haspermi_inserted",
  "source_extraction_id": "e6df2aa1bd8d4f0c96d35ad0e13bd80a",
  "version": 1,
  "memory_type": "entities"
}
-->