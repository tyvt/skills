# 监管银行下拉框高度调整
苏州市房地产监测V3 监管银行(管辖行)下拉框高度调整为 38px 的样式修复。

## 修复要点
- 在 `superviseBank/detail.vue` 的 `.supervise-bank-select` 下用 `:deep` 将 `.el-input` 与 `.el-input__inner` 高度设为 38px
- 设置 `line-height: 38px`，仅影响左侧「监管银行(管辖行)」下拉，未改全局样式
- 若下拉箭头略偏，可加 `:deep(.el-input__suffix) { display: flex; align-items: center; }`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 需在本地刷新银行名单详情页用 DevTools 确认 `.el-input__inner` 为 38px
- 涉及文件：`superviseBank/detail.vue`、`element-ui.scss`、`index.scss`
- 项目：苏州市房地产监测V3；来源会话ID：0bafd576-0208-4918-be87-43b71abea60c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervise_bank_select_height_fix",
  "source_extraction_id": "b4544ae815e34326a45b94c399c09bc2",
  "version": 1,
  "memory_type": "entities"
}
-->