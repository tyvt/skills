# 字典find无匹配dictLabel需可选链
计算属性中对字典选项数组 find 后直接取 .dictLabel，匹配不到返回 undefined 会抛 Cannot read properties of undefined。
## 根因
- bizStateOptions 等数组 find 后直接 .dictLabel，未匹配时 find 返回 undefined 触发 TypeError。
- 比较 dictValue 与表单字段时字符串/数字类型不一致会导致 === 匹配失败。
## 修复
- 先 const row = list.find(...) 再 return row?.dictLabel 使用可选链兜底。
- 类型不一致时可用 == 或统一类型后再 === 比较。
- 字典缺项时界面可能空白，需补字典或接口数据。
## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/maintenance/depositNotice/company/components/detail.vue。
- 验证证据：会话 4642db27 中 detail.vue 的 bizStateName、stateName 报错。
- 所属项目：2-0；来源会话：4642db27-d773-418d-b3f6-c2109f85a0e4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dict_optional_chain",
  "source_extraction_id": "db699db3e683428f80cc7d381629b63a",
  "version": 1,
  "memory_type": "entities"
}
-->