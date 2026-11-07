# 公共查询动态字段元数据键匹配
公共查询条件由后端字典 complex_field 动态下发，前端字段元数据 key 必须与后端 dictValue 逐字一致，否则静默降级为文本输入框。

## 问题现象
- 公共查询（物业管理区域等）部分字段应是下拉选择（物业企业信用等级、行政区域、物业类型），却渲染成文本输入框
- 本例字典 dictValue 为 propertyCompanyCreditRating，前端 COMPLEX_FIELD_META 的 key 写成 companyCreditLevel，二者不一致

## 根因
- 前端 mergeFieldOptions 用 item.dictValue 作 key 查 COMPLEX_FIELD_META，查不到则回退 VALUE_TYPE.TEXT
- 该字典所有字段 remark 均为空，字段类型完全靠前端元数据兜底，并非 remark 覆盖或字典项缺失

## 解决方案
- 拿到后端完整字典后逐字段核对 dictValue 与 COMPLEX_FIELD_META 的 key，把前端 key 改成与后端完全一致（companyCreditLevel → propertyCompanyCreditRating），保留原 valueType/selectKey
- selectKey 指向的字典（如 credit_level）决定下拉选项来源；新增动态字段时后端加字典项须同时补前端 meta，否则静默成输入框不报错
- 排查顺序固定：先在字典 JSON 找该字段 dictValue → grep 前端同名 key → 确认是 key 不一致而非 remark 解析失败

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话贴出 complex_field 全量 JSON，确认 dictValue=propertyCompanyCreditRating 与前端 companyCreditLevel 不匹配，修复后走 selectOptionsMap.creditLevel
- 涉及文件：zhi2-web-admin/src/components/zs-advanced-query/complexFieldConfig.js、zs-advanced-query.vue、src/views/publicQuery/complex/index.vue
- 所属项目：苏住房G；来源会话：04b34f92-8311-4af3-95f1-c6899f1c1f94；代码基线：5ccda28
- 验证证据：src=苏住房G/093.md

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术",
  "name": "complex_field_key",
  "source_extraction_id": "0b327b19dd11474793140628e1ae49e8",
  "version": 2,
  "memory_type": "entities"
}
-->