# ruoyi 同 filePath 多路由解析规则
苏住房G 已在 `@/utils/ruoyi.js` 统一处理「同一 meta.filePath 对应多条路由」的解析规则。

## 解析逻辑
- 先收集所有 `meta.filePath` 相同的路由
- 若多于一条，优先选 `path` 中不含数字（`/\d/`）的那条
- 若都不含或都含数字，仍取第一条（与原 `find` 行为一致）

## 影响范围
- `getCurrentRouterByFilePath`：首页「正常/逾期」整改通知跳转
- `getRouterPathByFilePath`、`getRouterPathByFilePathNew`：共用同一套解析
- `resolveRegisteredRoute`：待办跳转解析菜单
- 检查数据导航「正常/逾期」应落到不带数字 path 的整改通知列表；若仍跳错可发冲突菜单 path 细化规则（如排除 `:tableid`）
- 验证证据：extracted source=cursor project=苏住房G；来源会话：35ea5c25-1234-41c5-8b15-0f3de8592c07

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "ruoyi_route_resolution",
  "source_extraction_id": "6b04e6e015814a66a41bd7e1214053d1",
  "version": 1,
  "memory_type": "entities"
}
-->