# 门户字典列表空值保护修复
门户接口 GET /portal/dict/type/page 不返回 dictDataList，导致模板报错，已加空值保护。
## 问题原因
- 门户分页接口返回的字典类型数据不包含 dictDataList 字段
- 模板直接 scope.row.dictDataList.map(...) 在 undefined 时触发报错
## 修复方案
- dict/index.vue：对 dictDataList 做空值保护 (scope.row.dictDataList || []).map(...)
- dict.js：对 res.data 做空值保护避免同类问题
## 补充说明
- 门户分页接口目前不返回字典项列表，「字典项」列可能暂时为空
- 如需展示可让后端附带或前端按 dictType 逐个请求
## 验证与归属
- 所属项目：产品2.0；来源会话：2caa4ea9-415d-4bd1-9439-0264ee8f6342；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_dict_datalist_fix",
  "source_extraction_id": "1c09274c8b434289b317093b24eed6ea",
  "version": 1,
  "memory_type": "entities"
}
-->