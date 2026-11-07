# 表格序号格式修复
苏州市房地产监测V3 项目优化 `zs-table-column` 的 `formatRowIndex`，使 `type="index"` 列自定义序号回调真正生效。

## 背景与问题
- 改之前 `zs-table-column` 固定渲染 `scope.$index + 1`，父组件传的 `:index` 回调在界面上基本不起作用
- 股东页已不再传 `:index`，不受影响；但企业、楼栋限制、机构等多数页面仍绑定 `:index`

## 修复说明
- `formatRowIndex` 改为：有回调则用回调，无回调仍每页 1、2、3…
- 对未传 `:index` 的绝大多数列表行为不变；传回调的页面跨页连续序号才真正生效

## 验证与归属
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`company/shareholder/index.vue`、`mixins/listMixins.js`、`mixins/table.js`
- 来源会话ID：e387fb5f-000b-40ca-88e6-acb880980ed7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "table_index_format",
  "source_extraction_id": "6affe7798e984e8fa21981f899b7139f",
  "version": 1,
  "memory_type": "entities"
}
-->