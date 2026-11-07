
# 监管银行下拉框经:deep设高38px
苏州市房地产监测V3 的 superviseBank/detail.vue 通过 `:deep` 将监管银行下拉框输入框高度设为 38px，仅影响局部未改全局样式。

## 改动内容
- `.supervise-bank-select` 下通过 `:deep` 将 `.el-input` 与 `.el-input__inner` 的 height 及 line-height 设为 38px
- 仅影响「监管银行(管辖行)」下拉，未改全局样式
- 若箭头偏移可追加 `:deep(.el-input__suffix)` 的 flex 居中样式

## 涉及文件
- `zhi2-web-admin/src/views/supervision/bank/superviseBank/detail.vue`
- `zhi2-web-admin/src/styles/element-ui.scss`
- `zhi2-web-admin/src/styles/index.scss`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/255.md
- 来源会话ID：0bafd576-0208-4918-be87-43b71abea60c
- 所属项目：苏州市房地产监测V3；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervise_bank_height",
  "source_extraction_id": "aed79d0c8ddc4144a39077955e6f65cf",
  "version": 1,
  "memory_type": "entities"
}
-->