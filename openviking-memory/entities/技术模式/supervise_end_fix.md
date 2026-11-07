# 监管协议终止列表接口去除多余/add后缀
苏州市房地产监测V3 中修复监管协议终止列表接口 URL 多余 /add 后缀问题，与同项目其他模块保持一致。

## 问题根因
- zhi2-web-admin/src/api/zjjg/xymx.js 中 listXyEnd 的 URL 多拼了 /add，导致监管协议终止详情页「监管范围」请求异常

## 解决方案
- 将 listXyEnd 的 url 改为 '/prefund/superviseAgreeDetail/listByAgreeNo'，去掉多余 /add
- 现与同项目 benefit/xymx.js 中一致，请求变为 POST /api/v3.0/prefund/superviseAgreeDetail/listByAgreeNo

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/api/zjjg/xymx.js、benefit/xymx.js
- 所属项目：苏州市房地产监测V3；来源会话：d33916e8-66d0-4dad-b5a9-9efd7da908c8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "supervise_end_fix",
  "source_extraction_id": "425f461fe83a492381b48de12e92b436",
  "version": 1,
  "memory_type": "entities"
}
-->