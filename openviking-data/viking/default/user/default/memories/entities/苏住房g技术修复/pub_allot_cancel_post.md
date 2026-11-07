# 资金拨付作废接口GET改POST修复
苏住房G 项目修复 pubAllotNotice 详情页「作废」因前端 GET 与后端 POST 不匹配报「HTTP请求方法不支持」的问题。

## 问题原因
- 前端使用 GET 请求 /benefit/pubAllotNotice/cancel/{id}
- 后端接口为 @PostMapping，方法不匹配报错

## 修改说明
- src/api/benefit/pubAllotNotice.js 新增 cancelPubAllotNotice 方法，使用 POST 请求
- src/views/benefit/pubAllotNotice/detail.vue 的 toVoid() 改为调用上述 API，不再用 method: 'get'
- 若 property/allotNotice 物业模块有相同问题，可同样改为 POST

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 所属项目：苏住房G
- 涉及文件：src/api/benefit/pubAllotNotice.js、src/views/benefit/pubAllotNotice/detail.vue
- 来源会话：88353e21-0780-4546-bee7-b6730a012d30

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术修复",
  "name": "pub_allot_cancel_post",
  "source_extraction_id": "ace134c14d6e4dd4b9c2a649ed580e48",
  "version": 1,
  "memory_type": "entities"
}
-->