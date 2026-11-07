# 加密/V3 POST 化改造后 GET→POST 迁移请求体坑
等保加密改造把非白名单 GET 统一改写为 POST 后，出现空 body、路径参数、字典 body 形态三类静默失败。

## 问题现象
- request('/system/region/listTree') 无参请求没有 body，后端 @RequestBody 报 Required request body is missing
- 字典接口 /system/dictData/listByType 从 V2 路径参数 GET 改为 POST，body 形态有讲究

## 根因分析
- V3 规范化层只负责改写方法，不会替调用方补请求体
- 字典接口后端 @RequestBody 要求 JSON 对象 { dictType: "biz_state" }，裸字符串不符合对象契约

## 解决方案
- request.js 拦截器统一兜底：POST 且 config.data == null 时补 config.data = {}
- dict.js 统一字典加载函数改为 POST('/system/dictData/listByType', { dictType })
- apiV3Normalize.js 补 V3 路径规范化映射（如 listByType: 'dictType'），让旧式路径参数自动降级成 body 字段
- e2e mock fixture 同步改成解析 JSON body 里的 dictType 字段

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：会话 fcb686e6 / 2565718c，request.js 拦截器补 {} 修复报错；dict.js 从裸字符串改为 { dictType } 对象传参，并同步 apiV3Normalize 映射与 register-mocks.js
- 涉及文件：zhi2-web-admin/src/utils/request.js、dict.js、apiV3Normalize.js、zhi2-web-admin/e2e/fixtures/register-mocks.js
- 所属项目：产品2.0；来源会话：fcb686e6-73e3-4f1f-8aff-ccc07305e948、2565718c-2639-4d49-96b3-c97a40e2cfd2；代码基线：50767de~54577f2

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "v3_post_migration_request_body",
  "source_extraction_id": "5bc1c57573344e21b65d5779775495df",
  "version": 1,
  "memory_type": "entities"
}
-->