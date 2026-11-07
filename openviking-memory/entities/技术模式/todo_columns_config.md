
# 待办列表列配置接入
产品2.0 的 zhi2-web-admin 中 flowable/todo.vue 已生成并接入 columns 配置，并修复重复定义。
## 配置内容
- 在 `zhi2-web-admin/src/views/flowable/todo.vue` 生成并接入 `columns` 配置，覆盖标注的 6-10 行共 5 列
- `业务类型`：`prop: 'menuName'`、`type: 'link'`、`function: this.handleProcess`
- `主题`：`prop: 'submitTittle'`、`function: this.handleProcess`、`showOverflowTooltip: true`
- `任务名称`：`prop: 'taskName'`、`width: 140`；`发起人`：`prop: 'startUserName'`；`发起时间`：`prop: 'startTime'`、`width: 180`
## 附带修复
- 修复同文件 `data` 中重复的 `busCodeOptions` 定义（重复 key）
## 涉及文件与归属
- 文件：`todo.vue`、`ListTemplate.js`、`listMixins.js`、`table.js`
- 项目：产品2.0；来源会话：43c31fa0-2afa-4155-861c-52d80df36f42；代码基线：none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "todo_columns_config",
  "source_extraction_id": "b7792fafce8b4fca99fa4738624ecb8a",
  "version": 1,
  "memory_type": "entities"
}
-->
