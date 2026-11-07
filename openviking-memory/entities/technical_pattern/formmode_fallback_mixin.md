# 组件formMode兜底逻辑须对齐全局mixin
苏州市房地产监测V3 中 OperationBtnGroup/index.vue 的 formMode 逻辑缺失 getId 兜底，未对齐 main.js 全局 mixin。

## 问题根因
- OperationBtnGroup/index.vue 的 formMode 逻辑缺失 getId 兜底
- 未对齐 main.js 全局 mixin 的 formMode 解析逻辑

## 修复方案
- 引入 getId 并实现完整兜底
- 读取 query.formMode、判断 /add 路径、有 ID 时默认 view

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/099.md
- 涉及文件：路由信息.json、store/modules/permission.js、前端技术信息.md、.workbuddy/memory/MEMORY.md、utils/ruoyi.js、main.js、components/OperationBtnGroup/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：2d76dc77-4d43-4e28-9eff-4af234266cb7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "formmode_fallback_mixin",
  "source_extraction_id": "66c8ef19744b4793b444164467b0f98d",
  "version": 1,
  "memory_type": "entities"
}
-->