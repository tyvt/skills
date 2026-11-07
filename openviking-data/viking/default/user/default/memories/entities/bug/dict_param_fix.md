# dictData/listByType 传参方式修复
产品2.0 中 getDicts 原先直接传 dictType 字符串作为 POST body，接口要求 JSON 对象，已修复为传 { dictType }。

## 问题原因
- getDicts 直接把 dictType 字符串（如 "company_type"）当作 POST body，而后端接口要求 JSON 对象 {"dictType":"company_type"}。
- 导致字典接口 404 或参数错误。

## 修复方式
- src/utils/dict.js：改为 POST('/system/dictData/listByType', { dictType })。
- src/utils/apiV3Normalize.js：补充 V3 路径规范化映射 listByType: 'dictType'。
- e2e/fixtures/register-mocks.js：Mock 改为解析 JSON body 中的 dictType 字段。

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 影响所有通过 getDicts() 获取字典的页面（含企业注册流程 company_type 等下拉）。
- 涉及文件：src/utils/dict.js、src/utils/apiV3Normalize.js、e2e/fixtures/register-mocks.js 等（路径前缀 d:/repository/产品2.0/zhi2-web-admin）。
- 所属项目：产品2.0；来源会话：2565718c-2639-4d49-96b3-c97a40e2cfd2；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "dict_param_fix",
  "source_extraction_id": "ca8df38d951f447aa2e165a2d2c0fccf",
  "version": 1,
  "memory_type": "entities"
}
-->