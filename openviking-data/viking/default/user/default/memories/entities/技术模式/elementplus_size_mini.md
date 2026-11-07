# Element Plus size 不支持 mini 致全局告警
Element Plus `size` 仅接受空/default/small/large，项目全局及 `el-select` 使用 Vue2 的 `"mini"` 触发 Invalid prop 告警。
## 问题根因
- Element Plus 的 size prop 合法值为空/default/small/large，不支持 Vue2 时代的 `"mini"`。
- 项目全局配置及 `el-select` 组件传入 `"mini"` 触发 Invalid prop 警告。
## 解决方案
- `src/main.js` 与 `src/views/index.vue` 中 `size` 改为 `"small"` 消除告警。
## 验证与归属
- 验证证据：extracted source=cursor session=3b324ddb-991b-4cfd-8477-ff3457de3576
- 涉及文件：src/main.js、src/views/index.vue；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "elementplus_size_mini",
  "source_extraction_id": "8acaeb731028406db10b63ee3f286186",
  "version": 1,
  "memory_type": "entities"
}
-->