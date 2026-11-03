# V1/V2网关请求参数统一进zs-param模式
苏住房C的V1/V2接口经网关转发，业务参数须序列化进请求头zs-param，路径放zs-path。

## 背景与坑点
- V1/V2接口非REST直连，而是网关转发：zs-param放业务参数，zs-path放业务路径，另配zs-authorization、zs-sign、zs-source。
- 踩坑：V1的listRecommendProject等接口只发空zs-param("")，服务端取不到pageNo/pageSize。

## 正确形态
- V1示例：{"zs-path":"/transaction/ProjectType/listRecommend","zs-param":"{\"pageNo\":1,\"pageSize\":10,\"t\":{}}","zs-authorization":"","zs-sign":"","zs-source":"v1"}
- V2示例：zs-path=/security/ctAuth/login、zs-param={"username":"...","password":"..."}、zs-source=v2。

## 统一处理做法
- 拦截器层统一：GET把参数拼key=value&...塞进zs-param；POST把业务参数JSON.stringify后塞进zs-param（非body）。
- V1、V2两种source都按此规则；空参数V1接口也必须显式给{"t":{}}骨架，不能留空串。
- 新增api方法只写业务参数与路径，序列化对调用方透明。

## 验证与归属
- 所属项目：苏住房C；代码基线：653505a；来源会话ID：23766583-b4b2-4f89-a0e7-86314d84c9ae。
- 涉及文件：zhi2-mobile-shimin/src/api/v1Instance.js、httpInstance.js、gateway.js、security.js、transaction.js。
- 验证：会话指出V1的zs-param不对并给期望header，结论确认所有POST接口序列化进zs-param。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "gateway_zs_param_pattern",
  "source_extraction_id": "70fc14d1e2ea42d0bf2f14201419d722",
  "version": 1,
  "memory_type": "entities"
}
-->