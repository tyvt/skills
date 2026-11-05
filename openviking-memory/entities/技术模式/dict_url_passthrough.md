# 字典类型未生效修复
淮安物管 `zs-table-column` 与 `zs-select-dialog-func` 组件因未传递 `dictUrl` 导致字典类型请求错误，已修复。

## 问题根因
- `zs-table-column` 在 `created` 里根据 `dictUrl` 调 `getDicts` 加载字典；若无 `dictUrl` 则退化成 `underline(prop)`。
- 对 `prop: 'job'` 会请求字典类型 `job` 而非正确的 `mf_worker_job`。
- 函数式选择弹窗 `zs-select-dialog-func.vue` 原先只绑了 `type、label、prop、formatter、align、headerAlign`，未将 `dictUrl` 传给子组件。

## 修复方案
- 在 `zs-select-dialog-func.vue` 中把 `dictUrl` 传递给子组件，使 `detail.vue` 中配置的 `dictUrl: 'mf_worker_job'` 生效。
- 涉及文件：`src/components/zs-table-column/zs-table-column.vue`、`src/components/zs-select-dialog/zs-select-dialog-func.vue`、`detail.vue`。

## 验证与归属
- 验证证据：extracted source=cursor project=淮安物管；来源会话：4487481b-f10d-43d1-9a48-5bdf07280a3d
- 所属项目：淮安物管；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_url_passthrough",
  "source_extraction_id": "766cfeab02434f30a55a13c9314916f3",
  "version": 1,
  "memory_type": "entities"
}
-->