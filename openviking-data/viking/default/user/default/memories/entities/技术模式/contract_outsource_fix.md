# 物业合同基本业务外包情况无外包修复（苏住房G）
苏住房G 项目 propertyContract/components/detail.vue 修复了「基本业务外包情况」选择无外包时类型不匹配的报错。

## 问题原因
- `outsourceState` 后端为字符串类型，单选「无外包」应为 `"0"`，多选应为逗号拼接如 `"1,2"`
- 原 `handleOutsourceStateChange` 选择无外包时写成数组 `["0"]`，`getForm()` 透传导致保存报「请求参数格式错误或类型不匹配」

## 修复内容
- `handleOutsourceStateChange`：选择无外包改为字符串 `"0"`
- `formatOutsourceStateForSubmit`：提交前将数组转为逗号拼接字符串
- `parseOutsourceStateForForm`：详情/回显时将 `"1,2"` 解析为数组供多选组件使用
- `getForm`/`detailCallback`/中标备案带入统一走上述转换逻辑

## 分支提交与归属
- 已提交到 `develop/v2.6.1` 等三个分支（如 `965722f2e`）
- 涉及文件：`zhi2-web-admin/src/views/property/propertyContract/components/detail.vue`
- 所属项目：苏住房G；来源会话：f5146613-d4e2-4831-9500-d61dd5240fe0；验证证据：extracted source=cursor project=苏住房G

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_outsource_fix",
  "source_extraction_id": "74b6128c507f42e8a98d5534bd5fc33d",
  "version": 1,
  "memory_type": "entities"
}
-->