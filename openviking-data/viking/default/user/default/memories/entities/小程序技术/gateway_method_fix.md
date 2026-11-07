# 网关传输层GET/POST判定须在调用入口定型
苏住房C小程序请求经网关按method选interface_id，旧实现回读被改写的config.method致GET认成POST丢参。

## 问题现象
- common.js里用api.get写的GET接口被识别成POST
- 另一接口zs-params为空，查询条件没传出去
- 后端按错误interface_id接收，参数丢失

## 根因
- 所有请求走createHttpClient→网关，GET走szffluzm-yhcq，POST/PUT/DELETE走szffluzm-whyhxx，上传走szffluzm-wjsc
- 旧实现先看config.method再判断，而method在拦截器可能被改写(如api.post+headers zs-method:put/delete)
- 真正GET被认成POST，选错interface_id并丢参

## 解决方案
- 在httpInstance调用api.get/post/put/file那一刻定下backendMethod与gatewayInterfaceMethod显式传网关，不回读config.method
- 核对业务层：GET用api.get(200+处)、POST用api.post(100+处)、PUT/DELETE统一api.post+zs-method头(8处)、上传用api.file
- 修复参数位置错误：api.get第三参数headers须合并进第二config；`{params,status:1}`的status须并入params
- 请求日志加「网关接口类型」字段对照interface_id

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话3863efc7用户报GET被识别为post、zs-params空，结论给出httpInstance层对照表并修复两处参数传递错误
- 涉及文件：httpInstance.js、common.js、gateway.js、index.js、sign.js
- 所属项目：苏住房C；来源会话ID：3863efc7-4edd-492d-93be-201508d84835；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "gateway_method_fix",
  "source_extraction_id": "c721bf307ccf4950b939d5355989b4a1",
  "version": 1,
  "memory_type": "entities"
}
-->