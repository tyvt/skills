# 监管标准详情页查看模式保存按钮修复
苏州市房地产监测V3 修复监管标准详情页在查看模式下隐藏「保存」按钮的问题，通过完善 formMode 兜底逻辑实现。

## 修改内容
- 修改 `zhi2-web-admin/src/components/OperationBtnGroup/index.vue`
- 引入 `getId`，与 `main.js` 全局 mixin 保持一致
- 将 `formMode` 计算属性改为完整兜底逻辑：先读 `query.formMode`，再判断 `/add` 路径，有 ID 时默认 `view`，否则 `add`

## 涉及文件
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue
- main.js

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：2d76dc77-4d43-4e28-9eff-4af234266cb7
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervision_save_fix",
  "source_extraction_id": "c72fc439f52742fe91d274aac0ac08bc",
  "version": 1,
  "memory_type": "entities"
}
-->