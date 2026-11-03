# 详情页formMode缺兜底致查看模式未隐藏保存
苏州市房地产监测V3 的 zhi2-web-admin 中 OperationBtnGroup 的 formMode 计算属性缺乏兜底，未正确识别有 ID 的 view 模式，导致查看模式仍显示保存按钮。

## 问题根因
- OperationBtnGroup/index.vue 中 formMode 计算属性缺乏兜底
- 未正确识别有 ID 的 view 模式，保存按钮未隐藏

## 修复方案
- 引入 getId 与 main.js 全局 mixin 对齐
- 按 query.formMode、/add 路径、getId() 优先级重写
- 有 ID 时返回 view 隐藏保存按钮

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/147.md
- 涉及文件：路由信息.json、store/modules/permission.js、前端技术信息.md、.workbuddy/memory/MEMORY.md、utils/ruoyi.js、main.js、components/OperationBtnGroup/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：2d76dc77-4d43-4e28-9eff-4af234266cb7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "formmode_missing_fallback",
  "source_extraction_id": "38960cc9508a40a19b9c3ec07e6c4353",
  "version": 1,
  "memory_type": "entities"
}
-->